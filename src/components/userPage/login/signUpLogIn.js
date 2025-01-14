//page for logging/signup

//import { isAction } from "redux";
//import styles from './signUpLogIn.module.css'
import { useState, useEffect } from "react";
import { signUpUser, loginUser } from "./relevantAPIFunctions";
import { /*Navigate,*/ useNavigate } from "react-router-dom";
import styles from './GlassAuth.module.css';



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
const [activeTab, setActiveTab] = useState('login');
/*const [accountLinkCreatePending, setAccountLinkCreatePending] = useState(false);
  const [error, setError] = useState(false);
  const [connectedAccountId, setConnectedAccountId] = useState();
const [accountCreatePending, setAccountCreatePending] = useState(false);*/
const navigate = useNavigate();
let token;
console.log("token", token);

useEffect(() => {
    console.log("current state of login and signup are: ", logIn, signUp);
    console.log("user currently is: ", user);
}, [logIn, signUp, user])

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
console.log(handleToggleLogIn, handleToggleSignUp);

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
      // - Here i need, i think, to add a function containing the stripe code to re-direct the
      //not sure whether I'll still need the navigate push below
      //const response = await createStripeAccount()
      //const nextResponse = await addInfoForStripe(connectedAccountId);
      navigate(`/userPage/${user.id}`);
    } else {
      setMessage('Sign up failed. Please try again.');
    }
  };

//stripe code to direct user to setup stripe account
  /*async function createStripeAccount() {
  setAccountCreatePending(true);
  console.log(accountCreatePending);
  console.log("setAccountCreatePending is:", setAccountCreatePending);
              setError(false);
              console.log("error", error);
              fetch('http://localhost:5001/account', {
                method: "POST",
              })
                .then((response) => response.json())
                .then((json) => {
                  setAccountCreatePending(false);

                  const { account, error } = json;

                  if (account) {
                    setConnectedAccountId(account);
                    console.log("connectedAccountId", connectedAccountId);
                    return account;
                  }

                  if (error) {
                    setError(true);
                    return error;
                  }
                });
}
async function addInfoForStripe (connectedAccountId) {
  setAccountLinkCreatePending(true);
  console.log("accountlinkcretepending:", accountLinkCreatePending)
  setError(false);
  fetch("http://localhost:5001/account_link", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      account: connectedAccountId,
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      setAccountLinkCreatePending(false);

      const { url, error } = json;
      if (url) {
        window.location.href = url;
      }

      if (error) {
        setError(true);
      }
    });
}*/





//don't need to duplicate the input body for each toggle, just change which API is sent
//do need to check all this code
//every time signup or loginButton is clicked, should wipe email and password states? or not?

function handleLogInOrSignUpSubmission() {

    /*if (signUp && email && password) {
        //send fetch API request to sign-up
        handleSignUp();
    } else if (logIn && email && password) {
        //send fetch API request to log-in
        handleLogIn();
    }*/

    if (email && password) {
      if ( activeTab === 'login') {
        handleLogIn();
      } else if ( activeTab === 'signup') {
        handleSignUp();
      }
    }
  }


   /* return (
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
    )*/

        const isValidEmail = (email) => {
          return email.endsWith('@cam.ac.uk') || email.endsWith('@cantab.ac.uk');
        };
      
        const isValidPassword = (password) => {
          return password.length >= 6;
        };
      
        const isFormValid = isValidEmail(email) && isValidPassword(password);
      
        return (
          <div className={styles.container}>
            <div className={styles.header}>
              <h2 className={styles.title}>Welcome to Formalbridge</h2>
              <p className={styles.description}>
                Buy and sell formal tickets with your university email
              </p>
            </div>
            <div className={styles.content}>
              <div className={styles.tabs}>
                <button
                  className={activeTab === 'signup' ? styles.tabButtonActive : styles.tabButton}
                  onClick={() => setActiveTab('signup')}
                >
                  Sign Up
                </button>
                <button
                  className={activeTab === 'login' ? styles.tabButtonActive : styles.tabButton}
                  onClick={() => setActiveTab('login')}
                >
                  Log In
                </button>
              </div>
      
              {activeTab === 'signup' && (
                <div>
                  <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="email-signup">
                      University Email
                    </label>
                    <input
                      id="email-signup"
                      type="email"
                      placeholder="your.name@cam.ac.uk"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={!email || isValidEmail(email) ? styles.input : styles.inputError}
                    />
                    {email && !isValidEmail(email) && (
                      <p className={styles.errorText}>
                        Please use your @cam or @cantab email address
                      </p>
                    )}
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="password-signup">
                      Password
                    </label>
                    <input
                      id="password-signup"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={!password || isValidPassword(password) ? styles.input : styles.inputError}
                    />
                    {password && !isValidPassword(password) && (
                      <p className={styles.errorText}>
                        Password must be at least 6 characters
                      </p>
                    )}
                  </div>
                  <button 
                    className={styles.button}
                    disabled={!isFormValid}
                    onClick={handleLogInOrSignUpSubmission}
                  >
                    Sign up to buy/sell formal tickets
                  </button>
                </div>
              )}
      
              {activeTab === 'login' && (
                <div>
                  <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="email-login">
                      University Email
                    </label>
                    <input
                      id="email-login"
                      type="email"
                      placeholder="your.name@cam.ac.uk"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={styles.input}
                    />
                     {email && !isValidEmail(email) && (
                      <p className={styles.errorText}>
                        Please use your @cam or @cantab email address
                      </p>
                    )}
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="password-login">
                      Password
                    </label>
                    <input
                      id="password-login"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={styles.input}
                    />
                    {password && !isValidPassword(password) && (
                      <p className={styles.errorText}>
                        Password must be at least 6 characters
                      </p>
                    )}
                  </div>
                  <button 
                    className={styles.button}
                    disabled={!isFormValid}
                    onClick={handleLogInOrSignUpSubmission}
                  >
                    Log in
                  </button>
                </div>
              )}
      
              {message && (
                <div className={styles.alert}>
                  {message}
                </div>
              )}
            </div>
          </div>
        );
  }

export default SignUpLogIn;