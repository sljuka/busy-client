const React = require('react');
const ProcessActionCreators = require('../actions/ProcessActionCreators')
const ProcessItem = require('./ProcessItem.jsx');
const StringUtils = require('../utils/StringUtils');

let ProcessTable = React.createClass({

  getDefaultProps() {
    return {
      process: {}
    };
  },

  render() {
    var pcs = this.props.process;

    var runned_at = pcs.runned_at
    if(runned_at === null)
      runned_at = "not runned yet"
    else
      runned_at = StringUtils.timeAgo(new Date(runned_at).getTime());

    var finished_at = pcs.finished_at
    if(finished_at === null)
      finished_at = "not finished yet"
    else
      finished_at = StringUtils.timeAgo(new Date(finished_at).getTime());

    return (
      <table>
        <tr>
          <th>name</th>
          <td>{pcs.name}</td>
        </tr>
        <tr>
          <th>pid</th>
          <td>{pcs.pid}</td>
        </tr>
        <tr>
          <th>created</th>
          <td>{StringUtils.timeAgo(new Date(pcs.created_at).getTime())}</td>
        </tr>
        <tr>
          <th>runned</th>
          <td>{runned_at}</td>
        </tr>
        <tr>
          <th>finished</th>
          <td>{finished_at}</td>
        </tr>
      </table>
    );
  }
});

module.exports = ProcessTable;
