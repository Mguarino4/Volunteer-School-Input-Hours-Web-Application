import React from "react";
import Signup from "../SignUp/"
import Login from "../SignIn/"
import { AuthProvider } from "../contexts/AuthContext";
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import * as ROUTES from "../../constants/routes";
import SignoutPage from '../Admin/Dashboard';
import Navigation from "../Navigation";
import PrivateRoute from "../PrivateRoute";
import UserAccount from "../UserAccount";
import AdminSettings from "../AdminSettings"
import UserSettings from "../UserSettings"
import Events from "../Events"
import AdminPage from '../Admin';

import SubmitEvent from "../SubmitEvent";
import PageNotFound from './NotFoundPage'


function App() {
  return (
        <Router>
        <div>
      <Navigation />
      <AuthProvider>
            <Switch>

              <PrivateRoute exact path="/admin" component={AdminPage} />
              <PrivateRoute exact path={ROUTES.USER_ACCOUNT} component={UserAccount}/>
              {/* <PrivateRoute exact path={ROUTES.ADVISOR} component={AdvisorPage} /> */}
              <PrivateRoute path={ROUTES.USERSETTINGS} component={UserSettings} />
              <PrivateRoute path={ROUTES.ADMINSETTINGS} component={AdminSettings} />
              <PrivateRoute path={ROUTES.USER_HOME} component={Events} />
              <PrivateRoute exact path={ROUTES.SIGNOUT} component={SignoutPage} />
              
              <div className="w-100" style={{ maxWidth: "400px" }}>
              <Route path={ROUTES.SIGN_UP} component={Signup} />
              <Route path={ROUTES.SIGN_IN} component={Login} />
              <PrivateRoute path="/submitEvent" component={SubmitEvent} />
              
              </div>
              <Route path={ROUTES.NOTFOUND} component={PageNotFound} />
            </Switch>
          </AuthProvider>


      </div>
      

        </Router>
  )
}

 export default App

