import React, { Component } from 'react'
import Header from './components/header'
import Menu from './components/menu'
import Footer from './components/footer' //./=auto commition
import Login from "./components/login";
import Stock from "./components/stock";
import Register from "./components/register";
import StockCreate from "./components/stockCreate";
import StockEdit from "./components/stockEdit";
import Transaction from "./components/transaction";
import Shop from "./components/shop/shop";
import Report from "./components/report/report";


import { connect } from "react-redux";
import * as actions from "../src/actions/app.action";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { server } from "./constants";
//Arrow function = ตัวแปรแทนฟังก์ชั่น
const isLoggedIn = ()=>{
  return localStorage.getItem(server.TOKEN_KEY) != null;
}


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn() === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);



export class App extends Component {

  componentDidMount(){
    this.props.appForceUpdate(this.forceUpdateEntirely)
  }

  forceUpdateEntirely = () => {
    this.forceUpdate();
  };


  render() {
    const LoginRedirect = ()=>(<Redirect to='/login'/>)
    return (
      // <Router basename="/demo">
        <Router>
        <div>
            {isLoggedIn() ?<Header/>:null}
            {isLoggedIn() ?<Menu/>:null}
            <Route exact path="/" component={LoginRedirect}/> 
              <Route path="/login" component={Login}/>
              <PrivateRoute path="/stock" component={Stock}/>
              <PrivateRoute path="/stock-create" component={StockCreate}/>
              <PrivateRoute path="/stock-edit/:id" component={StockEdit} />
              <PrivateRoute path="/report" component={Report} />
              <Route path="/transaction" component={Transaction} />
              <Route path="/shop" component={Shop} />
              <Route path="/register" component={Register}/>
            {isLoggedIn() ?<Footer/>:null}
              

        </div>
      </Router>
      
    )
  }
}

const mapStateToProps = ({ appReducer }) => ({
  appReducer
});

export default connect(
  mapStateToProps,
  actions
)(App);
