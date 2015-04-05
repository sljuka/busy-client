const React = require('react');
const ProcessActionCreators = require('../actions/ProcessActionCreators')
const ProcessItem = require('./ProcessItem.jsx');

let ProcessList = React.createClass({

  getDefaultProps() {
    return {
  		processes: []
    };
  },

  showProcess(blueprint_name, process_id) {
    ProcessActionCreators.showProcess(blueprint_name, process_id);
  },

  render() {
    return (
	  <div className="process-bubble__content">
	    {this.props.processes.map(process =>
	      <ProcessItem key={process.id} process={process} handleShow={this.showProcess} />
	    )}
	  </div>
    );
  }
});

module.exports = ProcessList;
