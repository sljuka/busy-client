const React = require('react');
const ProcessActionCreators = require('../actions/ProcessActionCreators')
const ActionList = require('./ActionList.jsx');
const TaskList = require("./TaskList.jsx");
const ProcessTable = require("./ProcessTable.jsx");

let ProcessDetail = React.createClass({

  getDefaultProps() {
    return {
      process: {}
    };
  },

  indexClick() {
    ProcessActionCreators.goToIndex(this.props.process.name);
  },

  assignClick(id) {
    ProcessActionCreators.assignTask(this.props.process, id);
  },

  finishClick(id) {
    ProcessActionCreators.finishTask(this.props.process, id);
  },

  render() {

    var pcs = this.props.process;

    var tasks = ""
    if(pcs.head != undefined && pcs.head[0].action !== null)
      tasks = <TaskList action={pcs.head[0].action} handleFinish={this.finishClick} handleAssign={this.assignClick} />

    return (
    <div className="process-bubble__content padding-left-small">
      <div>
        
        <a className="icon-button--larger--dgrey add margin-top-small margin-none" onClick={this.indexClick}>
          <i className="step fi-arrow-left"></i>
        </a>
        
      </div>

      <div className="row margin-none">

        <div className="padding-none small-9 columns end">

          <ProcessTable process={pcs} />

          {tasks}
            
        </div>

        <div className="padding-none small-3 columns end">
          <ActionList process={pcs} />
        </div>

      </div>

      
    </div>
    );
  }
});

module.exports = ProcessDetail;
