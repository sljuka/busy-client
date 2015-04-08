const React = require('react');
const ProcessActionCreators = require('../actions/ProcessActionCreators');
const TaskItem = require("./TaskItem.jsx");

let TaskList = React.createClass({

  getDefaultProps() {
    return {
      action: {
        tasks: []
      }
    };
  },

  render() {
    var act = this.props.action;
    var title = act.tasks.length > 0 ? "Tasks" : "No tasks"
    return (
      <div>
        <h3>{title}</h3>
        <ul className="process-bubble__content__task-list">
          {act.tasks.map(task =>
            <TaskItem key={task.id} task={task} handleFinish={this.props.handleFinish} handleAssign={this.props.handleAssign} />
          )}
        </ul> 
      </div>
    );
  },

});

module.exports = TaskList;
