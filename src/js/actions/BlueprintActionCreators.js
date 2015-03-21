var AppDispatcher = require('../dispatchers/AppDispatcher');
var Constants = require('../constants/AppConstants');

module.exports = {

  getBlueprints: function() {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.GET_BLUEPRINTS,
    });

    $.ajax({
      url: "http://localhost:3000/api/v1/blueprints?token=e894d555fe2645b9e0cca367adc3a6d0",
      method: "GET",
      success: function(data) {
        AppDispatcher.handleViewAction({
          type: Constants.ActionTypes.GET_BLUEPRINTS_SUCCESS,
          blueprints: data
        });
      },
      error: function(data) {
        var message = JSON.parse(data.responseText).message
        AppDispatcher.handleViewAction({
          type: Constants.ActionTypes.ERROR,
          message: message
        });
      }
    });
  },

  addProcess: function(process) {

    console.log(process)

    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.ADD_PROCESS,
    });

    $.ajax({
      url: "http://localhost:3000/api/v1/processes?token=e894d555fe2645b9e0cca367adc3a6d0",
      method: "POST",
      data: {
        id: process.id
      },
      success: function(data) {
        AppDispatcher.handleViewAction({
          type: Constants.ActionTypes.ADD_PROCESS_SUCCESS,
          process: data
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

  }

};
