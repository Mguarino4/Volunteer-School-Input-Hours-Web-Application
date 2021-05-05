import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import logo from './alms.png';
import SignoutPage from '../Admin/Dashboard';
import * as ROUTES from '../../constants/routes';
import Firebase, {auth, db} from '../Firebase/firebase'

class Navigation extends Component  {
  
  constructor() {
    super();

    this.state = {
      Home: "",
      SecondButton: "",
      ThirdButton: "",
      FourthButton: "",
      homeRoute: "",
      secondRoute:"",
      thirdRoute:"",
      fourthRoute: "",
      user: Firebase.firestore().currentUser ?? null

    }
  }
  
  componentDidMount(){
    Firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
          console.log('This is the user: ', user.uid)
          db.collection("users").doc(user.uid)
            .onSnapshot(function(doc) {
              var admin = doc.data().admin;
              console.log(admin);
              if(admin == false) {

                this.setState({
                  Home: "Home",
                  SecondButton: "Submit Hours",
                  ThirdButton: "Settings",
                  FourthButton: "Sign Out",
                  homeRoute: ROUTES.USER_HOME,
                  secondRoute: ROUTES.USER_ACCOUNT,
                  thirdRoute: ROUTES.USERSETTINGS,
                  fourthRoute: ROUTES.SIGNOUT,
                  user: user
                })

              } else {
                this.setState({
                  Home: "Home",
                  SecondButton: "Submit Event",
                  ThirdButton: "Settings",
                  FourthButton: "Sign Out",
                  homeRoute: ROUTES.ADMIN_HOME,
                  secondRoute: ROUTES.ADMIN_SUBMIT_EVENT,
                  thirdRoute: ROUTES.ADMINSETTINGS,
                  fourthRoute: ROUTES.SIGNOUT,
                  user: user

                })

                
              }


          }.bind(this));

          
      } else {
          // No user is signed in.
          console.log('There is no logged in user');
      }
  }.bind(this));
  }
  
  render(){
    if (this.state.user !== null) {
      return (
        <div className="navBar">
        <ul>
        <img src={logo} class="logo-image"></img>
          <li>
            <Link to={this.state.fourthRoute}>{this.state.FourthButton}</Link>
          </li>
          <li>
            <Link to={this.state.thirdRoute}>{this.state.ThirdButton}</Link>
          </li>
          <li>
            <Link to={this.state.secondRoute}>{this.state.SecondButton}</Link>
          </li>
          <li>
            <Link to={this.state.homeRoute}>{this.state.Home}</Link>
          </li>
        </ul>
      </div>
      );
   } else {
      return (
        <>
        </>
      );
   }

  }
}

 
export default Navigation;