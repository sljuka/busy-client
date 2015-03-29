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

  runClick() {
    ProcessActionCreators.runProcess(this.props.process.id)
  },

  render() {

    var runButton;
    if(this.props.process.runned_at === null) {
      runButton = <a className="add margin-top-small margin-left-medium" onClick={this.runClick}> Run </a>;
    } else {
      runButton = ""
    }

    return (
  		<div className="process-bubble__content__process">  
  			<div className="padding-left-small padding-top-medium">
  				(v{this.props.process.process_blueprint_id}) {this.props.process.name}
          <a className="add margin-top-small margin-left-medium" onClick={this.showClick}> Show </a>
          {runButton}
  			</div>
  		</div>
    );
  }
});

module.exports = ProcessItem;
