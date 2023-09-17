import React from 'react';
import { ReactDOM, createRoot } from "react-dom/client";
import './index.css';

import { 
  Routes, 
  Route, 
  Outlet, 
  Link, 
  BrowserRouter
  } from "react-router-dom";

import { Login } from "./login"
import { Register } from "./register"
import { Account } from "./account"
import { Home } from "./home"
import Main from "./main"
import { NavBar, NotFound } from "./util"

  
export default class App extends React.Component { 
  constructor(props) {
    super(props);
    this.app = React.createRef();
  }

  render() {
    return (
      <div ref={this.app} className="App">
          <Routes>
            <Route path="/" element={ <NavBar/> }>
              <Route index element={ <Home/> } />
              <Route path="login" element={<Login/>} />
              <Route path="register" element={<Register/>} />
              <Route path="main" element={ <Main/> } />
              <Route path="account" element={<Account/>} />
              <Route path="*" element={<NotFound/>} />
            </Route>
          </Routes>   
      </div>
    );
  }
}