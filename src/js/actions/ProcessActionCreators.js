var AppDispatcher = require('../dispatchers/AppDispatcher');
var Constants = require('../constants/AppConstants');

module.exports = {

  getProcesses: function() {

    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.GET_PROCESSES,
    });

    $.ajax({
      url: "http://localhost:3000/api/v1/processes?token=e894d555fe2645b9e0cca367adc3a6d0",
      method: "GET",
      success: function(data) {
        AppDispatcher.handleViewAction({
          type: Constants.ActionTypes.GET_PROCESSES_SUCCESS,
          processes: data
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
