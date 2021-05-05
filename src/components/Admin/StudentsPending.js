import React,{Component} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  colors,
  Button
} from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Firebase, {auth, db} from '../Firebase/firebase'

class StudentsPending extends Component {

  constructor() {
    super();
    this.state = {
      totalStudents: 0

    };
  }

  componentDidMount(){ 
    const events = []
    var userID = Firebase.auth().currentUser.uid 
    
    db.collection("hourRequests").doc(userID).collection("hourRequests").get().then(snapshot => {
      snapshot.forEach(doc => {
        const data = doc.data().eventID
        events.push(data)
        
      })
      this.setState({totalStudents: events.length})
      console.log( events.length)
    }).catch(error => console.log(error))

  }
  
  render(){
    var { passedFunction, ...otherProps } = this.props;

  return (
      <Card
      >
        <CardContent>
          <Grid
            container
            justify="space-between"
            spacing={3}
          >
            <Grid item>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="h6"
              >
                Student Pending Hours
              </Typography>
              <Typography
                color="textPrimary"
                variant="h3"
              >
                {this.state.totalStudents}
              </Typography>
            </Grid>
            <Grid item>
              <Avatar className="">
              </Avatar>
            </Grid>
          </Grid>
          <div onClick={passedFunction} {...otherProps}>
          <Button>View Requests</Button>
          </div>
        </CardContent>
        
      </Card>
    );
  };
}

export default StudentsPending;
