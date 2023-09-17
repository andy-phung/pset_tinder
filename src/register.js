import React from 'react';
import logo from './firestorm_logo.png';
import './index.css';
import { useState } from 'react';
import axios from 'axios';
import FormData from 'form-data';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { Navigate } from "react-router-dom";

export class Register extends React.Component {

  constructor(props) { 
    
    super(props);
    this.state = {
      image_url: "",
      submitted: false,
      authenticated: false
    }

  }

  



    //reader.onload = async function(event) {
    
  //}

  handleSubmit = (event) => {
    event.preventDefault();

    // event.target.elements.username.value

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

    console.log(this.image_url);

    db.collection("user-db").add({
      firstname: event.target.elements.firstname.value,
      lastname: event.target.elements.lastname.value,
      kerb: event.target.elements.kerb.value,
      year: event.target.elements.year.value,
      dorm: event.target.elements.dorm.value,
      gpa: event.target.elements.gpa.value,
      classes: event.target.elements.classes.value,
      imagelink: this.state.image_url,
      pw: event.target.elements.pw.value,
      bio: event.target.elements.bio.value
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });

    this.setState({submitted: true});
    this.setState({authenticated: true});

    console.log("form submitted");

    
    // firebase shit goes here
  };

  render() {
    return (
      <div id="register_page">
        <div id="header">
          <img id="Home_logo" src={logo} alt = "Firestorm Logo" />
          <h1 id="Firestorm_name">Firestorm</h1>
        </div>
        <form id="register_form" onSubmit={this.handleSubmit}> 
        <span>First name:</span><br/>
        <input type="text" name="firstname" /><br/>
        <span>Last name:</span><br/>
        <input type="text" name="lastname" /><br/>
        <span>Kerberos (without @mit.edu):</span><br/>
        <input type="text" name="kerb" /><br/>
        <span>Year:</span><br/>
        <select name="year">
            <option value="1">Freshman</option>
            <option value="2">Sophomore</option>
            <option value="3">Junior</option>
            <option value="4">Senior</option>
        </select><br/>
        <span>Dorm:</span><br/>
        <select name="dorm">
            <option value="Baker">Baker</option>
            <option value="Burton-Conner">Burton-Conner</option>
            <option value="MacGregor">MacGregor</option>
            <option value="Maseeh">Maseeh</option>
            <option value="McCormick">McCormick</option>
            <option value="New">New</option>
            <option value="Next">Next</option>
            <option value="New Vassar">New Vassar</option>
            <option value="Random">Random</option>
            <option value="Random">Simmons</option>
        </select><br/>
        <span>GPA:</span><br/>
        <input type="text" name="gpa"/><br/>
        <span>Classes (enter as comma-separated list, no spaces):</span><br/>
        <input type="text" name="classes"/><br/>
        <span>Biography:</span><br/>
        <input type="text" name="bio"/><br/>
        <span>Upload a profile picture:</span><br/>
        <input type="file" name="image" onInput={async () => {
    const preview = document.querySelector("img");
    const file = document.querySelector("input[type=file]").files[0];
    console.log(file);
    const reader = new FileReader();


    var base = "bleh";

    if (file) {
      base = String(reader.readAsDataURL(file));
    }

    reader.onload = async (event) => {
      base = event.target.result;
      base = base.split(",").pop();
      console.log(base);

      let body = new FormData();
      body.set('key', 'f152283cb0e579eb5538807d81190463');
      body.append('image', base);

      let response = await axios({
        method: 'post',
        url: 'https://api.imgbb.com/1/upload',
        data: body
      });

      const url = response.data.data.url;

      //this.image_url = url;
      this.setState({image_url: url});

    };

    this.setState({image_url: reader.image_url});
  }}/><br/>
        <span>Password:</span><br/>
        <input type="text" name="pw"/><br/>
        <div id="submit_container">
          <input type="submit" id="submit_button" value="Submit →" />
        </div>
        
        </form>
        {this.state.submitted && (
          <Navigate to="/main" state={this.state} replace={true} />
        )}

      </div>
    );
  }
  
}

