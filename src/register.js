import React from 'react';
import logo from './firestorm_logo.png';
import './index.css';
import { useState } from 'react';

export class Register extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    function previewFile() {
      const preview = document.querySelector("img");
      const file = document.querySelector("input[type=file]").files[0];
      console.log(file);
      const reader = new FileReader();
  

      var base = "bleh";
    
      if (file) {
        //base = reader.readAsDataURL(file);
      }

      console.log(base);
      console.log("huh");
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "https://jsonplaceholder.typicode.com/todos");
      xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

      const body = JSON.stringify({
        key: "f152283cb0e579eb5538807d81190463",
        image: base
      });
      xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 201) {
          console.log(JSON.parse(xhr.responseText));
        } else {
          console.log(`Error: ${xhr.status}`);
        }
      };
      xhr.send(body);
      
    }


    const handleSubmit = (event) => {
      event.preventDefault();
      //console.log(event.target.elements.firstname.value)
      //console.log(event.target.elements.image.value)
      //console.log(event.srcElement.files[0]) // from elements property
      //console.log(event.target.username.value) 
    }


    return (
      <div id="register_page">
        <div id="header">
          <img id="Home_logo" src={logo} alt = "Firestorm Logo" />
          <h1 id="Firestorm_name">Firestorm</h1>
        </div>
        <form id="register_form" onSubmit={handleSubmit}> 
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
        <span>Upload a profile picture:</span><br/>
        <input type="file" name="image" onInput={previewFile}/><br/>
        <div id="submit_container">
          <input type="submit" id="submit_button" value="Submit →" />
        </div>
        
        </form>
      </div>
    );
  }
  
}

