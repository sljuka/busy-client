const React = require('react');
const ProcessActionCreators = require('../actions/ProcessActionCreators')
const ProcessList = require('./ProcessList.jsx');
const ProcessDetail = require('./ProcessDetail.jsx');
const StringUtils = require('../utils/StringUtils');

let ProcessBubble = React.createClass({

  getDefaultProps() {
    return {
      blueprint: {}
    };
  },

  closeClick(e) {
    e.preventDefault();
    this.props.handleClose(this.props.blueprint.name);
  },

  addClick(e) {
    e.preventDefault();
    ProcessActionCreators.addProcess(this.props.blueprint);
  },

  render() {
    var cn = "small-12 large-4 columns" + (this.props.isLast ? " end" : "");

    var middle_content = null
    var blueprint = this.props.blueprint

    if(blueprint.showed === undefined || blueprint.showed === null)
      middle_content = <ProcessList processes={blueprint.processes} />
    else
      middle_content = <ProcessDetail process={blueprint.showed} />

    return (
      <div className={cn}>  
        <div className="process-bubble margin-bottom-medium margin-top-medium">
          <div className="process-bubble__header">
            <a className="process-bubble__header__close icon-button close margin-top-small margin-right-medium" onClick={this.closeClick}><i className="step fi-x"></i></a>
            <h4 className="text-center font-bold padding-top-tiny">{StringUtils.humanize(blueprint.name)} <span className="process-bubble__header__version">0.0.{blueprint.id}</span></h4>
          </div>

          {middle_content}

          <div className="process-bubble__footer">
            <a title="Add process" className="icon-button--smaller add margin-top-small margin-left-medium" onClick={this.addClick}><i className="step fi-plus"></i></a>
          </div>
        </div>
      </div>
    );

  }
});

module.exports = ProcessBubble;
