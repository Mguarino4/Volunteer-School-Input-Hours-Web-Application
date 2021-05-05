import {Card, Form, Button, Alert} from 'react-bootstrap';
import React from 'react';
import Firebase, {auth, db} from '../Firebase/firebase'
import {useAuth} from "../contexts/AuthContext"
import { Link,useHistory } from 'react-router-dom';
import firebase from 'firebase';
import './AdminSettings.css' 

class AdminSettings extends React.Component {
  constructor() {
    super();
    this.state = {
      admin: null,
      emailRef: " ",
        
      error: "",
      setError: "",
      loading: "",
      userUID: Firebase.auth().currentUser.uid,
      // history = useHistory()

    };
  }

  componentDidMount(){
    console.log("Mounted");
    var docRef = db.collection("users").doc(this.state.userUID);

    docRef.get().then( snapshot => {
        this.setState({
          emailRef: snapshot.data().email,
          majorRef: snapshot.data().major,
          gradYearRef: snapshot.data().gradYear,
          actionScholarRef: snapshot.data().actionYear,
          mentorRef: snapshot.data().mentor,
          admin: snapshot.data().admin,
        })

  }).catch(
      console.log("Error getting document:")
  );
  }

  submitToFirebase = () => {
      db.collection("users").doc(this.state.userUID).set({
        email: this.state.emailRef,
    }, { merge: true })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
      this.setError(error)
      console.log("There was an errror")
    });
  }

  submitAdminAccess = () => {
    db.collection("adminRequests").doc(this.state.userUID).set({
      email: this.state.emailRef,
      uid: this.state.userUID,
    }).catch(function(error) {
      this.setError(error)
      console.log("There was an errror")
    });
  }

render() {
      return(
        <div className="Settings"> 
        <Card.Body>
        <h2>Admin Settings</h2> 
          {this.error && <Alert variant="danger">{this.error}</Alert>}
          {/* <Form onSubmit={this.submitToFirebase}> */}
            <Form.Group id = "major">
              <Form.Label>Email</Form.Label>
              <Form.Control placeholder={this.state.emailRef} disabled={true} onChange = {(event) => this.setState({emailRef: event.target.value })}/>
            </Form.Group>
            <Button className="w-100" type="submit" onClick={this.submitToFirebase}>Update</Button>
            <h2></h2>
          {/* </Form> */}
        </Card.Body>
        </div>
      )
    }
}
export default AdminSettings;

