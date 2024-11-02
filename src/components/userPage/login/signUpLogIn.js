//page for logging/signup

import { isAction } from "redux";
import styles from './signUpLogIn.module.css'
import { useState, useEffect } from "react";
import { signUpUser, loginUser } from "./relevantAPIFunctions";
import { Navigate, useNavigate } from "react-router-dom";



//simple logic for form
//local state for email and password
//then create object with those properties
//and send object as data for API POST request - see ChatGPT example

//have a toggle button for login or signup. 
//toggle sets option localState to 'login' or 'sign-up'
//if option === 'login', then API is LogUserIn API function
//if option === 'signup', then API is signUserUp API function
//have a global isLoggedIn state
function SignUpLogIn({user, setUser}) {

const [ logIn, setLogIn ] = useState(true);
const [ signUp, setSignUp ] = useState(false);
const [ email, setEmail ] = useState('');
const [ password, setPassword ] = useState('');
const [ message, setMessage ] = useState('');
const navigate = useNavigate();
let token;

useEffect(() => {
    console.log("current state of login and signup are: ", logIn, signUp);
    console.log("user currently is: ", user);
}, [logIn, signUp])

function handleToggleSignUp(signUp) {
    if (logIn) {
        setSignUp(true);
        setLogIn(false);
        setMessage('');
    }
}
function handleToggleLogIn() {
    if (signUp) {
        setLogIn(true);
        setSignUp(false);
        setMessage('');
    }

}

const handleLogIn = async () => {
    const user = await loginUser(email, password);
    if (user) {
      setMessage(`Welcome back, ${user.user.username}!`);
      setUser({ token: user.jwt, user: user.user });
      navigate(`/userPage/${user.id}`);
    } else {
      setMessage('Login failed. Please check your credentials.');
    }
  };

  const handleSignUp = async () => {
    const user = await signUpUser(email, password);
    if (user) {
      setMessage(`Welcome, ${user.user.username}!`);
      //token = localStorage.getItem('jwt');
      //console.log("token is: ", token);
      //setUser({ token: token, user: user});
      setUser({ token: user.jwt, user: user.user });
      navigate(`/userPage/${user.id}`);
    } else {
      setMessage('Sign up failed. Please try again.');
    }
  };
//don't need to duplicate the input body for each toggle, just change which API is sent
//do need to check all this code
//every time signup or loginButton is clicked, should wipe email and password states? or not?

function handleLogInOrSignUpSubmission() {
    if (signUp && email && password) {
        //send fetch API request to sign-up
        handleSignUp();
    } else if (logIn && email && password) {
        //send fetch API request to log-in
        handleLogIn();
    }
}


    return (
        <div className={styles.authForm}>
          <div className={styles.authButtons}>
            <button className={ signUp ? styles.authButtonActive : styles.authButton } onClick={handleToggleSignUp}>Sign-Up</button>
            <button className={ logIn ? styles.authButtonActive : styles.authButton } onClick={handleToggleLogIn}>Log-In</button>
          </div>
          <div className={styles.inputField}>
            <input type="text" placeholder="enter your @cam or @cantab email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className={styles.inputField}>
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button className={styles.signInButton} onClick={handleLogInOrSignUpSubmission}>{ signUp ? "sign-up to buy/sell formal tickets" : "log-in"}</button>
          { message && (
            <p>{message}</p>
          )}
        </div>
    )
}

export default SignUpLogIn;