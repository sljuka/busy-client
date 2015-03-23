const React = require('react');
const BlueprintActionCreators = require('../actions/BlueprintActionCreators')
const ProcessItem = require('./ProcessItem.jsx');

let ProcessList = React.createClass({

  getDefaultProps() {
    return {
    	process: {
    		processes: []
    	}
    };
  },

  render() {
    return (
	  <div className="process-bubble__content">
	    {this.props.process.processes.map(process =>
	      <ProcessItem key={process.id} process={process} />
	    )}
	  </div>
    );
  }
});

module.exports = ProcessList;
