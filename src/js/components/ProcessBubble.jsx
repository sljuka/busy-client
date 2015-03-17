const React = require('react');
const ActionCreator = require('../actions/TodoActionCreators');

let Process = React.createClass({
  getDefaultProps() {
    return {
      task: {
        title: '',
        completed: false
      }
    };
  },

  render() {
    //let {task} = this.props;
    return (
      <div className="large-3 columns">  
        <div className="process-bubble">
          <div className="process-bubble__header">
            <h4 className="text-center font-bold padding-top-tiny">Make breakfast</h4>
          </div>
          <div className="process-bubble__content">
            content
          </div>
          <div className="process-bubble__footer">
            footer
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Process;
