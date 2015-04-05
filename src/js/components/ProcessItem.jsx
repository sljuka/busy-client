const ProcessActionCreators = require('../actions/ProcessActionCreators')
const StringUtils = require('../utils/StringUtils')

const React = require('react');

let ProcessItem = React.createClass({
  getDefaultProps() {
    return {
    	process: null
    };
  },

  showClick(e) {
    e.preventDefault();
    var pcs = this.props.process;
    this.props.handleShow(pcs.name, pcs.id);
  },

  runClick(e) {
    e.stopPropagation();
    ProcessActionCreators.runProcess(this.props.process.id)
  },

  render() {


    var human_name = StringUtils.humanize(this.props.process.name);
    var clss_name = "process-bubble__content__process"

    var runned = this.props.process.runned_at !== null
    var runButton;
    if(runned) {
      runButton = ""
      clss_name = clss_name + " runned";
    } else {
      runButton = <a title="Run process" className="icon-button--dgrey margin-top-small margin-left-medium" onClick={this.runClick}><i className="step fi-play"></i></a>;
    }

    return (
  		<div className={clss_name} onClick={this.showClick}>  
  			<div className="margin-none row">
          <div className="small-9 columns padding-top-medium">
  				  {human_name}
            <span className="process-bubble__content__process__pid"> (#{this.props.process.pid})</span>
          </div>

          <div className="small-1 columns padding-top-medium">
            <span className="process-bubble__content__process__version">0.0.{this.props.process.process_blueprint_id}</span>
          </div>

          <div className="small-2 columns padding-top-small process-bubble__content__process__actions right">
            {runButton}
          </div>
          
  			</div>
  		</div>
    );
  }
});

module.exports = ProcessItem;
