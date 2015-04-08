const React = require('react');
const ProcessActionCreators = require('../actions/ProcessActionCreators');
const StringUtils = require("../utils/StringUtils");

let TaskItem = React.createClass({

  getDefaultProps() {
    return {
      task: {}
    };
  },

  assignTask(e) {
    e.preventDefault();
    this.props.handleAssign(this.props.task.id)
  },

  finishTask(e) {
    e.preventDefault();
    this.props.handleFinish(this.props.task.id)
  },

  render() {
    var task = this.props.task
    var action = ""
    if(task.finished_at !== null)
      action = <div className="small-3 columns process-bubble__content__task-list__task-item__assignee-label">finished {StringUtils.timeAgo(new Date(task.finished_at).getTime())}</div>
    else if(task.assignee_id === null)
      action = <button className="small-3 columns button small margin-none" onClick={this.assignTask}>Assign</button>
    else if(task.assignee_id === 1)
      action = <button className="small-3 columns button small margin-none" onClick={this.finishTask}>Finish</button>
    else
      action = <div className="small-3 columns process-bubble__content__task-list__task-item__assignee-label">{task.assignee}</div>

    return (
      <li className="row process-bubble__content__task-list__item" key={task.id}>
        <div className="small-9 columns process-bubble__content__task-list__task-item__label">{task.human_name}</div>
        {action}
      </li>
    );
  },

});

module.exports = TaskItem;
