import React, { Component } from 'react'
import Firebase, { db  } from '../Firebase/firebase'
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';

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

class EventRequests extends Component {
    constructor() {
        super();
        this.state = {
          students: [],
          date: "",
          description: "",
          data: [],
          eventName: "",
          email:"",
          adminUID: "",
          user: Firebase.auth().currentUser,
          hours: 0,
          student: null,
        };
      }

      componentDidMount(){
        console.log("Mounted");
        var userID = Firebase.auth().currentUser.uid 
        
     db.collection("eventRequests").doc(userID).collection("eventRequests").get().then(snapshot => {
       const students = []
       console.log(snapshot)
       snapshot.forEach(doc => {
    
         const data = doc.data()
         data.id = doc.id
         console.log("Here is the needed data",doc.id)
         students.push(data)
       })
       this.setState({students: students})
     }).catch(error => console.log(error))
          
      }

      acceptStudent = (student) => {
        const usersRef = db.collection("userHours").doc(student.uid).collection("userHours").doc(student.eventID)
        usersRef.get().then((docSnapshot) => {
          if (docSnapshot.exists) {
            usersRef.onSnapshot((doc) => {
              // do stuff with the data
            });
          } else {
            usersRef.set({
              adminUID: Firebase.auth().currentUser.uid,
              email: student.email,
              eventID: student.eventID,
              eventName: student.eventName,
              hoursCompleted: 0,
              totalHours: 0,
            })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
          }
      });



      this.addUserToMyStudents(student)
        this.denyStudent(student)

      }
      addUserToMyStudents(student){
        var docRef = db.collection("users").doc(this.state.user.uid);
        docRef.get().then( snapshot => {
          var myAdvisees = snapshot.data().advisees

          if(myAdvisees.includes(student.uid) == false) {
            console.log("This user is not in my list, lets add him")
            myAdvisees.push(student.uid)
            docRef.set({
              advisees: myAdvisees,
          },{merge: true})
          .then(function() {
              console.log("Document successfully written!");
          })
          .catch(function(error) {
              console.error("Error writing document: ", error);
          });
          } else {
            console.log("This user is in my list, lets not add him")

          }
    
      }).catch(
          console.log("Error getting document:")
      );


      }

      denyStudent = (student) => {
        var documentID = student.id
        var userID = Firebase.auth().currentUser.uid 
        var array = this.state.students
        db.collection("eventRequests").doc(userID).collection("eventRequests").doc(documentID).delete().then(function() {
          console.log("Document successfully deleted!");
      }).catch(function(error) {
          console.error("Error removing document: ", error);
      });
      array = array.filter( obj => obj.id !== documentID);
      this.setState({students: array})

      }

    render() {
        return (
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
                          Student
                        </TableCell>
                        <TableCell>
                          Event
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.students.map((student) => (
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
                      <div className="Admin">
                      <Button type="submit"  onClick={() => this.acceptStudent(student)}>Accept</Button>
                      <Button type="submit"  onClick={() => this.denyStudent(student)}>Deny</Button>
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
        )
    }
}

export default EventRequests;