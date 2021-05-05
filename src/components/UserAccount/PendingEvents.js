import React, { Component } from 'react'
import Firebase, { db  } from '../Firebase/firebase'
import {
    Box,
    Button,
    Card,
    CardHeader,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
  } from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';

  
class PendingEvents extends Component {
    constructor() {
        super();
        this.state = {
          events: []
        };
      }

      componentDidMount(){
        var userUID = Firebase.auth().currentUser.uid
        db.collection("pendingEventInvitations").doc(userUID).collection("pendingEventInvitations").get().then(snapshot => {
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
      acceptEvent = (student) => {
        var userUID = Firebase.auth().currentUser.uid
        const usersRef = db.collection("userHours").doc(userUID).collection("userHours").doc(student.eventID)
        usersRef.get().then((docSnapshot) => {
          if (docSnapshot.exists) {
            usersRef.onSnapshot((doc) => {
              // do stuff with the data
            });
          } else {
            usersRef.set({
              adminUID: student.adminUID,
              email: student.email,
              eventID: student.eventID,
              eventName: student.eventName,
              hoursCompleted: 0,
              totalHours: student.totalHours
            })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
          }
        })
        this.denyEvent(student)
      }

      denyEvent = (student) => {
        var documentID = student.eventID
        var userID = Firebase.auth().currentUser.uid 
        var array = this.state.events
        db.collection("pendingEventInvitations").doc(userID).collection("pendingEventInvitations").doc(documentID).delete().then(function() {
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
            <Card
            >
              <CardHeader title="Event Requests" />
              <Divider />
              <PerfectScrollbar>
                <Box minWidth={800}>
                  <Table>
                    <TableHead>
                      <TableRow>
                      <TableCell>
                          Advisor
                        </TableCell>
                        <TableCell>
                          Event
                        </TableCell>
                        <TableCell>
                          Event Hours
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.events.map((student) => (
                    <TableRow
                      hover
                      key={student.id}
                    >
                      <TableCell>
                        {student.email}
                      </TableCell>
      
                      <TableCell>
                        {student.eventName}
                      </TableCell>
                      <TableCell>
                        {student.totalHours}
                      </TableCell>
                      <TableCell>
                      <div className="Admin">
                      <Button type="submit"  onClick={() => this.acceptEvent(student)}>Accept</Button>
                      <Button type="submit"  onClick={() => this.denyEvent(student)}>Deny</Button>
                      </div>
                      </TableCell>
      
                    </TableRow>
                    
                    ))}
                    </TableBody>
                  </Table>
                </Box>
              </PerfectScrollbar>
              <Box
                display="flex"
                justifyContent="flex-end"
                p={2}
              >
              </Box>
            </Card>
            </div>
        )

    }
}

export default PendingEvents;
