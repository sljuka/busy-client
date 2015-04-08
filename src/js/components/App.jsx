const React = require('react');
const TopBar = require('./TopBar.jsx')
const ProcessPanel = require('./ProcessPanel.jsx');
const Error = require("./ErrorNotification.jsx");
const Authentication = require("./Authentication.jsx");
const UserStore = require("../stores/UserStore");
const UserActionCreators = require("../actions/UserActionCreators");
const AppActionCreators = require("../actions/AppActionCreators");
const CookieStore = require("../utils/CookieStore");

let App = React.createClass({

  getInitialState() {
    return {
      user: {}
    }
  },

  _onChange() {
    this.setState({
      user: UserStore.getUserData()
    });
  },

  login(un, pass) {
    UserActionCreators.login(un, pass);
    AppActionCreators.getInitialData();
  },

  componentDidMount() {
    UserStore.addChangeListener(this._onChange);
    if(CookieStore.getUserKey() !== undefined) {
      UserActionCreators.getUserData();
      AppActionCreators.getInitialData();
    }
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
