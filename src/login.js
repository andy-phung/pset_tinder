import React from 'react';
import logo from './firestorm_logo.png';
import './index.css';
import { useState } from 'react';
import axios from 'axios';
import FormData from 'form-data';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { Navigate } from "react-router-dom";
import Hashes from "jshashes"

export class Login extends React.Component {

  constructor(props) { 
    
    super(props);
    this.state = {
      submitted: false,
      authenticated: false
    }

  }


    //reader.onload = async function(event) {
    
  //}

  handleSubmit = (event) => {
    event.preventDefault();

    // event.target.elements.username.value

    var SHA256 = new Hashes.SHA256

    const firebaseConfig = {
      apiKey: "AIzaSyCPXQnlJg7oVQNhCEBnKHrE7syPLWRnm7w",
      authDomain: "firestorm-f1b5d.firebaseapp.com",
      projectId: "firestorm-f1b5d",
      storageBucket: "firestorm-f1b5d.appspot.com",
      messagingSenderId: "916205727733",
      appId: "1:916205727733:web:4703a3988e5c311b607abc",
      measurementId: "G-KMW0CSZS93"
    };

    firebase.initializeApp(firebaseConfig);
    // Initialize Cloud Firestore and get a reference to the service
    const db = firebase.firestore();
    var users = db.collection("user-db");
    var results = users.where("kerb", "==", String(event.target.elements.kerb.value)).get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            //doc.data().pw
            if(String(doc.data().pw) === SHA256.hex(String(event.target.elements.pw.value))) {
              this.setState({submitted: true});
              this.setState({authenticated: true});
            }
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });


    console.log(this.image_url);


    // check kerb and pw hash


    

    console.log("form submitted");

  
  };

  render() {
    return (
      <div id="register_page">
        <div id="header">
          <img id="Home_logo" src={logo} alt = "Firestorm Logo" />
          <h1 id="Firestorm_name">Firestorm</h1>
        </div>
        <form id="register_form" onSubmit={this.handleSubmit}> 
        <span>Kerberos (without @mit.edu):</span><br/>
        <input type="text" name="kerb" /><br/>
        <span>Password:</span><br/>
        <input type="password" name="pw"/><br/>
        <div id="submit_container">
          <input type="submit" id="submit_button" value="Log in →" />
        </div>
        
        </form>
        {this.state.submitted && (
          <Navigate to="/main" state={this.state} replace={true} />
        )}

      </div>
    );
  }
  
}

