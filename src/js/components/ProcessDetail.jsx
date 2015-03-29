const React = require('react');
const ProcessActionCreators = require('../actions/ProcessActionCreators')
const ProcessContent = require('./ProcessItem.jsx');

let ProcessDetail = React.createClass({

  getDefaultProps() {
    return {
      process: {
        processes: []
      }
    };
  },

  indexClick() {
    ProcessActionCreators.goToIndex(this.props.process.name)
  },

  render() {
    var runned_at = this.props.process.showedProcess.runned_at
    if(runned_at === null)
      runned_at = "not runned yet"
    else
      runned_at = new Date(runned_at).toLocaleString()

    return (
    <div className="process-bubble__content padding-left-small padding-top-medium">
      <div>
        
        <a className="add margin-top-small margin-left-medium" onClick={this.indexClick}>
          Back
          <span>{this.props.process.showedProcess.id}</span>
        </a>
        
      </div>

      <div className="row">

        <div className="small-7 columns end">
          <table>
            <tr>
              <th>name</th>
              <td>{this.props.process.showedProcess.name}</td>
            </tr>
            <tr>
              <th>id</th>
              <td>{this.props.process.showedProcess.id}</td>
            </tr>
            <tr>
              <th>creation time</th>
              <td>{new Date(this.props.process.showedProcess.created_at).toLocaleString()}</td>
            </tr>
            <tr>
              <th>runned at</th>
              <td>{runned_at}</td>
            </tr>
          </table>
        </div>

      </div>

      
    </div>
    );
  }
});

module.exports = ProcessDetail;
