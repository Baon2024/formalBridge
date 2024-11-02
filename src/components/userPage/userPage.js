//page for all the users' detaisl - lets make this a single page, just with many components
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserDetails } from "./login/relevantAPIFunctions";

//obviously use useParams() to get current user, and show their stuff
//best to get all the users in this page, by making Fetch API request here, rather than passing it down as a global state

//and will need to retrieve the 'my tickets listed' and 'my tickets bought' properties and feed them to each component

function UserPage({user, setUser}) {

  //user the id from the params to make fetch API to users collection, in order to get update to date user props.
  const { id } = user.user;
  const { token } = user;
  const [ userData, setUserData ] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const getUserData = async () => {
      let userDataToSet = await fetchUserDetails(token);
      console.log("userData currently is: ", userData);
      setUserData(userDataToSet);
    }
   
    getUserData();

  }, [id])

    function handleLogOut() {
      localStorage.removeItem('jwt');
      setUser(null);
      navigate("/");
    }

  //need to put a log-out button here, which redirects to homepage once logged out.
    return (
      <>
      <p>This is the user's personal page</p>
      { userData ? (
        <>
          <p>data has been returned</p>
          <p>{userData.email}</p>
          <button onClick={handleLogOut}>Log Out</button>
        </>
      ) : (
        <p>no user data</p>
      )}
      </>
    )
}

//and whatever other categories are needed, like resetting user details and stuff
export default UserPage;