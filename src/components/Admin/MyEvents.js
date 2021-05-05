import React, { Component } from 'react'
import {Card, Form, Button, Alert} from 'react-bootstrap';
import Firebase, { db  } from '../Firebase/firebase'

class MyEvents extends Component {
    constructor() {
        super();
        this.state = {
          events: []
        };
      }

      componentDidMount(){
          var userUID = Firebase.auth().currentUser.uid
        db.collection("events").where("adminUID", "==", userUID).get().then(snapshot => {
            const events = []
            snapshot.forEach(doc => {
                console.log(doc.data().public)
                const data = doc.data()
                data.id = doc.id
                console.log("Here is the needed data",doc.id)
                events.push(data)
            })
            this.setState({events: events})
          }).catch(error => console.log(error))
               


      }

      deleteEvent(event) {
        var array = this.state.events
        var documentID = event.id
          console.log("DeletingArray  ::::", event)
        db.collection("events").doc(event.id).delete().then(function() {
          console.log("Document successfully deleted!");
      }).catch(function(error) {
          console.error("Error removing document: ", error);
      });
      array = array.filter( obj => obj.id !== documentID);
      this.setState({events: array})

      }

    render() {
        return (
            <div>
                <Card>
                <Card.Header as="h1">My Events</Card.Header>
                {this.state.events.map((event) => (
                <Card.Body>
                    <Card.Title>{event.eventName}</Card.Title>
                    <Card.Subtitle>{event.location}</Card.Subtitle>
                    <h1></h1>
                        <Card.Text>
                        {event.message}
                        </Card.Text>
                    <Button variant="primary" onClick={() => this.deleteEvent(event)}>Delete Event</Button>
                </Card.Body>
                ))}
                </Card>
            </div>
        )
    }
}

export default MyEvents;
