import React from 'react';
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
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Firebase, { db  } from '../Firebase/firebase'
import './style.css'
class LatestHours extends React.Component {
  constructor() {
    super();
    this.state = {
      student: []
    };
  }
  
  componentDidMount(){
    console.log("Mounted");
    var userID = Firebase.auth().currentUser.uid 
    
 db.collection("hourRequests").doc(userID).collection("hourRequests").get().then(snapshot => {
   const students = []
   console.log(snapshot)
   snapshot.forEach(doc => {

     const data = doc.data()
     data.id = doc.id
     console.log("Here is the needed data",doc.id)
     students.push(data)
   })
   this.setState({student: students})
 }).catch(error => console.log(error))
      
  }
  acceptHours(student){
    var array = this.state.student
    var docRef = db.collection("userHours").doc(student.uid).collection("userHours").doc(student.eventID);

    docRef.get().then(function(doc) {

      var hoursCompleted = parseInt(doc.data().hoursCompleted)


      let newHours = hoursCompleted + parseInt(student.hours)
      console.log(hoursCompleted)
      docRef.set({
        hoursCompleted: parseInt(newHours),

    },{merge:true})
    .then(function() {
        console.log("Document successfully written!");

    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });

    this.denyHours(student)

  }

  denyHours(student){
    var documentID = student.id
    var userID = Firebase.auth().currentUser.uid 
    var array = this.state.student
    db.collection("hourRequests").doc(userID).collection("hourRequests").doc(documentID).delete().then(function() {
      console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
  array = array.filter( obj => obj.id !== documentID);
  this.setState({student: array})

  }

  viewStudentProgress(student){
    console.log("VIEWING THE STUDENT's PROGRESS", student)
  }


  render(){
    return (
      <Card
      >
        <CardHeader title="Pending Student Hours" />
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
                    Date Submitted
                  </TableCell>
                  <TableCell>
                    Event
                  </TableCell>
                  <TableCell>
                    Message
                  </TableCell>
                  <TableCell>
                    Requested Hours
                  </TableCell>
                  <TableCell>
                    Activity Type
                  </TableCell>
                  <TableCell>
                  Program Learning Goals
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {this.state.student.map((student) => (
              <TableRow
                hover
                key={student.id}
              >
                <TableCell>
                  {student.email}
                </TableCell>

                <TableCell>
                  {moment(student.createdAt).format('DD/MM/YYYY')}
                </TableCell>
                <TableCell>
                  {student.eventName}
                </TableCell>
                <TableCell>
                  {student.message}
                </TableCell>
                <TableCell>
                  {student.hours}
                </TableCell>
                <TableCell>
                  {student.activityType}
                </TableCell>
                <TableCell>
                {/* {student.programLearningGoals.map((goals) => (
                  {goals}
                ))} */}
                {/* {student.programLearningGoals} */}
                <ul>
                {
                student.programLearningGoals.map(function(item, i){
                  console.log('test');
                  return(
                    <>
                  <li key={i}>{item}</li>
                  </>
                  )
                  
                })
              }
              </ul>
                  
                </TableCell>
                <TableCell>
                <div className="Admin">
                <Button type="submit"  onClick={() => this.acceptHours(student)}>Accept</Button>
                <h1></h1>
                <Button type="submit"  onClick={() => this.denyHours(student)}>Deny</Button>

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
    );
}
}
export default LatestHours;


