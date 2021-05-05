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
class MyStudents extends Component {
    constructor() {
        super();
        this.state = {
          students: [],
          email: "",
          major: "",
          gradYear: "",
          actionYear: "",
          currentView: "home",
          uid: "",
          studentsProgress: [],
          currentStudentName: ""
        };
      }

      componentDidMount(){
        var docRef = db.collection("users").doc(Firebase.auth().currentUser.uid);
        docRef.get().then( snapshot => {
          const userRef = snapshot.data().advisees;
          console.log(userRef)
          var i;
          if( userRef.length == 0) {return}
          for(i = 0; i < userRef.length; i++) { 
            db.collection("users").doc(userRef[i]).get().then (snapshot => {
                
              const person = { 
                email: snapshot.data().email,
                major: snapshot.data().adminUID,
                gradYear: snapshot.data().gradYear,
                actionYear: snapshot.data().actionYear,
                major: snapshot.data().major,
                uid: snapshot.data().uid

              };
              this.setState(data => ({
                students: [...data.students, person]
            }))
    
            })
          }
      }).catch(
          console.log("Error getting document:")
      );
    
      }

      setHomeState = () => {
        this.setState({
          currentView: "home"
        })


      }

      addEntry = (state, props, entry) => {
        return { ...state, currentView: "event", formEntries: [...state.formEntries, entry] };
      };

      _returnWithEntries = (entries) => {
        this.setState(this.addEntry(this.state, this.props, entries));
      };

      fetchStudentProgress(student){
        var adminUID = Firebase.auth().currentUser.uid
        db.collection("userHours").doc(student.uid).collection("userHours").where("adminUID", "==",adminUID).get().then(snapshot => {
            const events = []
            
            snapshot.forEach(doc => {
                console.log(doc.data().public)
                const data = doc.data()
                data.id = doc.id
                console.log("Here is the needed data",doc.id)
                events.push(data)
            })
            this.setState({
              studentsProgress: events,
              currentView: "student",
              currentStudentName: student.email 
            })
          }).catch(error => console.log(error))
      }


    renderStage = () => {

      if(this.state.currentView === "home") {
        return (
            <Card
            >
              <CardHeader title="My Students" />
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
                          Major
                        </TableCell>
                        <TableCell>
                          Graduation Year
                        </TableCell>
                        <TableCell>
                          Action Scholar Year
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
                        {student.major}
                      </TableCell>
                      <TableCell>
                        {student.gradYear}
                      </TableCell>
                      <TableCell>
                        {student.actionYear}
                      </TableCell>
                      <TableCell>
                      <div className="Admin">
                      <Button type="submit"  onClick={() => this.fetchStudentProgress(student)}>View Progress</Button>
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
      } else if (this.state.currentView === "student"){
        return(
          <Card
          >
            <CardHeader title={"Current Student: " + this.state.currentStudentName} />
            <Divider />
            <PerfectScrollbar>
              <Box minWidth={800}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        Event
                      </TableCell>
                      <TableCell>
                        Hours Completed
                      </TableCell>
                      <TableCell>
                        Total Hours
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {this.state.studentsProgress.map((student) => (
                  <TableRow
                    hover
                    key={student.id}
                  >
                    <TableCell>
                      {student.eventName}
                    </TableCell>
                    <TableCell>
                      {student.hoursCompleted}
                    </TableCell>
                    <TableCell>
                      {student.totalHours}
                    </TableCell>
                    <TableCell>
                    <div className="Admin">
                    <Button type="submit"  onClick={this.setHomeState}>Return</Button>
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

  render () {
    const stage = this.renderStage();
    return (
      <>
      {stage}
      </>
    );
  }
  
}

export default MyStudents;