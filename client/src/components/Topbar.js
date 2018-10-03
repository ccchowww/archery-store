import React, { Component } from 'react';
import '../App.css';


class Topbar extends Component {

  render() {
    return (
      <div>
          <span className="topbar">
            <a className="topbar-item-left-link" href="https://github.com/ccchowww/archery-store">
              <span className="topbar-item-left">
                  <span>Github</span>
              </span>
            </a>
              <span className="topbar-item-right">
                  <select className="topbar-item-right-select"
                    value={this.props.locale} onChange={this.props.handleLocaleChange}>
                    <option value="SG">SG</option>
                    <option value="MY">MY</option>
                    <option value="US">US</option>
                    <option value="UK">UK</option>
                    <option value="EU">EU</option>
                  </select>
              </span>
              
          </span>
      </div>
    );
  }
}

export default Topbar;