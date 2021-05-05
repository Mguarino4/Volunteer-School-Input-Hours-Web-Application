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
  Button
} from '@material-ui/core';
import Event from '@material-ui/icons/Event';
import Firebase, {auth, db} from '../Firebase/firebase'

class Advisors extends Component {

  constructor() {
    super();
    this.state = {
      totalEvents: 0

    };
  }

  componentDidMount(){ 
    const events = []
    var userID = Firebase.auth().currentUser.uid 
    
    db.collection("events").where("adminUID", "==", userID).get().then(snapshot => {
      snapshot.forEach(doc => {
        const data = doc.data().eventUID
        events.push(data)
        
      })
      this.setState({totalEvents: events.length})
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
                My Events
              </Typography>
              <Typography
                color="textPrimary"
                variant="h3"
              >
                {this.state.totalEvents}
              </Typography>
            </Grid>
            <Grid item>
              <Avatar className="">
                <Event/>
              </Avatar>
              
            </Grid>
 
          </Grid>
          <div onClick={passedFunction} {...otherProps}>
          <Button>View Events</Button>
          </div>
        </CardContent>
      </Card>
    );
  }
}
//hello see if this allows it to push 

export default Advisors;
