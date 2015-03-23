const React = require('react');
const ProcessBubble = require('./ProcessBubble.jsx');
const ProcessStore = require('../stores/ProcessStore')
const ProcessActionCreators = require('../actions/ProcessActionCreators')

let ProcessPanel = React.createClass({
  getInitialState() {
    return {
      processes: []
    };
  },

  closeProcess(process) {
    ProcessActionCreators.closeProcess(process.name);
  },

  _onChange() {
    this.setState({
      processes: ProcessStore.getProcesses()
    });
  },

  componentDidMount() {
    ProcessStore.addChangeListener(this._onChange);
    ProcessActionCreators.getProcesses();
  },

  componentWillUnmount() {
    ProcessStore.removeChangeListener(this._onChange);
  },

  render() {
    var processes = this.state.processes;
    return (
      <div className="row full-width">
        {processes.map(process =>
          <ProcessBubble key={process.latest} process={process} handleClose={this.closeProcess} isLast={processes[processes.length - 1] === process} />
        )}
      </div>
    );
  }
});

module.exports = ProcessPanel;
