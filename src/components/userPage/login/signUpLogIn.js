//page for logging/signup

import { isAction } from "redux";



//simple logic for form
//local state for email and password
//then create object with those properties
//and send object as data for API POST request - see ChatGPT example

//have a toggle button for login or signup. 
//toggle sets option localState to 'login' or 'sign-up'
//if option === 'login', then API is LogUserIn API function
//if option === 'signup', then API is signUserUp API function
//have a global isLoggedIn state

const [ logIn, setLogIn ] = useState(false);

function handleToggle(signUp) {
    if (signUp) {
        setLogIn(false);
    }
    else if (logInButton) {
        setLogIn(true);
    }
}

//don't need to duplicate the input body for each toggle, just change which API is sent
//do need to check all this code

function signUpLogIn() {
    return (
        <>
        <div className="form">
            <div className="signUpLoginInToggle">
              <button className={ isActive => 'buttonActive'} value={signUp} onClick={e => handleToggle(value)}>Sign-Up</button>
              <button className={{ isActive => 'buttonActive'}}>Log-In</button>
            </div>
            <div className="inputBody">
              <div className="emailInput"></div>
              <div className="passwordInput"></div>
            </div>
        </div>
        </>
    )
}