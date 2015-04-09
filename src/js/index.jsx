const React = require('react');
const App = require('./components/App.jsx');
const Loading = require("./components/Loading.jsx");
const CookieStore = require("./utils/CookieStore");
const AppDispatcher = require('./dispatchers/AppDispatcher');
const Constants = require('./constants/AppConstants');

function syncLoginData(username) {

  $.ajax({
    url: "http://localhost:3000/api/v1/users/login_info",
    method: "GET",
    async: false,
    data: {
      username: username
    },
    success: function(data) {
      var user = {
        apiKey: data.data.api_key,
        first_name: data.data.first_name,
        id: data.data.id,
        last_name: data.data.last_name,
        username: data.data.first_name
      }
      AppDispatcher.handleViewAction({
        type: Constants.ActionTypes.BOOTSTRAPPING_LOGIN_DATA,
        data: user
      }); 
    },
    error: function(data) {
      console.log("ERROR OCCURED")
    }

  });

};

function syncInitialBlueprintData() {
  $.ajax({
    url: "http://localhost:3000/api/v1/blueprints",
    method: "GET",
    async: false,
    data: {
      token: "e894d555fe2645b9e0cca367adc3a6d0",
      latest: true
    },
    success: function(data) {
      AppDispatcher.handleViewAction({
        type: Constants.ActionTypes.BOOTSTRAPPING_BLUEPRINT_DATA,
        data: data
      }); 
    },
    error: function(data) {
      console.log("ERROR OCCURED")
    }
  });
}

function syncInitialProcessData() {
  var process_names = CookieStore.getBlueprintNames();

  if(process_names === undefined || process_names === []) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.BOOTSTRAPPING_PROCESS_DATA,
      data: []
    });
  } else {
    $.ajax({
      url: "http://localhost:3000/api/v1/processes",
      method: "GET",
      async: false,
      data: {
        token: "e894d555fe2645b9e0cca367adc3a6d0",
        names: JSON.stringify(process_names)
      },
      success: function(data) {
        AppDispatcher.handleViewAction({
          type: Constants.ActionTypes.BOOTSTRAPPING_PROCESS_DATA,
          data: data
        }); 
      },
      error: function(data) {
        console.log("ERROR OCCURED");
      }
    });
  }
}

var bootstrapping = function() {
  var key = CookieStore.getUserKey();

  if(key !== null && key !== undefined) {

    React.render(<Loading />, document.getElementById('main'));

    syncLoginData(key);
    syncInitialBlueprintData();
    syncInitialProcessData();

    React.render(<App />, document.getElementById('main'));

  } else {

    React.render(<App />, document.getElementById('main'));
 
  }
  
}()


