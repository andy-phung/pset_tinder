import React from 'react';
import logo from './firestorm_logo.png';
import left from './swipe_left.png';
import right from './swipe_right.png';
import './index.css';

export class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div class = "swipe_bg">
        <header id="swipe_logo">
          <h1>Firestorm</h1>
        </header>
        <div>
          <center>
            <button type="button" id="swipe_left">
              <img src={left} alt="swipe left" width="120" height="auto"/>
            </button>
            {/* Profil/bio to be added goes here */}
            <div id="profile_box">
              <div class="bio">
                <img src="" alt="profile picture"/>
                <p><b>First Name:</b></p>
                <p><b>Last Name:</b></p>
                <p><b>Year:</b></p>
                <p><b>Dorm:</b></p>
                <p><b>GPA:</b></p>
                <p><b>Classes:</b></p>
                <p><b>Bio:</b></p>
              </div>
            </div>
            <button type="button" id="swipe_right">
              <img src={right} alt="swipe right" width="120" height="auto"/>
            </button>
          </center>
        </div>
        <div class="swipe_bg"> 
          <br></br><br></br><br></br>
        </div>
      </div>
    );
  }
  
}

