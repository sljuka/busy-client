var AppDispatcher = require('../dispatchers/AppDispatcher');
var Constants = require('../constants/AppConstants');
var CookieStore = require("../utils/CookieStore");

module.exports = {

  // getUserData: function() {
  //   var ddata = { };

  //   var key = CookieStore.getUserKey();


  //   if(key !== null && key != undefined) {
  //     $.ajax({
  //       url: "http://localhost:3000/api/v1/users/login_info",
  //       method: "GET",
  //       data: {
  //         username: key
  //       },
  //       success: function(data) {
  //         ddata = {
  //           apiKey: "11",
  //           first_name: data.data.first_name,
  //           id: data.data.id,
  //           last_name: data.data.last_name,
  //           username: data.data.first_name
  //         }
  //         AppDispatcher.handleViewAction({
  //           type: Constants.ActionTypes.GET_LOGIN_DATA,
  //           data: ddata
  //         });
  //       },
  //       error: function(data) {
  //         var message = "Unexpected error occured"
  //         if(data.responseText !== undefined)
  //           message = JSON.parse(data.responseText).message
  //         AppDispatcher.handleViewAction({
  //           type: Constants.ActionTypes.ERROR,
  //           message: message
  //         });
  //       }
  //     });
  //   }

  // },

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
