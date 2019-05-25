import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./menu.css";

export default class Menu extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      selectedMenu: "shop"
    };
  };
  
  render() {
    return (
      <div>
        {/* Left side column. contains the logo and sidebar */}
        <aside className="main-sidebar">
          {/* sidebar: style can be found in sidebar.less */}
          <section className="sidebar">
            <ul className="sidebar-menu">
              <li
                className="header"
                style={{ padding: 0, position: "relative" }}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/images/react_js_logo.jpg`}
                  style={{ height: 230 }}
                  className="img-responsive"
                  alt="profile"
                />
              </li>
              <li className="header">MAIN NAVIGATION</li>
              {/* Stock */}
              <li className={this.state.selectedMenu === 'stock' ? 'treeview active' : 'treeview' } onClick={()=>this.setState({selectedMenu: 'stock'})}>
                <Link to="/stock" className="linkCustom">
                  <i className="fa fa-database" />
                  <span>Stock</span>
                  <small className="label pull-right bg-green">new</small>
                </Link>
              </li>

              {/* Shop */}
              <li className={this.state.selectedMenu === 'shop' ? 'treeview active' : 'treeview' } onClick={()=>this.setState({selectedMenu: 'shop'})}>
                <Link to="/shop"  className="linkCustom">
                  <i className="fa fa-shopping-basket" />
                  <small className="label pull-right bg-green">16</small>
                  <span>Shop</span>
                </Link>
              </li>

              {/* Report */}
              <li className={this.state.selectedMenu === 'report' ? 'treeview active' : 'treeview' } onClick={()=>this.setState({selectedMenu: 'report'})}>
                <Link to="/report" className="linkCustom">
                  <i className="fa fa-pie-chart" />
                  <small className="label pull-right bg-red">3</small>
                  <span>Report</span>
                </Link>
              </li>

              {/* Transaction */}
              <li className={this.state.selectedMenu === 'transaction' ? 'treeview active' : 'treeview' } onClick={()=>this.setState({selectedMenu: 'transaction'})}>
                <Link to="/transaction" className="linkCustom">
                  <i className="fa fa-money" />
                  <span>Transactions</span>
                  <small className="label pull-right bg-yellow">12</small>
                </Link>
              </li>
            </ul>
          </section>
        </aside>
      </div>
    );
  }
}
