const React = require('react');
const TodoStore = require('../stores/TodoStore');
const TopBar = require('./TopBar.jsx')
const ProcessList = require('./ProcessPanel.jsx');
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
