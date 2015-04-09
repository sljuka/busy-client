const React = require('react');
const TopBar = require('./TopBar.jsx')
const ProcessPanel = require('./ProcessPanel.jsx');
const Error = require("./ErrorNotification.jsx");
const Authentication = require("./Authentication.jsx");
const UserStore = require("../stores/UserStore");
const UserActionCreators = require("../actions/UserActionCreators");

let App = React.createClass({

  getInitialState() {
    return {
      user: UserStore.getUserData()
    }
  },

  _onChange() {
    this.setState({
      user: UserStore.getUserData()
    });
  },

  login(un, pass) {
    UserActionCreators.login(un, pass);
  },

  componentDidMount() {
    UserStore.addChangeListener(this._onChange);
  },


  render() {

    var content = <Authentication handleLogin={this.login} />
    if(this.state.user.username !== undefined && this.state.user.username !== null) {
      content = <ProcessPanel />
    }

    return (
      <div>
        <TopBar />
        <Error />
        {content}
      </div>
      
    );
  }

});

module.exports = App;
