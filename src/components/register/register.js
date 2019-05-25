import React, { Component } from "react";

class Register extends Component {
  render() {
    return (
      <div>
        <div className="login-box">
          <div className="login-logo">
            <a href="../../index2.html">
              <b>Register</b>
            </a>
          </div>
          {/* /.login-logo */}
          <div className="login-box-body"  style={{background:'whitesmoke', padding: 30, borderRadius: 10}}>
            <p className="login-box-msg">Register to start your session</p>
            <form>
              <div className="form-group has-feedback">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                />
                <span className="glyphicon glyphicon-envelope form-control-feedback" />
              </div>
              <div className="form-group has-feedback">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
                <span className="glyphicon glyphicon-lock form-control-feedback" />
              </div>
              <div className="row">
              
                <div className="col-xs-12">
                  <button
                     onClick={()=>this.props.history.push("/stock")}
                    className="btn btn-primary btn-block btn-flat"
                  >
                    Register
                  </button>
                </div>
                {/* /.col */}
              </div>
              <div className="row" style={{marginTop: 8}}>
              
                <div className="col-xs-12">
                  <button
                    onClick={(e)=>{this.props.history.goBack(); e.preventdefault()}}//ยังไม่เสร็จ
                    className="btn btn-default btn-block btn-flat"
                  >
                    Cancel
                  </button>
                </div>
                {/* /.col */}
              </div>
           
            </form>        
          </div>
          {/* /.login-box-body */}
        </div>
      </div>
    );
  }
}

export default Register;