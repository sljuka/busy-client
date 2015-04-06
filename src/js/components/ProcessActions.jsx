const ProcessActionCreators = require('../actions/ProcessActionCreators')

const React = require('react');

let ProcessActions = React.createClass({
  getDefaultProps() {
    return {
      process: null
    };
  },

  runClick(e) {
    e.stopPropagation();
    ProcessActionCreators.runProcess(this.props.process.id)
  },

  inputForm(e) {
    e.stopPropagation();
  },

  render() {

    var pcs = this.props.process;
    var button = "";

    if(pcs.status == "not_started")
      button = <a title="Run process" className="icon-button--dgrey margin-top-small margin-left-medium" onClick={this.runClick}><i className="step fi-play"></i></a>;
    else if(pcs.status == "input")
      button = <a title="Submit input" className="icon-button--dgrey margin-top-small margin-left-medium" onClick={this.runClick}><i className="step fi-info"></i></a>;

    return(
      <span>{button}</span>
    );
  }

});

module.exports = ProcessActions