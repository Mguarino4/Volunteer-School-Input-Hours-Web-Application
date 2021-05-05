import React, {Component} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles,
  Button,
} from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import Firebase, {auth, db} from '../Firebase/firebase'

class EventRequestCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalStudents: 0

    };
  }

  componentDidMount(){ 
    const events = []
    var userID = Firebase.auth().currentUser.uid 
    
    db.collection("eventRequests").doc(userID).collection("eventRequests").get().then(snapshot => {
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
                Event Requests
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
                <PeopleIcon />
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
export default EventRequestCard;
