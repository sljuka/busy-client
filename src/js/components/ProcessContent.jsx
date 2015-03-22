const React = require('react');

let ProcessContent = React.createClass({
  getDefaultProps() {
    return {
    	process: null
    };
  },

  render() {
    return (
			
		<div className="process-bubble__content__process">  
			<div className="padding-left-small padding-top-medium">
				(v{this.props.process.process_blueprint_id}) {this.props.process.name}
			</div>
		</div>
    );
  }
});

module.exports = ProcessContent;
