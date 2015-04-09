const React = require('react');

let Authentication = React.createClass({

  
  loginClick(e) {
    e.preventDefault();
    var un = document.getElementById("username").value;
    var pass= document.getElementById("password").value;
    this.props.handleLogin(un, pass); 
  },

  render() {
    return (
      <div className="row margin-top-large">
        <form>
          
          <div className="row">
            <div className="small-offset-4 small-4 columns end">
              <label>Username
                <input type="text" placeholder="username" id="username" />
              </label>
            </div>
          </div>

          <div className="row">
            <div className="small-offset-4 small-4 columns end">
              <label>Password
                <input type="password" placeholder="password" id="password" />
              </label>
            </div>
          </div>

          <div className="row">
            <div className="small-offset-4 small-4 columns end">
              <input type="submit" value="Login" className="button" onClick={this.loginClick} />
            </div>
          </div>

        </form>
      </div>
    );
  }

});

module.exports = Authentication;
