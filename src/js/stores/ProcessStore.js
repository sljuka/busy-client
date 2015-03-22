const AppDispatcher = require('../dispatchers/AppDispatcher');
const Constants = require('../constants/AppConstants');
const BaseStore = require('./BaseStore');
const assign = require('object-assign');
const jquery = require('jquery');
const cookie = require('jquery.cookie');

// data storage
let _data = [];

// add private functions to modify data
function setProcesses(data) {
  _data = data;

  var cookie_data = {
    names: extract_names(data)
  }
  jquery.cookie.json = true;
  jquery.cookie('bizflow_processes', cookie_data);
  
  ProcessStore.emitChange();
}

// Facebook style store creation.
let ProcessStore = assign({}, BaseStore, {

  // public methods used by Controller-View to operate on data
  getProcesses() {
    return _data
  },

  // register store with dispatcher, allowing actions to flow through
  dispatcherIndex: AppDispatcher.register(function(payload) {
    let action = payload.action;

    switch(action.type) {
      case Constants.ActionTypes.GET_PROCESSES_SUCCESS:
        setProcesses(action.processes);
        break;
      // add more cases for other actionTypes...
    }
  })

});

function extract_names(data) {
  var res = []
  for(var i = 0; i < data.length; i++) {
    res.push(data[i].name)
  }
  return res;
}

module.exports = ProcessStore;
