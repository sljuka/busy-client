var AppDispatcher = require('../dispatchers/AppDispatcher');
var Constants = require('../constants/AppConstants');
const jquery = require('jquery');
const CookieStore = require("../utils/CookieStore")

module.exports = {

  getProcesses: function() {

    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.GET_PROCESSES,
    });

    var process_names = CookieStore.getBlueprintNames();

    $.ajax({
      url: "http://localhost:3000/api/v1/processes?token=e894d555fe2645b9e0cca367adc3a6d0",
      method: "GET",
      data: {
        names: JSON.stringify(process_names)
      },
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
    });

    this.getProcesses();
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

    $.ajax({
      url: "http://localhost:3000/api/v1/processes/" + id,
      method: "GET",
      data: {
        token: "e894d555fe2645b9e0cca367adc3a6d0"
      },

      success: function(data) {
        AppDispatcher.handleViewAction({
          type: Constants.ActionTypes.SHOW_PROCESS_SUCCESS,
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
  },

  runProcess: function(id) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.RUN_PROCESS,
    });

    $.ajax({
      url: "http://localhost:3000/api/v1/processes/" + id + "/run",
      method: "POST",
      data: {
        token: "e894d555fe2645b9e0cca367adc3a6d0"
      },

      success: function(data) {
        AppDispatcher.handleViewAction({
          type: Constants.ActionTypes.RUN_PROCESS_SUCCESS,
          data: data.data.process
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

  },

  assignTask: function(process, task_id) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.ASSIGN_TASK,
    });

    var self = this;
    function refreshProcess() {
      self.showProcess(process.name, process.id);
    }

    $.ajax({
      url: "http://localhost:3000/api/v1/tasks/" + task_id + "/assign",
      method: "POST",
      data: {
        token: "e894d555fe2645b9e0cca367adc3a6d0"
      },
      success: function(data) {
        AppDispatcher.handleViewAction({
          type: Constants.ActionTypes.ASSIGN_TASK_SUCCESS,
          process: data
        });
        refreshProcess();
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

  finishTask: function(process, task_id) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.FINISH_TASK,
    });

    var self = this;
    function refreshProcess() {
      self.showProcess(process.name, process.id);
    }

    function refreshProcesses() {
      self.getProcesses();
    }

    $.ajax({
      url: "http://localhost:3000/api/v1/tasks/" + task_id + "/finish",
      method: "POST",
      data: {
        token: "e894d555fe2645b9e0cca367adc3a6d0"
      },
      success: function(data) {
        AppDispatcher.handleViewAction({
          type: Constants.ActionTypes.FINISH_TASK_SUCCESS,
          process: data
        });
        refreshProcess();
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

  chooseInput: function(process, value) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.CHOOSE_INPUT,
    });

    var self = this;
    function refreshProcesses() {
      self.getProcesses();
    }

    $.ajax({
      url: "http://localhost:3000/api/v1/processes/" + process.id + "/input",
      method: "POST",
      data: {
        token: "e894d555fe2645b9e0cca367adc3a6d0",
        input: value
      },

      success: function(data) {
        AppDispatcher.handleViewAction({
          type: Constants.ActionTypes.CHOOSE_INPUT_SUCCESS,
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
    })
  }



};
