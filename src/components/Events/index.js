import React, { Component } from 'react'
import {Card, Form, Button, Alert} from 'react-bootstrap';
import Firebase, { db  } from '../Firebase/firebase'

export class Events extends Component {
    constructor() {
        super();
        this.state = {
          events: [],
          email: Firebase.auth().currentUser.email,
          uid: Firebase.auth().currentUser.uid,
        };
      }

      componentDidMount(){
        db.collection("events").orderBy("timestamp").get().then(snapshot => {
            const events = []
            
            snapshot.forEach(doc => {
                console.log(doc.data().public)
                if(doc.data().public == true){
                    const data = doc.data()
                    data.id = doc.id
                    console.log("Here is the needed data",doc.id)
                    events.push(data)
                }

            })
            this.setState({events: events})
          }).catch(error => console.log(error))
               
      }
      
      requestEvent = (event) => {
        console.log(event)
        var docRef = event.id + this.state.uid
        db.collection("eventRequests").doc(event.adminUID).collection("eventRequests").doc(docRef).set({
            email: this.state.email,
            uid: this.state.uid,
            eventID: event.id,
            eventName: event.eventName,
 
        })
      .then(function(docRef) {
          console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.log("There was an errror", error)
      });

      }

    render() {
        return (
            <div>
                <Card>
                <Card.Header as="h1"> New Events</Card.Header>

                {this.state.events.map((event) => (
                <Card.Body>
                    <Card.Title>{event.eventName}</Card.Title>
                    <Card.Subtitle>{event.location}</Card.Subtitle>
                    <h1></h1>
                        <Card.Text>
                        {event.message}
                        </Card.Text>
                    <Button variant="primary" onClick={() => this.requestEvent(event)}>Request Admisson</Button>
                </Card.Body>
                ))}

                </Card>
            </div>
        )
    }
}

export default Events;
