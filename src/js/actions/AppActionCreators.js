var AppDispatcher = require('../dispatchers/AppDispatcher');
var Constants = require('../constants/AppConstants');
var jquery = require('jquery');
var CookieStore = require("../utils/CookieStore");

var _blueprintData = null;
var _processData = null;

function receivedData() {
  if(_blueprintData !== null && _processData !== null) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.INITIAL_DATA,
      blueprints: _blueprintData,
      processes: _processData
    });
  }
}

function getBlueprints() {
  $.ajax({
    url: "http://localhost:3000/api/v1/blueprints",
    method: "GET",
    data: {
      token: "e894d555fe2645b9e0cca367adc3a6d0",
      latest: true
    },
    success: function(data) {
      _blueprintData = data;
      receivedData();
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
}

function getProcesses() {

  var process_names = CookieStore.getBlueprintNames();

  $.ajax({
    url: "http://localhost:3000/api/v1/processes",
    method: "GET",
    data: {
      token: "e894d555fe2645b9e0cca367adc3a6d0",
      names: JSON.stringify(process_names)
    },
    success: function(data) {
      _processData = data;
      receivedData();
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
}

module.exports = {

  getInitialData: function() {
    getBlueprints();
    getProcesses();
  },

};
