import React, {Component} from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from './Page';
import Advisors from './Advisors';
import LatestHours from './LatestHours';
import TotalStudents from './TotalStudents';
import StudentsPending from './StudentsPending';
import MyEvents from './MyEvents'
import MyStudents from './MyStudents'
import EventRequests from './EventRequests'
import EventRequestCard from './EventRequestCard'



class Admin extends Component {
  constructor() {
    super();
    this.state = {
      currentView: "event"
    }
  }

  eventClicked = () => {
    this.setState(
      {
        currentView: "event",
      },
    );
  }

  studentsClicked = () => {
    this.setState(
      {
        currentView: "student",
      },
    );
  }

  requestsClicked = () => {
    this.setState(
      {
        currentView: "requests",
      },
    );
  }

  _setMainView = () => {
    this.setState(
      {
        currentView: "main",
      },
    );
  };

  progressClicked = () => {
    this.setState(
      {
        currentView: "progress",
      },
    );
  };


  addEntry = (state, props, entry) => {
    return { ...state, currentView: "event", formEntries: [...state.formEntries, entry] };
  };

  _returnWithEntries = (entries) => {
    this.setState(this.addEntry(this.state, this.props, entries));
  };


  renderStage = () => {

    if(this.state.currentView === "event") {
        return (
          <Page
          title="Dashboard"
        >
         <h1></h1>
          <Container maxWidth={false}>
            <Grid
              container
              spacing={1}
            >
              <Grid
                item
                lg={3}
                sm={6}
                xl={3}
                xs={12}
              >
                <Advisors onClick={this.eventClicked}/>
              </Grid>
              <Grid
                item
                lg={3}
                sm={6}
                xl={3}
                xs={12}
              >
                <StudentsPending onClick={this.requestsClicked}  />
              </Grid>
              <Grid
                item
                lg={3}
                sm={6}
                xl={3}
                xs={12}
              >
                <EventRequestCard onClick={this.progressClicked}/>
              </Grid>
              <Grid
                item
                lg={3}
                sm={6}
                xl={3}
                xs={12}
              >
                <TotalStudents onClick={this.studentsClicked} />
              </Grid>
              <Grid
                item
                lg={12}
                md={12}
                xl={12}
                xs={12}
              >
                <MyEvents/>
              </Grid>
              <Grid
                item
                lg={12}
                md={12}
                xl={12}
                xs={12}
              >
              </Grid>
            </Grid>
          </Container>
        </Page>
        );
    } else if(this.state.currentView === "requests") {
      return(
        <Page
        title="Dashboard"
      >
       <h1></h1>
        <Container maxWidth={false}>
          <Grid
            container
            spacing={1}
          >
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <Advisors onClick={this.eventClicked}/>
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <StudentsPending onClick={this.requestsClicked}  />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <EventRequestCard onClick={this.progressClicked}/>
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <TotalStudents onClick={this.studentsClicked} />
            </Grid>
            <Grid
              item
              lg={12}
              md={12}
              xl={12}
              xs={12}
            >
              <LatestHours/>
            </Grid>
            <Grid
              item
              lg={12}
              md={12}
              xl={12}
              xs={12}
            >
            </Grid>
          </Grid>
        </Container>
      </Page>
      )
    } else if(this.state.currentView === "progress") {
      return(
        <Page
        title="Dashboard"
      >
       <h1></h1>
        <Container maxWidth={false}>
          <Grid
            container
            spacing={1}
          >
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <Advisors onClick={this.eventClicked}/>
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <StudentsPending onClick={this.requestsClicked}  />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <EventRequestCard onClick={this.progressClicked}/>
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <TotalStudents onClick={this.studentsClicked} />
            </Grid>
            <Grid
              item
              lg={12}
              md={12}
              xl={12}
              xs={12}
            >
              <EventRequests/>
            </Grid>
            <Grid
              item
              lg={12}
              md={12}
              xl={12}
              xs={12}
            >
            </Grid>
          </Grid>
        </Container>
      </Page>
      )
    } else if(this.state.currentView === "student") {
      return(
        <Page
        title="Dashboard"
      >
       <h1></h1>
        <Container maxWidth={false}>
          <Grid
            container
            spacing={1}
          >
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <Advisors onClick={this.eventClicked}/>
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <StudentsPending onClick={this.requestsClicked}  />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <EventRequestCard onClick={this.progressClicked}/>
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <TotalStudents onClick={this.studentsClicked} />
            </Grid>
            <Grid
              item
              lg={12}
              md={12}
              xl={12}
              xs={12}
            >
              <MyStudents/>
            </Grid>
            <Grid
              item
              lg={12}
              md={12}
              xl={12}
              xs={12}
            >
            </Grid>
          </Grid>
        </Container>
      </Page>
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
};

export default Admin;
