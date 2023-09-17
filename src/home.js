import React, {useState, useEffect} from 'react';
import logo from './firestorm_logo.png';
import arrow from './downarrow_button.png';
import './index.css';
import { useRef } from 'react';

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.intro_ref = React.createRef()
  }

  timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async componentDidMount() {
    await this.timeout(100);
    } 

  


  scroll = (event) => {
    //.current is verification that your element has rendered
    if(this.intro_ref.current){
        this.intro_ref.current.scrollIntoView({ 
           behavior: "smooth", 
           block: "start", 
           inline: 'start'
        })
    }
  }

  render() {
    return (
      <div>
        <div class = "header">
          <header>
            <img id="Home_logo" src={logo} alt = "Firestorm Logo" />
            <h1 id="Firestorm_name">Firestorm</h1>
            <button type="button" id="Log_In"><b>Log In</b></button>
            <p id="Tagline"><b>Burn through psets. Together.</b></p>
            <center>
              <button type="button" id="Create_Account">
                <b>Create Account</b>
              </button>
            </center>
            <center>
              <button type="button" id="About_arrow" onClick={this.scroll}>
                <img src={arrow} alt = "down_arrow" height="80" width="80"/>
              </button>
            </center>
          </header>
        </div>
        <div id = "description" class = "about" ref={this.intro_ref}>
          <div class="row">
            <div class="column">
              <h1>What is Firestorm?</h1>
              <p class = "description">Firestorm is the ultimate web app for 
              students and professionals seeking a seamless way to find 
              their ideal problem-solving partner. Tired of struggling 
              through assignments or projects alone? Look no further. 
              Firestorm has you covered.
              <br/>
              <br/>
              Whether you're tackling a challenging math problem set, 
              a complex coding project, or any other academic or 
              professional task, Firestorm is here to help you find 
              your perfect problem set partner. Join today and experience
               the revolution in collaborative problem-solving!</p>
            </div>
            <div class="column">
              <h1>How does it work?</h1>
              <p class = "description">
                Begin by filling out your personal profile: let your
                classmates know what makes you the ideal problem set
                mate! With our sophisticated matching algorithm,
                you will be presented with a candidate, for whom 
                you an choose to either accept or reject.
                <br/>
                <br/>
                If both of you accept each other, congratulations!
                You have found a match and are ready to burn your
                psets together. If not, keep swiping! May you 
                eventually find the pset partner of your life.
                After your pset session, feel free to leave a 
                review. Help others make informed decisions in 
                their pset partner finding journey! 
              </p>
            </div>
            <div class="column">
              <h1>Why is it unique?</h1>
              <p class = "description">
                <b>Smart Matching Algorithms</b>: Firestorm uses sophisticated machine learning
                algorithms to improve your odds of finding
                the pset partner of your life. Say goodbye
                to mismatched collaborations!
                <br/>
                <br/>
                <b>Robust Profile Customization</b>: This 
                ensures that you're matched with someone who complements 
                your strengths and schedule.
                <br/>
                <br/>
                <b>Rating and Reviews</b>: Build trust and confidence
                 by viewing user reviews and ratings. You can also 
                 leave feedback after collaborating, helping others 
                 make informed choices.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
}

