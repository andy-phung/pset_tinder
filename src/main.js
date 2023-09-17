import React from 'react';
import logo from './firestorm_logo.png';
import left from './swipe_left.png';
import right from './swipe_right.png';
import './index.css';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { useLocation, useNavigate, useParams } from 'react-router-dom';




// three more fields: elo, swiped right (list of kerbs), match
// check for match whenever user logs in
// criteria is mutual right swipe with elo in range +/- 100 (?)
// can just increment/decrement by 32 for swipes


export class Main extends React.Component {

  
  constructor(props) {
    super(props);
    //console.log("state");
    //console.log(this.props.location.state);
  }

  shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  generate_recommendations() {
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

    var potential_matches = []
    var user;

    db.collection("user-db").where("kerb", "==", this.props.location.state.kerb).get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          user = doc.data()
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

    db.collection("user-db").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {

          if((doc.data().elo > user.elo - 100 || doc.data().elo < user.elo + 100) && doc.data().kerb != this.props.location.state.kerb) 
          {
            potential_matches.push(doc.data())
          }
      });
  });

  this.shuffle(potential_matches);
  return potential_matches;

  }

  render() {
    var potential_matches = this.generate_recommendations();

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



const withRouter = Component => props => {
  const location = useLocation();
  // other hooks
  return <Component {...props} {...{ location}} />;
};


export default withRouter(Main);
