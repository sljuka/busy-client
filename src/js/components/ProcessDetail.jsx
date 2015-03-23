const React = require('react');
const ProcessActionCreators = require('../actions/ProcessActionCreators')
const ProcessContent = require('./ProcessItem.jsx');

let ProcessDetail = React.createClass({

  getDefaultProps() {
    return {
    	process: {
    		processes: []
    	}
    };
  },

  indexClick() {
  	ProcessActionCreators.goToIndex(this.props.process.name)
  },

  render() {
    return (
	  <div className="process-bubble__content">
	  	<a className="add margin-top-small margin-left-medium" onClick={this.indexClick}> "back" </a>
	    <span>{this.props.process.process_id}</span>
	  </div>
    );
  }
});

module.exports = ProcessDetail;
