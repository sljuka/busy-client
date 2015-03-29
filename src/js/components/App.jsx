const React = require('react');
const TodoStore = require('../stores/TodoStore');
const TopBar = require('./TopBar.jsx')
const ProcessPanel = require('./ProcessPanel.jsx');
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
        <ProcessPanel processes={this.props.blueprints} />
      </div>
      
    );
  }

});

module.exports = App;
