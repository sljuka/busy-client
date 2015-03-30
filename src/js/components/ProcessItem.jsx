const ProcessActionCreators = require('../actions/ProcessActionCreators')

const React = require('react');

let ProcessItem = React.createClass({
  getDefaultProps() {
    return {
    	process: null
    };
  },

  showClick() {
    ProcessActionCreators.showProcess(this.props.process.name, this.props.process.id)
  },

  runClick(e) {
    e.stopPropagation();
    ProcessActionCreators.runProcess(this.props.process.id)
  },

  render() {

    var runButton;
    if(this.props.process.runned_at === null) {
      runButton = <a className="icon-button margin-top-small margin-left-medium" onClick={this.runClick}><i className="step fi-play"></i></a>;
    } else {
      runButton = ""
    }

    return (
  		<div className="process-bubble__content__process" onClick={this.showClick}>  
  			<div className="padding-left-small padding-top-medium">
  				{this.props.process.name}
          {runButton}
          <span className="process-bubble__content__process__version right">0.0.{this.props.process.process_blueprint_id}</span>
  			</div>
  		</div>
    );
  }
});

module.exports = ProcessItem;
