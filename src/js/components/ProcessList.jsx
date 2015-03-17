const React = require('react');
const ProcessBubble = require('./ProcessBubble.jsx');

let ProcessList = React.createClass({
  getDefaultProps() {
    return {
      processes: []
    };
  },

  render() {
    let {processes} = this.props;
    return (
      <div className="row full-width">
        {processes.map(process =>
          <ProcessBubble key={process} process={process} />
        )}
      </div>
    );
  }
});

module.exports = ProcessList;
