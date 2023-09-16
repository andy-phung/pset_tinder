import React from 'react';
import logo from './firestorm_logo.png';
import './index.css';

export class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div class = "header">
        <header>
          <img id="Home_logo" src={logo} alt = "Firestorm Logo" />
          <h1 id="Firestorm_name">Firestorm</h1>
          <button type="button" id="Log_In">Log In</button>
        </header>
      </div>
    );
  }
  
}

