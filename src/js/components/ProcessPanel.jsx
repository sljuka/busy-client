const React = require('react');
const ProcessBubble = require('./ProcessBubble.jsx');
const ProcessStore = require('../stores/ProcessStore')
const ProcessActionCreators = require('../actions/ProcessActionCreators')

let ProcessPanel = React.createClass({
  getInitialState() {
    return {
      blueprints: ProcessStore.getProcesses(true),
      chosen: ProcessStore.getInputPending()
    };
  },

  closeBlueprint(name) {
    ProcessActionCreators.closeBlueprint(name);
  },

  _onChange() {
    this.setState({
      blueprints: ProcessStore.getProcesses(),
      chosen: ProcessStore.getInputPending()
    });
  },

  componentDidMount() {
    ProcessStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    ProcessStore.removeChangeListener(this._onChange);
  },

  reveal(e) {
    e.preventDefault();
    $('#myModal').foundation('reveal', 'open');
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


