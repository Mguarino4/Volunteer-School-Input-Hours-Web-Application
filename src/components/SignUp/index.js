import React, { useRef, useState } from 'react';
import {Card, Form, Button, Alert} from 'react-bootstrap';
import {useAuth} from "../contexts/AuthContext"
import { Link, useHistory } from 'react-router-dom';
import * as ROUTES from "../../constants/routes";
import GoogleButton from 'react-google-button'
import firebase from 'firebase';
import Firebase, {auth, db} from '../Firebase/firebase'
import './SignUp.css'

export default function SignUp() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const  {signup}  = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory(0)

  async function handleSubmit(e){
    e.preventDefault()

    if(passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords Do Not Match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      uploadUserData()
    }
    catch {
      setError("Failed to create Account")
    }

    setLoading(false)
  }

  async function handleGoogleSubmit(e){
    try {
      const googleAuth =  
      new firebase.auth.GoogleAuthProvider(); 
           
  // using the object we will authenticate the user. 
  await firebase.auth().signInWithPopup(googleAuth);
  uploadUserData()
    } catch {
      setError("Failed to log in")
    }
    setLoading(false)
  }

  function uploadUserData(){
    firebase.auth().onAuthStateChanged(function(user) {
    var docRef = db.collection("users").doc(user.uid);
    docRef.get().then(function(doc) {
      if (doc.exists) {
          console.log("Document data:", doc.data());
          if(doc.data().admin == true){
            history.push("/admin")
          } else {
            history.push("/user")
          }
      } else {
          // doc.data() will be undefined in this case
          db.collection("users").doc(user.uid).set({
            email: user.email,
            admin: false,
            uid: user.uid
        })
        .then(function() {
            console.log("Document successfully written!");
            history.push("/user")
        })
        .catch(function(error) {
          setError(error)
        });
      }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      })

    })
  }
  return (
    <>
    <div className="Signup">

      <Card.Body>
        <h2 className="text-center mb-4">Sign Up</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group id = "email">
            <Form.Label>Email</Form.Label>
            <Form.Control type = "email" ref={emailRef} required />
          </Form.Group>
          <Form.Group id = "password">
            <Form.Label>Password</Form.Label>
            <Form.Control type = "password" ref={passwordRef} required />
          </Form.Group>
          <Form.Group id = "password-confirm">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type = "password" ref={passwordConfirmRef} required />
          </Form.Group>
          <Button disabled={loading} className="w-100" type="submit">Sign Up</Button>
          <h2></h2>
          <GoogleButton className="w-100"
            onClick={() => {handleGoogleSubmit()
            }}
          />
        </Form>
        

      </Card.Body>

    <div className="w-100 text-center mt-2">
      Already have an account? <Link to="/signin"> Sign In</Link>
      </div>
      </div>
</>
  )
}

