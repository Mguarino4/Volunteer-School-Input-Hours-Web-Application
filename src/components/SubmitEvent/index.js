import React, { useState } from 'react'
import Firebase, { db  } from '../Firebase/firebase'
import app from '../Firebase/firebase.js'
import {Card, Form, Button, Alert} from 'react-bootstrap';
import Papa from 'papaparse';
import './style.css'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import firebase from 'firebase';
import { useHistory } from 'react-router-dom';

function eliminateDuplicates(arr) {
  var i,
      len = arr.length,
      out = [],
      obj = {};

  for (i = 0; i < len; i++) {
    obj[arr[i]] = 0;
  }
  for (i in obj) {
    out.push(i);
  }
  return out;
}

class SubmitEvent extends React.Component {
  constructor() {
    super();

    this.state = {
      eventName: "",
      eventUID: Firebase.auth().currentUser.uid,
      message: "",
      location: "",
      csvfile: undefined,
      emails: [],
      public: false,
      value: "",
      studentUIDS: [],
    };

    this.updateData = this.updateData.bind(this);
    
  }



  submitToFirebase = () => {
    var documentID = (Math.random()*1e32).toString(36)
    this.setState({documentID: documentID})
      db.collection("events").add({
        eventName: this.state.eventName,
        location: this.state.location,
        eventUID: documentID,
        message: this.state.message,
        emails: this.state.emails.flat(),
        adminUID: Firebase.auth().currentUser.uid,
        public: this.state.public,
        timestamp: firebase.firestore.Timestamp.fromDate(new Date())
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.log("There was an errror")
    });
    
    var emails = this.state.emails
    this.sendToStudents(emails,documentID )
  }

  sendToStudents = (emails, documentID) => {
    let studentUIDS = this.state.studentUIDS
    console.log(studentUIDS)
    console.log(emails, documentID)
    var i;
    for(i = 0; i< emails.length; i++){
    var email = emails[i]
    var emailAddress = email[0]
    var totalHours = email[1]
      let obj = studentUIDS.find(o => o.userEmail === emailAddress);

      let eventHours = parseInt(totalHours)
      if (obj != undefined){
        db.collection("pendingEventInvitations").doc(obj.userUID).collection("pendingEventInvitations").doc(documentID).set({
          adminUID: Firebase.auth().currentUser.uid,
          email: Firebase.auth().currentUser.email,
          eventID: documentID,
          eventName: this.state.eventName,
          hoursCompleted: 0,
          totalHours: eventHours
      })
      .then(function() {
          console.log("Document successfully written!");
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      });
      }
    }


  }

  componentDidMount(){
    var uids = []
    db.collection("users").get().then(snapshot => {
      snapshot.forEach(doc => {
        let userUID = doc.data().uid
        let userEmail = doc.data().email
        let userData = {
          userUID,
          userEmail,
        }
        uids.push(userData)

      })
      this.setState({studentUIDS: uids})
    })

  }
  
  handleChange = event => {
    this.setState({
      csvfile: event.target.files[0]
    });
  };

  importCSV = () => {
    const { csvfile } = this.state;
    try{
      Papa.parse(csvfile, {
        complete: this.updateData
        
      });

    } catch {
      console.log("NO WORKO")
    }

  };

  updateData(result) {
    var data = result.data;
    console.log(data);
    this.setState({emails: data})
    console.log(data)
  }
  
  
  handleRadioChange = (event) => {
    console.log("THIS POST IS",this.state.public)
    this.setState({ ...this.public, [event.target.name]: event.target.checked });
    
  };

  handleInput(event){
    console.log(event)
    this.setState({value: event.target.value })
  }

render() {
  
  return(
<>
<div className="Emails">
      <h4>Email List:: </h4>
      <ul>
          {
           this.state.emails.map(function(item, i){
             console.log('test');
             return(
               <>
             <li key={i}>{item[0]}</li>
             <h6>Hours: {item[1]}</h6>
             </>
             )
             
           })
         }
        </ul>

      </div>
    <div className="SubmitEvent"> 
      <Card.Body>
      <h2>Submit Event</h2> 
        {this.error && <Alert variant="danger">{this.error}</Alert>}
          <Form.Group id = "eventName">
            <Form.Label>Event Name</Form.Label>
            <Form.Control onChange = {(event) => this.setState({eventName: event.target.value })}/>
          </Form.Group>

          <Form.Group id="message">
            <Form.Label>Brief Description</Form.Label>
            <Form.Control as="textarea" rows={5} onChange = {(event) => this.setState({message: event.target.value })} />
          </Form.Group>

          <Form.Group id = "location">
            <Form.Label>Location</Form.Label>
            <Form.Control onChange = {(event) => this.setState({location: event.target.value })} />
          </Form.Group>
          <h6>Upload a csv of students emails</h6>
          <input
          className="csv-input"
          type="file"
          ref={input => {
            this.filesInput = input;
          }}
          name="file"
          placeholder={null}
          onChange={this.handleChange}
          accept=".csv"
        />
        <button onClick={this.importCSV}>Add Emails</button>
          <h2></h2>
         <h1></h1>
          <Button className="w-100" type="submit" onClick={this.submitToFirebase}>Submit</Button>
          <h2></h2>

          <FormControlLabel
        control={
          <Checkbox
            checked={this.state.public}
            onChange={this.handleRadioChange}
            name="public"
            color="primary"
            labelPlacement="start"
          />
        }
        label="Public for Any Students"
      />
 
      </Card.Body>


      </div>

      </>
  )
}
}
export default SubmitEvent;
