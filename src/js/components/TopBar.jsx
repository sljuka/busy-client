const React = require('react');
const BlueprintStore = require('../stores/BlueprintStore')
const BlueprintActionCreators = require('../actions/BlueprintActionCreators')
const ProcessActionCreators = require('../actions/ProcessActionCreators')
const StringUtils = require('../utils/StringUtils');

let TopBar = React.createClass({
  getInitialState() {
    return {
      blueprints: [
        {
          name: "no processes",
          id: -1,
          processes: []
        }
      ]
    };
  },

  _onChange() {
    this.setState({
      blueprints: BlueprintStore.getBlueprints()
    });
  },

  componentDidMount() {
    BlueprintStore.addChangeListener(this._onChange);
    BlueprintActionCreators.getBlueprints();
  },

  selectChange(e) {
    var name = e.target.value
    console.log(name)
    if(name === "none")
      return;

    ProcessActionCreators.openBlueprint({
      name: name
    });
  },

  render() {

    var blueprints = this.state.blueprints;

    return (
      <nav className="top-bar" data-topbar role="navigation">
        <ul className="title-area">
          <li className="name">
            <h1><a href="#">BF</a></h1>
          </li>   
          <li className="toggle-topbar menu-icon"><a href="#"><span>Menu</span></a></li>
        </ul>

        <section className="top-bar-section"> 
          <ul className="left">
            <li>
              <select className="medium top-bar__blueprints-dropdown" onChange={this.selectChange}>
                <option value={"none"} key={-1}>Choose process schema</option>
                {blueprints.map(bp =>
                  <option value={bp.name} key={bp.id}>{StringUtils.humanize(bp.name)}</option>
                )}
              </select>
            </li>
          </ul>
        </section>
      </nav>
    );
  }
});

module.exports = TopBar;
