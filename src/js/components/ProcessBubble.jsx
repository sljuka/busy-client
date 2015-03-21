const React = require('react');
const ActionCreator = require('../actions/TodoActionCreators');
const BlueprintActionCreators = require('../actions/BlueprintActionCreators')

let Process = React.createClass({
  getDefaultProps() {
    return {

    };
  },

  closeClick(e) {
    e.preventDefault();
    this.props.handleClose(this.props.process)
  },

  addClick(e) {
    e.preventDefault();
    BlueprintActionCreators.addProcess(this.props.process);
  },

  render() {
    var cn = "small-12 large-3 columns" + (this.props.isLast ? " end" : "");
    return (
      <div className={cn}>  
        <div className="process-bubble margin-bottom-medium margin-top-medium">
          <div className="process-bubble__header">
            <a className="close margin-top-small margin-right-medium" onClick={this.closeClick}>X</a>
            <h4 className="text-center font-bold padding-top-tiny">{this.props.process.name} {this.props.process.id}</h4>
          </div>
          <div className="process-bubble__content">
            content
          </div>
          <div className="process-bubble__footer">
            <a className="add margin-top-small margin-left-medium" onClick={this.addClick}>+</a>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Process;
