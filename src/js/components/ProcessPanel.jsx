const React = require('react');
const ProcessBubble = require('./ProcessBubble.jsx');
const ProcessStore = require('../stores/ProcessStore')
const BlueprintStore = require('../stores/BlueprintStore')
const ProcessActionCreators = require('../actions/ProcessActionCreators')

let ProcessPanel = React.createClass({
  getInitialState() {
    return {
      blueprints: []
    };
  },

  closeBlueprint(name) {
    ProcessActionCreators.closeBlueprint(name);
  },

  _onChange() {
    this.setState({
      blueprints: ProcessStore.getProcesses()
    });
  },

  componentDidMount() {
    ProcessStore.addChangeListener(this._onChange);
    ProcessActionCreators.getProcesses();
  },

  componentWillUnmount() {
    ProcessStore.removeChangeListener(this._onChange);
    BlueprintStore.removeChangeListener(this._blueprintsChange);
  },

  render() {
    var blueprints = this.state.blueprints;
    return (
      <div className="row full-width">
        {blueprints.map(bp =>
          <ProcessBubble key={bp.id} blueprint={bp} handleClose={this.closeBlueprint} isLast={blueprints[blueprints.length - 1] === bp} />
        )}
      </div>
    );
  }
});

module.exports = ProcessPanel;


