var AppDispatcher = require('../dispatchers/AppDispatcher');
var Constants = require('../constants/AppConstants');
var CookieStore = require("../utils/CookieStore");

module.exports = {

  login: function(un, pass) {
    $.ajax({
      url: "http://localhost:3000/api/v1/users/login_info",
      method: "GET",
      data: {
        username: un,
        password: pass
      },
      success: function(data) {
        AppDispatcher.handleViewAction({
          type: Constants.ActionTypes.LOGIN_SUCCESS,
          data: data.data
        });
      },
      error: function(data) {
        var message = "Unexpected error occured"
        if(data.responseText !== undefined)
          message = JSON.parse(data.responseText).message
        AppDispatcher.handleViewAction({
          type: Constants.ActionTypes.ERROR,
          message: message
        });
      }
    });
  },

  logout: function() {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.LOGOUT,
    });
  }

};
