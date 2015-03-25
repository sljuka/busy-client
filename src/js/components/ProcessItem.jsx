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

  render() {
    return (
  		<div className="process-bubble__content__process">  
  			<div className="padding-left-small padding-top-medium">
  				(v{this.props.process.process_blueprint_id}) {this.props.process.name}
          <a className="add margin-top-small margin-left-medium" onClick={this.showClick}> Show </a>
  			</div>
  		</div>
    );
  }
});

module.exports = ProcessItem;
