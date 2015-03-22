const AppDispatcher = require('../dispatchers/AppDispatcher');
const Constants = require('../constants/AppConstants');
const BaseStore = require('./BaseStore');
const assign = require('object-assign');

// data storage
let _data = [];

// add private functions to modify data
function setBlueprints(data) {
  _data = data;
  BlueprintStore.emitChange();
}

// Facebook style store creation.
let BlueprintStore = assign({}, BaseStore, {

  // public methods used by Controller-View to operate on data
  getBlueprints() {
    return _data
  },

  // register store with dispatcher, allowing actions to flow through
  dispatcherIndex: AppDispatcher.register(function(payload) {
    let action = payload.action;

    switch(action.type) {
      case Constants.ActionTypes.GET_BLUEPRINTS_SUCCESS:
        setBlueprints(action.blueprints);
        break;
      // add more cases for other actionTypes...
    }
  })

});

module.exports = BlueprintStore;