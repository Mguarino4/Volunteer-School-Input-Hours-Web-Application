import React from "react";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {Card, Form, Button, Alert} from 'react-bootstrap';
import Firebase, { db  } from '../Firebase/firebase'
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from '../Admin/Page';
import PendingEventsCard from './PendingEventsCard'
import PendingEvents from './PendingEvents'
import MyEventsCard from "./MyEventsCard";
import MyEvents from "./MyEvents";
import moment from 'moment'



class UserAccount extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    
    this.state = { 
      reviewTrans: false, 
      isLoggedOn: true, 
      currentView: "main", 
      buttonUID: "",
      date: "",
      description: "",
      eventName: "",
      eventID: "",
      email:"",
      adminUID: "",
      user: Firebase.auth().currentUser,
      hours: 0,
      student: null,
      language: "",
      activities:[
        "Attendance at Required Events",
        "Drew Honduras Project (DHP)",
        "Drew Student Voter Project (DSVP)",
        "Changebuilder Program",
        "Project Pericles Debating for Democracy Team",
        "UPitch Business Development Team",
        "Federal Community Work Study",
        "Community-Based Learning Project or Placement",
        "Community Service Placement (Center for Civic Engagement)",
        "Alternative Break Trip",
        "Lecture, Panel Discussion, Webinar, Screening, Performance",
        "Political Advocacy or Engagement",
        "Diversity, Inclusion/Anti-Racism Facilitated Dialouges and Workshops",
        "Interfaith Training and Workshops (Center for Religion, Culture, and Conflict)",
        "Participation in Student Government",
        "Others (add description below)",
      ],
      activityType:"Attendance at Required Events",
      programLearningGoals: [],
      experientialLearningHour: "Required"
  };

  }

  submitToFirebaseCheck = () => {
    var required = this.state.experientialLearningHour
    if( required == "Required") {
      this.submitToFirebase()
    } else{
      console.log("Not required")
      this.submitToMyPage()
    }
  }
  submitToMyPage = () =>{
    var hours = this.state.hours
    var docRef = db.collection("userHours").doc(this.state.user.uid).collection("userHours").doc(this.state.eventID);
    docRef.get().then(function(doc) {

        var hoursCompleted = parseInt(doc.data().hoursCompleted)
      
        let newHours = hoursCompleted + parseInt(hours)
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
    })
    this._setMainView()

  }

  submitToFirebase = () => {
    let docRef = this.state.adminUID
    console.log("HERE IS THE UID ADMIN",docRef )
    
    var documentID = (Math.random()*1e32).toString(36)
    db.collection("hourRequests").doc(docRef).collection("hourRequests").add({
      email: Firebase.auth().currentUser.email,
      date: this.state.date,
      uid: this.state.user.uid,
      hours: this.state.hours,
      message: this.state.description,
      eventName: this.state.eventName,
      eventID: this.state.eventID,
      activityType: this.state.activityType,
      experientialLearningHour: this.state.experientialLearningHour,
      programLearningGoals: this.state.programLearningGoals,
  })
  .then(function() {
      console.log("Document successfully written!");
  })
  .catch(function(error) {
    console.log("There was an errror", error)
  });
  this._setMainView()
  }

  _setMainView = () => {
    this.setState(
      {
        currentView: "main",
      },
    );
  };

  _setInputView = (uid) => {
    this.setState(
      {
        currentView: "input",
      },
    );
  };


  addEntry = (state, props, entry) => {
    return { ...state, currentView: "main", formEntries: [...state.formEntries, entry] };
  };

  _returnWithEntries = (entries) => {
    this.setState(this.addEntry(this.state, this.props, entries));
  };


  handleClick(event) {
    this._setInputView()

    console.log("HERE IS THE STUDENT  ",event);
    this.setState({
      student: event})

  }

  eventClicked = (event) => {
    console.log(event,"events clicked")
    this.setState(
      {
        currentView: "main",
      },
    );
  };

  handleLanguage = (student) => {
    console.log(student)
    this.setState({
      eventName: student.eventName,
      eventID: student.eventID,
      adminUID: student.adminUID,
    });
    this._setInputView()
}

  pendingClicked = () => {
    console.log("pending clicked")
    this.setState(
      {
        currentView: "pending",
      },
    );
  };

  handleActivityChange = (event) => {
    this.setState({
      activityType: event.target.value
    })
  }

  handleExperientialLearningHour = (event) => {
    console.log(event.target.value)
    this.setState({
      experientialLearningHour: event.target.value
    })
  }

  removeDuplicates(data){
    let unique = []
    data.forEach(element => {
      if (!unique.includes(element)){
        unique.push(element)
      }
    })
    return unique
  }
  
  handleProgramLearningGoals = (event) => {
    if (event.target.checked){
      //append to array
      this.setState({
        programLearningGoals: this.state.programLearningGoals.concat([event.target.value])
      })
      
    } else {
      //remove from array
      this.setState({
        programLearningGoals : this.state.programLearningGoals.filter(function(val) {return val!==event.target.value})
      })
   }
  }
  
  renderStage = () => {
    /**
     * HTML for "main" stage.
     */
    if (this.state.currentView === "main") {
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
              <MyEventsCard onClick={this.eventClicked}/>
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <PendingEventsCard onClick={this.pendingClicked}/>
            </Grid>
            <Grid
              item
              lg={12}
              md={12}
              xl={12}
              xs={12}
            >
              <MyEvents onSelectLanguage={this.handleLanguage}/>
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
      /**
       * Html for "input" stage.
       */
    } else if (this.state.currentView === "input") {
      return (
        <div className="SubmitEvent"> 
        <Card.Body>
        <h2>Submit Hours</h2> 
          {this.error && <Alert variant="danger">{this.error}</Alert>}
            <Form.Group id = "eventName">
              <Form.Label>Event Name</Form.Label>
              <Form.Control onChange = {(event) => this.setState({eventName: event.target.value })} 
              placeholder={this.state.eventName}
              disabled={true}/>
            </Form.Group>
  
            <Form.Group id="description">
              <Form.Label>Brief Description</Form.Label>
              <Form.Control as="textarea" rows={5} onChange = {(event) => this.setState({description: event.target.value })}/>
            </Form.Group>

            <Form.Group id="hours">
              <Form.Label>Hours</Form.Label>
              <Form.Control onChange = {(event) => this.setState({hours: event.target.value })} type="number"/>
            </Form.Group>
  
            <Form.Group id = "date">
              <Form.Label>Date</Form.Label>
              <Form.Control onChange = {(event) => this.setState({date: event.target.value })} type="date" />
            </Form.Group>
            <Form.Group id = "actionYears">
              <div class="form-group">
                <label for="sel1">Description of Activity</label>
                <select class="form-control" id="sel1" onChange={this.handleActivityChange}>
                {this.state.activities.map((student) => (
                  <option >{student}</option>
                ))}
                </select>
              </div>
            </Form.Group>
            <Form.Group id = "">
              <Form.Label>Type of experiential learning hours:</Form.Label>
              <div class="radios">
                <label><input type="radio" name="optradio" value="Required" onClick={this.handleExperientialLearningHour}/>Required</label>
                <label><input type="radio" name="optradio" value="ActiveRequiring" onClick={this.handleExperientialLearningHour}/>Active (not requiring preapproval) </label>
                <label><input type="radio" name="optradio" value="Active" onClick={this.handleExperientialLearningHour}/>Active (preapproved)</label>
                <label><input type="radio" name="optradio" value="Receptive" onClick={this.handleExperientialLearningHour}/>Receptive</label>
              </div>
                    
                  </Form.Group>
            <Form.Group id = "">
            <Form.Label>
              Which program learning goals does this activity helpfufill? Check all that apply.
            </Form.Label>
            <div class="checkbox">
              <label><input type="checkbox" id="0" onClick={(e)=>this.handleProgramLearningGoals(e)} 
              value="Gain confidence and skills to identify, define and 
              tackle complex problems that impact communities and transcend borders"/>
               Gain confidence and skills to identify, define and 
              tackle complex problems that impact communities and transcend borders
              </label>
            </div>
            <div class="checkbox">
              <label><input type="checkbox" id="1" onClick={(e)=>this.handleProgramLearningGoals(e)} 
              value="Value empathy, understanding and responsiveness to diverse others 
              in their work and public roles"/>
               Value empathy, understanding and responsiveness to diverse others 
              in their work and public roles

              </label>
            </div>
            <div class="checkbox">
              <label><input type="checkbox" id="2" onClick={(e)=>this.handleProgramLearningGoals(e)} 
              value="Explore and take action on solutions to real-world problems that fulfill the 
              goals of social impact, financial viability, and environmental sustainability." />
               Explore and take action on solutions to real-world problems that fulfill the 
              goals of social impact, financial viability, and environmental sustainability.
              </label>
            </div>

            </Form.Group>
            <h2></h2>
            <Button className="w-100" type="submit" onClick={this.submitToFirebaseCheck}>Submit</Button>
            <Button className="w-100" type="submit" onClick={this._setMainView}>Exit</Button>
  
            <h2></h2>
   
        </Card.Body>
        </div>
      );
    } else if (this.state.currentView === "pending") {
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
              <MyEventsCard onClick={this.eventClicked}/>
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <PendingEventsCard onClick={this.pendingClicked}/>
            </Grid>
            <Grid
              item
              lg={12}
              md={12}
              xl={12}
              xs={12}
            >
              <PendingEvents/>
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
      /**
       * Html for "input" stage.
       */

    }
  };

  render () {
    const stage = this.renderStage();
    return (
      <div>
          {stage}
      </div>
    );
  }
}

export default UserAccount;
