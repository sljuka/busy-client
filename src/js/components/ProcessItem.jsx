const ProcessActionCreators = require('../actions/ProcessActionCreators')
const ProcessActions = require('./ProcessActions.jsx')
const StringUtils = require('../utils/StringUtils')
const InputPopup = require('./InputPopup.jsx')

const React = require('react');

let ProcessItem = React.createClass({

  getInitialState() {
    return {
      popupVisible: false
    };
  },

  getDefaultProps() {
    return {
    	process: null
    };
  },

  showClick(e) {
    e.preventDefault();
    var pcs = this.props.process;
    this.props.handleShow(pcs.name, pcs.id);
  },

  inputPopup() {
    this.setState({
      popupVisible: true
    });
  },

  closePopup() {
    this.setState({
      popupVisible: false
    });
  },

  submitPopup(value) {
    this.setState({
      popupVisible: false
    });
    ProcessActionCreators.chooseInput(this.props.process, value);
  },

  render() {

    var pcs = this.props.process;

    var human_name = StringUtils.humanize(this.props.process.name);
    var clss_name = "process-bubble__content__process"
    var popup = ""
    if(pcs.status == "task")
      clss_name += "--task"
    else if(pcs.status == "input")
      clss_name += "--input";
    else if(pcs.status == "finished")
      clss_name += "--finished"

    if(pcs.status == "input" && this.state.popupVisible) {
      popup = <InputPopup process={pcs} handleClose={this.closePopup} handleSubmit={this.submitPopup} />
    }

    return (
      <div>
        {popup}
    		<div className={clss_name} onClick={this.showClick}>  
    			<div className="margin-none row">
            <div className="small-9 columns padding-top-medium">
              <span className="process-bubble__content__process__pid">[ #{this.props.process.pid} ] </span>
              {human_name}
            </div>

            <div className="small-1 columns padding-top-medium">
              <span className="process-bubble__content__process__version">0.0.{this.props.process.process_blueprint_id}</span>
            </div>

            <div className="small-2 columns padding-top-small process-bubble__content__process__actions right">
              <ProcessActions process={this.props.process} handleInput={this.inputPopup} />
            </div>
            
    			</div>
    		</div>
      </div>
    );
  }
});

module.exports = ProcessItem;
