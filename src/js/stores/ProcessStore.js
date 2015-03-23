const AppDispatcher = require('../dispatchers/AppDispatcher');
const Constants = require('../constants/AppConstants');
const BaseStore = require('./BaseStore');
const assign = require('object-assign');
const jquery = require('jquery');
const cookie = require('jquery.cookie');
const _ = require('lodash');

// data storage
let _processBubbles = [
  {
    name: "make_breakfast",
    process_id: 1
  },
  {
    name: "sample_process",
    process_id: null
  }
];

// add private functions to modify data
function setProcesses(data) {
  _processBubbles = newData(_processBubbles, data);

  var cookie_data = {
    names: extractNames(_processBubbles)
  }
  jquery.cookie.json = true;
  jquery.cookie('bizflow_processes', cookie_data);
  
  ProcessStore.emitChange();
}

function closeProcess(name) {
  _processBubbles = _.reject(_processBubbles, { name: name });
  ProcessStore.emitChange();
}

function goToIndex(name) {
  var idx = _.findIndex(_processBubbles, { name: name });
  _processBubbles[idx].process_id = null;
  ProcessStore.emitChange();
}

function showProcess(name, id) {
  var idx = _.findIndex(_processBubbles, { name: name });
  _processBubbles[idx].process_id = id;
  ProcessStore.emitChange();
}

// Facebook style store creation.
let ProcessStore = assign({}, BaseStore, {

  // public methods used by Controller-View to operate on data
  getProcesses() {
    return _processBubbles
  },

  // register store with dispatcher, allowing actions to flow through
  dispatcherIndex: AppDispatcher.register(function(payload) {
    let action = payload.action;

    switch(action.type) {
      case Constants.ActionTypes.GET_PROCESSES_SUCCESS:
        setProcesses(action.processes);
        break;
      case Constants.ActionTypes.CLOSE_PROCESS:
        closeProcess(action.name)
        break;
      case Constants.ActionTypes.INDEX_PROCESS:
        goToIndex(action.name)
        break;
      case Constants.ActionTypes.SHOW_PROCESS:
        showProcess(action.name, action.id)
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

function newData(bubbles, data) {
  var res = [];
  res = _.map(bubbles, function(bubble) {

    var dataItem = _.find(data, function(d) {
      return d.name === bubble.name;
    })
    
    var item = bubble;
    if(dataItem !== undefined) {
      item = _.merge({}, bubble, { processes: dataItem.processes }, { latest: dataItem.latest })
    }
    
    return item;
  });
  return res;
}

module.exports = ProcessStore;
