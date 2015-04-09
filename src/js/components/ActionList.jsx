const React = require('react');

let ActionList = React.createClass({

  getDefaultProps() {
    return {
      process: {}
    };
  },

  render() {
    var actions = []
    if(this.props.process.actions !== undefined)
      actions = this.props.process.actions
    return (
      <ul className="process-bubble__content__action-list">
        {actions.map(action =>
          <li key={action.id} className={this.itemClass(action)}>{action.human_name}</li>
        )}
      </ul>
    );
  },

  itemClass(action) {
    var clss = "process-bubble__content__action-list__item"
    if(action.head)
      clss += "--head";
    return clss;
  }
});

module.exports = ActionList;
