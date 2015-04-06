const React = require('react');
const ProcessBubble = require('./ProcessBubble.jsx');
const ErrorStore = require('../stores/ErrorStore');

let ErrorNotification = React.createClass({
  getInitialState() {
    return {
      error: ""
    };
  },

  _onChange() {
    this.setState({
      error: ErrorStore.getError()
    });
  },

  componentDidMount() {
    ErrorStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    ErrorStore.removeChangeListener(this._onChange);
  },

  handleClose() {
    this.setState({error: ""})
  },

  render() {
    var error = this.state.error;
    if(error === "")
      return (<div className="row notification-box"></div>)
    else {
      return(
        <div className="row notification-box">
          <div className="small-4 small-offset-4">
            <div data-alert className="alert-box alert radius">
              {error}
              <a href="#" className="close" onClick={this.handleClose}>&times;</a>
            </div>
          </div>
        </div>
      );
    };
  }
});

module.exports = ErrorNotification;
