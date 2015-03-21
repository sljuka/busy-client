const React = require('react');
const TodoStore = require('../stores/TodoStore');
const ActionCreator = require('../actions/TodoActionCreators');
const TopBar = require('./TopBar.jsx')
const ProcessList = require('./ProcessList.jsx');
const Error = require("./ErrorNotification.jsx");

let App = React.createClass({

  getInitialState() {
    return {
      blueprints: []
    }
  },

  render() {
    return (
      <div>
        <TopBar />
        <Error />
        <ProcessList processes={this.props.blueprints} />
      </div>
      
    );
  }

});

module.exports = App;
