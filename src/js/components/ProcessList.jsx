const React = require('react');
const ProcessBubble = require('./ProcessBubble.jsx');
const BlueprintStore = require('../stores/BlueprintStore')
const BlueprintActionCreators = require('../actions/BlueprintActionCreators')

let ProcessList = React.createClass({
  getInitialState() {
    return {
      processes: []
    };
  },

  closeProcess(number) {
    this.setState({ processes: this.props.processes.splice(this.props.processes.indexOf(number), 1) });
  },

  _onChange() {
    this.setState({
      processes: BlueprintStore.getBlueprints()
    });
  },

  componentDidMount() {
    BlueprintStore.addChangeListener(this._onChange);
    BlueprintActionCreators.getBlueprints();
  },

  componentWillUnmount() {
    BlueprintStore.removeChangeListener(this._onChange);
  },

  render() {
    var processes = this.state.processes;
    return (
      <div className="row full-width">
        {processes.map(process =>
          <ProcessBubble key={process.id} process={process} handleClose={this.closeProcess} isLast={processes[processes.length - 1] === process} />
        )}
      </div>
    );
  }
});

module.exports = ProcessList;
