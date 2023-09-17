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
    this.state = {
      data: false,
      index: 0,
      potential_matches: [{
        firstname: "",
        lastname: "",
        year: "",
        dorm: "",
        gpa: "",
        classes: "",
        bio: ""
      },],
    }
    console.log(this.state.potential_matches[this.state.index].firstname);
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

  async componentDidMount() {
    this.generate_recommendations().then((arr) => {
      console.log("componentdidmount");
      console.log(arr);
      this.setState({potential_matches: arr});
      this.setState({data: true});
    })
  }

  async generate_recommendations() {
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

    var potential_matches = [];
    var user;

    var querySnapshot = await db.collection("user-db").where("kerb", "==", this.props.location.state.kerb).get()
    querySnapshot.forEach((doc) => {
      user = doc.data();
    });

    querySnapshot = await db.collection("user-db").get();

    querySnapshot.forEach((doc) => {

      if((doc.data().elo > user.elo - 100 || doc.data().elo < user.elo + 100) && doc.data().kerb != this.props.location.state.kerb) 
      {
        potential_matches.push(doc.data())
      }
    });
    return Promise.resolve(potential_matches);  
  

  }

  left_swipe = async (otherkerb) => {

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

    if(otherkerb) {
      
      var otheruser;
      var otheruserid;
      var querySnapshot = await db.collection("user-db").where("kerb", "==", otherkerb).get()
      querySnapshot.forEach((doc) => {
        otheruser = doc.data();
        otheruserid = doc.id;
      });
      
      
      db.collection("user-db").doc(otheruserid).set({
        bio: otheruser.bio,
        classes: otheruser.classes,
        dorm: otheruser.dorm,
        elo: otheruser.elo - 32,
        firstname: otheruser.firstname,
        gpa: otheruser.gpa,
        imagelink: otheruser.imagelink,
        kerb: otheruser.kerb,
        lastname: otheruser.lastname,
        match: otheruser.match,
        pw: otheruser.pw,
        rightswipes: otheruser.rightswipes,
        year: otheruser.year
      });

    
    }


    this.setState({index: this.state.index+1});

  }

  right_swipe = async (otherkerb) => {

    console.log("otherkerb");
    console.log(otherkerb);

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

    if(otherkerb) {
      var querySnapshot = await db.collection("user-db").where("kerb", "==", this.props.location.state.kerb).get()
      var user;
      var userid;
      querySnapshot.forEach((doc) => {
        user = doc.data();
        userid = doc.id;
      });

      var otheruser;
      var otheruserid;
      var querySnapshot = await db.collection("user-db").where("kerb", "==", otherkerb).get()
      querySnapshot.forEach((doc) => {
        otheruser = doc.data();
        otheruserid = doc.id;
      });
      
      
      db.collection("user-db").doc(otheruserid).set({
        bio: otheruser.bio,
        classes: otheruser.classes,
        dorm: otheruser.dorm,
        elo: otheruser.elo + 32,
        firstname: otheruser.firstname,
        gpa: otheruser.gpa,
        imagelink: otheruser.imagelink,
        kerb: otheruser.kerb,
        lastname: otheruser.lastname,
        match: otheruser.match,
        pw: otheruser.pw,
        rightswipes: otheruser.rightswipes,
        year: otheruser.year
      });

      db.collection("user-db").doc(userid).set({
        rightswipes: user.rightswipes + "," + otherkerb,
        bio: user.bio,
        classes: user.classes,
        dorm: user.dorm,
        elo: user.elo,
        firstname: user.firstname,
        gpa: user.gpa,
        imagelink: user.imagelink,
        kerb: user.kerb,
        lastname: user.lastname,
        match: user.match,
        pw: user.pw,
        year: user.year
      });


    
    }

    

    this.setState({index: this.state.index+1});


  }

  render() {


    

    //console.log(this.state.potential_matches[this.state.index]);
    if (!this.state.data || this.state.index > this.state.potential_matches.length - 1) {
      console.log("is this working");
      return <div />
      }

    return (
      <div class = "swipe_bg">
        <header id="swipe_logo">
          <h1>Firestorm</h1>
        </header>
        <div>
          <center>
            <button type="button" id="swipe_left" onClick={() => {this.left_swipe(this.state.potential_matches[this.state.index].kerb)} }>
              <img src={left} alt="swipe left" width="120" height="auto"/>
            </button>
            {/* Profil/bio to be added goes here */}
            <div id="profile_box">
              <div class="bio">
                <img id="pfps" src={this.state.potential_matches[this.state.index].imagelink} alt="profile picture"/>
                <p><b>First Name: {this.state.potential_matches[this.state.index].firstname}</b></p>
                <p><b>Last Name: {this.state.potential_matches[this.state.index].lastname}</b></p>
                <p><b>Year: {this.state.potential_matches[this.state.index].year}</b></p>
                <p><b>Dorm: {this.state.potential_matches[this.state.index].dorm} </b></p>
                <p><b>GPA: {this.state.potential_matches[this.state.index].gpa} </b></p>
                <p><b>Classes: {this.state.potential_matches[this.state.index].classes} </b></p>
                <p id = "bio"><b>Bio: {this.state.potential_matches[this.state.index].bio} </b></p>
              </div>
            </div>
            <button type="button" id="swipe_right" onClick={() => {this.right_swipe(this.state.potential_matches[this.state.index].kerb)} }>
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
