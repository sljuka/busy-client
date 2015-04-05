var AppDispatcher = require('../dispatchers/AppDispatcher');
var Constants = require('../constants/AppConstants');

module.exports = {

  getBlueprints: function() {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.GET_BLUEPRINTS,
    });

    $.ajax({
      url: "http://localhost:3000/api/v1/blueprints",
      method: "GET",
      data: {
        token: "e894d555fe2645b9e0cca367adc3a6d0",
        latest: true
      },
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
  }

};
