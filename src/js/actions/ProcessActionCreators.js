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

  },

  openBlueprint: function(data) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.OPEN_BLUEPRINT,
      blueprint_name: data.name
    })
  },

  closeBlueprint: function(name) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.CLOSE_BLUEPRINT,
      name: name
    });
  },

  goToIndex: function(name) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.INDEX_PROCESS,
      name: name
    });
  },

  showProcess: function(name, id) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.SHOW_PROCESS,
      name: name,
      id: id
    });
  },

  runProcess: function(id) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.RUN_PROCESS,
    });

    var self = this;
    function refreshProcesses() {
      self.getProcesses();
    }

    $.ajax({
      url: "http://localhost:3000/api/v1/processes/" + id + "/run",
      method: "POST",
      data: {
        token: "e894d555fe2645b9e0cca367adc3a6d0"
      },

      success: function(data) {
        AppDispatcher.handleViewAction({
          type: Constants.ActionTypes.RUN_PROCESS_SUCCESS,
          processes: data
        });
        refreshProcesses();
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

  addProcess: function(blueprint) {

    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.ADD_PROCESS,
    });

    var self = this;
    function refreshProcesses() {
      self.getProcesses();
    }

    $.ajax({
      url: "http://localhost:3000/api/v1/processes?token=e894d555fe2645b9e0cca367adc3a6d0",
      method: "POST",
      data: {
        id: blueprint.id
      },
      success: function(data) {
        AppDispatcher.handleViewAction({
          type: Constants.ActionTypes.ADD_PROCESS_SUCCESS,
          process: data
        });
        refreshProcesses();
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
