import React, { Component } from "react";
import { connect } from 'react-redux';
import {login, autoLogin} from './../../actions/login.action'
class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: "",
        password: ""
      }
    };
  }

  componentDidMount(){
    this.props.autoLogin(this.props.history)
  }

  onClickLogin = ()=>{

    this.props.login(this.props.history, this.state.user)
  }

  handleChange = (event)=> {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }

  render() {
    return (
      <div>
        <div className="login-box">
          <div className="login-logo">
            <a href="../../index2.html">
              <b>Admin</b>LTE
            </a>
          </div>
          {/* /.login-logo */}
          <div className="login-box-body" style={{background:'whitesmoke',padding:30,borderRadius:10}}>
                      <p className="login-box-msg">Sign in to start your session</p>
            <form>
              <div className="form-group has-feedback">
                <input
                  name="username"
                  onChange={this.handleChange}
                  type="email"
                  className="form-control"
                  placeholder="Email"
                />
                <span className="glyphicon glyphicon-envelope form-control-feedback" />
              </div>
              <div className="form-group has-feedback">
                <input
                 name="password"
                 onChange={this.handleChange}
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
                <span className="glyphicon glyphicon-lock form-control-feedback" />
              </div>
              <div className="row">
                <div className="col-xs-8">
                  <div className="checkbox icheck">
                    <label>
                      <input type="checkbox" /> Remember Me
                    </label>
                  </div>
                </div>
                {/* /.col */}
                <div className="col-xs-4">
                  <button
                    onClick={(e)=>{this.onClickLogin(); e.preventDefault()}}
                    type="submit"
                    className="btn btn-primary btn-block btn-flat"
                  >
                    Sign In
                  </button>
                </div>
                {/* /.col */}
                <div className="row">
                  <div className="col-xs-12">
                    {this.props.loginReducer.isFetching ? (
                      <span>Loading...</span>
                    ): this.props.loginReducer.result && (
                      <span>{this.props.loginReducer.result}</span>
                    )
                    }
                  </div>
                </div>

              </div>
            </form>
 
            <br />
            <a onClick={()=>this.props.history.push("/register")} className="text-center">
              Register a new membership
            </a>
          </div>
          {/* /.login-box-body */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({loginReducer}) => ({
  loginReducer
})

const mapDispatchToProps = {
  login ,autoLogin
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);