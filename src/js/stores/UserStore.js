const AppDispatcher = require('../dispatchers/AppDispatcher');
const Constants = require('../constants/AppConstants');
const BaseStore = require('./BaseStore');
const assign = require('object-assign');
const CookieStore = require("../utils/CookieStore");

// data storage
let _user = {};

// add private functions to modify data
function login(data) {

  _user.apiKey = data.api_key;
  _user.username = data.username,
  _user.first_name = data.first_name,
  _user.last_name = data.last_name

  if(data.username !== null)
    CookieStore.setUserKey(data.username);

  location.reload();
}

function logout() {
  _user = {}
  CookieStore.removeUserKey();
  UserStore.emitChange()
}

function autoLogin(data) {
  if(data.username !== null && data.username !== undefined) {
    _user.apiKey = data.api_key;
    _user.username = data.username,
    _user.first_name = data.first_name,
    _user.last_name = data.last_name
  } else {
    _user = {}
  }

  UserStore.emitChange()
}

// Facebook style store creation.
let UserStore = assign({}, BaseStore, {

  // public methods used by Controller-View to operate on data
  getUserData() {
    return _user;
  },

  // register store with dispatcher, allowing actions to flow through
  dispatcherIndex: AppDispatcher.register(function(payload) {
    let action = payload.action;

    switch(action.type) {
      case Constants.ActionTypes.LOGIN_SUCCESS:
        login(action.data);
        break;
      case Constants.ActionTypes.GET_LOGIN_DATA:
        autoLogin(action.data);
        break;
      case Constants.ActionTypes.LOGOUT:
        logout();
        break;
      case Constants.ActionTypes.BOOTSTRAPPING_LOGIN_DATA:
        autoLogin(action.data);
      // add more cases for other actionTypes...
    }
  })

});

module.exports = UserStore;
