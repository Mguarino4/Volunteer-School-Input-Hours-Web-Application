import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "./contexts/AuthContext"
import * as ROUTES from "./../constants/routes";
import Navigation from "../components/Navigation";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth()

  return (
    
    <Route
    
      {...rest}
      render={props => {
        
        return currentUser ? <Component {...props} /> : <Redirect to={ROUTES.SIGN_IN} />
      }}
    >
      
    </Route>
  )
}
