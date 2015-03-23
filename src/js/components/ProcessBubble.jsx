const React = require('react');
const BlueprintActionCreators = require('../actions/BlueprintActionCreators')
const ProcessList = require('./ProcessList.jsx');
const ProcessDetail = require('./ProcessDetail.jsx');

let ProcessBubble = React.createClass({

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
    if(this.props.process.process_id === null) {
      return (
        <div className={cn}>  
          <div className="process-bubble margin-bottom-medium margin-top-medium">
            <div className="process-bubble__header">
              <a className="close margin-top-small margin-right-medium" onClick={this.closeClick}>X</a>
              <h4 className="text-center font-bold padding-top-tiny">{this.props.process.name} (v{this.props.process.latest})</h4>
            </div>

            <ProcessList process={this.props.process} isLast={this.props.isLast} />

            <div className="process-bubble__footer">
              <a className="add margin-top-small margin-left-medium" onClick={this.addClick}>+</a>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={cn}>  
          <div className="process-bubble margin-bottom-medium margin-top-medium">
            <div className="process-bubble__header">
              <a className="close margin-top-small margin-right-medium" onClick={this.closeClick}>X</a>
              <h4 className="text-center font-bold padding-top-tiny">{this.props.process.name} (v{this.props.process.latest})</h4>
            </div>
            
            <ProcessDetail process={this.props.process} />

            <div className="process-bubble__footer">
              <a className="add margin-top-small margin-left-medium" onClick={this.addClick}>+</a>
            </div>
          </div>
        </div>
      );
    }

  }
});

module.exports = ProcessBubble;
