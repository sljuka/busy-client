const keyMirror = require('react/lib/keyMirror');

module.exports = {

  ActionTypes: keyMirror({
    GET_BLUEPRINTS: "GET_BLUEPRINTS",
    GET_BLUEPRINTS_SUCCESS: "GET_BLUEPRINTS_SUCCESS",
    ERROR: "ERROR",
    ADD_PROCESS: "ADD_PROCESS",
	  ADD_PROCESS_SUCCESS: "ADD_PROCESS_SUCCESS",
    GET_PROCESSES: "GET_PROCESSES",
    GET_PROCESSES_SUCCESS: "GET_PROCESSES_SUCCESS"
  }),

  ActionSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })

};
