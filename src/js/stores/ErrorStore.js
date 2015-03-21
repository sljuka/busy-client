const AppDispatcher = require('../dispatchers/AppDispatcher');
const Constants = require('../constants/AppConstants');
const BaseStore = require('./BaseStore');
const assign = require('object-assign');

// data storage
let _data = [];

// add private functions to modify data
function setError(data) {
  if(data === "")
  	_data = "Unexpected error occured"
  else
  	_data = data;
  ErrorStore.emitChange();
}

// Facebook style store creation.
let ErrorStore = assign({}, BaseStore, {

  // public methods used by Controller-View to operate on data
  getError() {
    return _data
  },

  // register store with dispatcher, allowing actions to flow through
  dispatcherIndex: AppDispatcher.register(function(payload) {
    let action = payload.action;

    switch(action.type) {
      case Constants.ActionTypes.ERROR:
        setError(action.message);
        break;
      // add more cases for other actionTypes...
    }
  })

});

module.exports = ErrorStore;
