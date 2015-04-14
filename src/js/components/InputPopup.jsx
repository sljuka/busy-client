const React = require('react');

let InputPopup = React.createClass({

  closeClick(e) {
    e.preventDefault();
    this.props.handleClose();
  },

  submitClick(e) {
    var value = document.getElementById("select-next-" + this.props.process.id).value
    this.props.handleSubmit(value);
  },

  render() {
    var pcs = this.props.process
    var popup_id = "process-item-" + pcs.id;
    var question = pcs.current.question === undefined ? "Please select one option" : pcs.current.question;
    return (
      <div>
        <div className="modal__black-wall" onClick={this.closeClick}></div>
        <div id={popup_id} className="modal__popup">
          <a className="modal__popup__close-link" onClick={this.closeClick}><i className="step fi-x"></i></a>
          <h2 id="modalTitle">{pcs.current.human_name}</h2>
          <p>{question}</p>
          <select id={"select-next-" + pcs.id}>
            {pcs.current.following.map(acc =>
              <option key={acc.id} value={acc.name}>{acc.human_name}</option>
            )}
          </select>
          <button className="button small" onClick={this.submitClick}>Submit</button>
        </div>
      </div>
    );
  }
});

module.exports = InputPopup;
