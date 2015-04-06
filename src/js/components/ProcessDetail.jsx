const React = require('react');
const ProcessActionCreators = require('../actions/ProcessActionCreators')
const ActionList = require('./ActionList.jsx');
const StringUtils = require('../utils/StringUtils');

let ProcessDetail = React.createClass({

  getDefaultProps() {
    return {
      process: {}
    };
  },

  indexClick() {
    ProcessActionCreators.goToIndex(this.props.process.name)
  },

  render() {
    var runned_at = this.props.process.runned_at
    if(runned_at === null)
      runned_at = "not runned yet"
    else
      runned_at = StringUtils.timeAgo(new Date(runned_at).getTime());

    return (
    <div className="process-bubble__content padding-left-small">
      <div>
        
        <a className="icon-button--larger--dgrey add margin-top-small margin-none" onClick={this.indexClick}>
          <i className="step fi-arrow-left"></i>
        </a>
        
      </div>

      <div className="row margin-none">

        <div className="padding-none small-9 columns end">
          <table>
            <tr>
              <th>name</th>
              <td>{this.props.process.name}</td>
            </tr>
            <tr>
              <th>pid</th>
              <td>{this.props.process.pid}</td>
            </tr>
            <tr>
              <th>created</th>
              <td>{StringUtils.timeAgo(new Date(this.props.process.created_at).getTime())}</td>
            </tr>
            <tr>
              <th>runned</th>
              <td>{runned_at}</td>
            </tr>
          </table>
        </div>

        <div className="padding-none small-3 columns end">
          <ActionList process={this.props.process} />
        </div>

      </div>

      
    </div>
    );
  }
});

module.exports = ProcessDetail;
