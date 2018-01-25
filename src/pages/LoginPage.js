import React, {Component} from 'react';

import './loginPage.css'
import '../App.css'
import MyNormal from "../components/utils/myNormal/MyNormal";
import {ToastContainer} from "react-toastify";

class LoginPage extends Component {
  handleClick(path) {
    this.props.history.push(path);
  }

  render() {
    return (
      <div className="pageContainer">
        <div className="loginHeader">ServiceRoom</div>
        <ToastContainer />
        <div className="pageContent">
          <div className="loginRect">
            <div className="loginRectInner">
              <div className="loginRectNormal">
                <MyNormal label="Login"/>
              </div>

              <MyNormal label="Hasło"/>
              <button className="btn btn-default login" onClick={() => this.props.history.push("calendar")}>Login</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;