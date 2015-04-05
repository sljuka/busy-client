const AppDispatcher = require('../dispatchers/AppDispatcher');
const Constants = require('../constants/AppConstants');
const BaseStore = require('./BaseStore');
const assign = require('object-assign');
const jquery = require('jquery');
const cookie = require('jquery.cookie');
const _ = require('lodash');

// data storage

let _processes = [
  // {
  //   name: "make_breakfast",
  //   showedProcess: null
  // },
  // {
  //   name: "sample_process",
  //   showedProcess: null
  // },
  // {
  //   name: "sample_process_2",
  //   showedProcess: null
  // }
];

// add private functions to modify data
function setProcesses(data) {
  //_processBubbles = newData(_processBubbles, data);

  // extend new data with showedProcess attribute

  var extData = _.map(data, function(element) { 
    return _.extend({}, element, {showed: null});
  });

  _processes = extData

  // var cookie_data = {
  //   names: extractNames(_processBubbles)
  // }
  
  // jquery.cookie.json = true;
  // jquery.cookie('bizflow_processes', cookie_data);
  
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

function openBlueprint(name) {
  _processes = _.reject(_processes, { name: name });
  
  _processes.unshift(
    {
      name: name,
      showedProcess: null
    }
  );
  
  ProcessStore.emitChange();
}

function closeBlueprint(name) {
  _processes = _.reject(_processes, { name: name });
  ProcessStore.emitChange();
}

// Facebook style store creation.
let ProcessStore = assign({}, BaseStore, {

  // public methods used by Controller-View to operate on data
  getProcesses() {

    var compare = function(a,b) {
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
      n.processes.sort(compare)
    });

    return _processes
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
      case Constants.ActionTypes.CLOSE_BLUEPRINT:
        closeBlueprint(action.name)
        break;
      // add more cases for other actionTypes...
    }
  })

});

function extractNames(data) {
  var res = []
  for(var i = 0; i < data.length; i++) {
    res.push(data[i].name)
  }
  return res;
}

function result_merge(current, fresh) {
  var res = [];
  res = _.map(current, function(item) {

    var freshItem = _.find(fresh, {name: item.name})
    
    if(freshItem !== undefined) {
      _.merge(item, freshItem)
    }
    
    return item;
  });
  return res;
}

module.exports = ProcessStore;
