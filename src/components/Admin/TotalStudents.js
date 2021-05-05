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

class TotalStudents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalStudents: 0

    };
  }

  componentDidMount(){
    var advisees = []
    var userUID = Firebase.auth().currentUser.uid
    var docRef = db.collection("users").doc(userUID);

    docRef.get().then( snapshot => {

        this.setState({
          totalStudents: snapshot.data().advisees.length,

        })

    }).catch(
        console.log("Error getting document:")
    );
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
                My Students
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
          <Button>View Students</Button>
          </div>
        </CardContent>
      </Card>
    );
  };
}
export default TotalStudents;
