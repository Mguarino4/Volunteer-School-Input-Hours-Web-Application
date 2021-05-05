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
import './style.css'

class MyEvents extends Component {
    constructor() {
        super();
        this.state = {
          events: []
        };
      }

      componentDidMount(){
          var userUID = Firebase.auth().currentUser.uid
        db.collection("userHours").doc(userUID).collection("userHours").get().then(snapshot => {
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

      handleLangChange = (student) => {
        this.props.onSelectLanguage(student);            
    }

    render() {
        var { passedFunction, ...otherProps } = this.props;
        return (
            <div className="User">
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
              {this.state.events.map((student) => (
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
                <Button type="submit" onClick={() => this.handleLangChange(student)}>Submit Hours</Button>
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

export default MyEvents;
