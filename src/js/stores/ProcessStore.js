const AppDispatcher = require('../dispatchers/AppDispatcher');
const Constants = require('../constants/AppConstants');
const BaseStore = require('./BaseStore');
const assign = require('object-assign');
const jquery = require('jquery');
const _ = require('lodash');
const CookieStore = require("../utils/CookieStore");
const UserStore = require("./UserStore");

// data storage

let _processes = [];
let _inputChoose = null;

// private functions
function setProcesses(data) {

  _processes = merge_data(_processes, data);
  ProcessStore.emitChange();

}

function initProcesses(data) {
  _processes = merge_data(_processes, data);
  ProcessStore.emitChange();
}

function goToIndex(name) {
  var pcs = _.find(_processes, { name: name });
  pcs.showed = null;
  ProcessStore.emitChange();
}

function showProcess(name, id) {
  var blueprint_index = _.findIndex(_processes, { name: name });
  _processes[blueprint_index].showed = _.find(_processes[blueprint_index].processes, { id: id });
  ProcessStore.emitChange();
}

function showProcessData(process) {
  var blueprint_index = _.findIndex(_processes, { name: process.name });
  _processes[blueprint_index].showed = process;
  ProcessStore.emitChange(); 
}

function openBlueprint(name) {
  _processes = _.reject(_processes, { name: name });

  _processes.unshift(
    {
      name: name,
      showed: null,
      processes: [],
      id: 0
    }
  );

  CookieStore.setBlueprintNames(_processes);
}

function closeBlueprint(name) {
  _processes = _.reject(_processes, { name: name });
  CookieStore.setBlueprintNames(_processes);
  ProcessStore.emitChange();
}

function setInputChoose(process) {
  _inputChoose = process;
}

// Facebook style store creation.
let ProcessStore = assign({}, BaseStore, {

  // public methods used by Controller-View to operate on data
  getProcesses() {

    var compare = function(a,b) {
      if (a.finished_at === null && b.finished_at !== null)
        return -1;
      if (a.finished_at !== null && b.finished_at === null)
        return 1;

      if (a.runned_at === null && b.runned_at !== null)
        return 1;
      if (a.runned_at !== null && b.runned_at === null)
        return -1;

      if (a.runned_at === null && b.runned_at === null) {
        if (a.created_at > b.created_at)
          return 1;
        else
          return -1;
      } else {
        if (a.runned_at > b.runned_at)
          return 1;
        else
          return -1;
      }
    }

    _processes.forEach(function(n) {
      n.processes.sort(compare);
    });

    return _processes;
  },

  getInputPending() {
    return _inputChoose;
  },

  // register store with dispatcher, allowing actions to flow through
  dispatcherIndex: AppDispatcher.register(function(payload) {
    let action = payload.action;

    switch(action.type) {
      case Constants.ActionTypes.GET_PROCESSES_SUCCESS:
        setProcesses(action.processes);
        break;
      case Constants.ActionTypes.INDEX_PROCESS:
        goToIndex(action.name)
        break;
      case Constants.ActionTypes.SHOW_PROCESS:
        showProcess(action.name, action.id)
        break;
      case Constants.ActionTypes.SHOW_PROCESS_SUCCESS:
        showProcessData(action.process)
        break;
      case Constants.ActionTypes.CLOSE_BLUEPRINT:
        closeBlueprint(action.name)
        break;
      case Constants.ActionTypes.OPEN_BLUEPRINT:
        openBlueprint(action.blueprint_name)
        break;
      case Constants.ActionTypes.BOOTSTRAPPING_PROCESS_DATA:
        initProcesses(action.data)
        break;
      case Constants.ActionTypes.CHOOSE_INPUT_SUCCESS:
        setInputChoose(action.data)
        break;
    }
  })

});

function merge_data(current, fresh) {

  var names = [];
  names = CookieStore.getBlueprintNames();
  current = _.map(names, function(name) {
    var existing_item = _.find(current, {'name': name })
    
    if(existing_item === undefined) {
      existing_item = {
        name: name,
        id: 0,
        processes: []
      }
    }

    return existing_item;
  });

  var res = [];
  res = _.map(current, function(item) {

    var freshItem = _.find(fresh, {name: item.name})
    item.processes = freshItem.processes
    item.id = freshItem.id
    item.description = freshItem.description
    
    return item;
  });
  return res;
}

module.exports = ProcessStore;
