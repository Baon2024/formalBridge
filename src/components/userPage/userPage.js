//page for all the users' detaisl - lets make this a single page, just with many components
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserDetails } from "./login/relevantAPIFunctions";
import styles from './userPage.module.css';

//obviously use useParams() to get current user, and show their stuff
//best to get all the users in this page, by making Fetch API request here, rather than passing it down as a global state

//and will need to retrieve the 'my tickets listed' and 'my tickets bought' properties and feed them to each component

function UserPage({user, setUser}) {

  //user the id from the params to make fetch API to users collection, in order to get update to date user props.
  const { id } = user.user;
  const { token } = user;
  //console.log(token);
  const [ userData, setUserData ] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const getUserData = async () => {
      let userDataToSet = await fetchUserDetails(token);
      console.log("userData currently is: ", userDataToSet);
      //setUserData(userDataToSet);
      setUserData(userDataToSet);
    }
   
    getUserData();

  }, [id])

  //probably easiest way to get tickets, is to make request to get user details with 
  //relation fields upon loading this page, and setuserData using the return result. 

  console.log("userData is: ", userData);

    function handleLogOut() {
      localStorage.removeItem('jwt');
      setUser(null);
      navigate("/");
    }

  //need to put a log-out button here, which redirects to homepage once logged out.

  const myTicketsBought = userData?.myTicketsBought;
  console.log("your my TicketsBought are: ", myTicketsBought);
    return (
      <>
        <div className={styles.topContainer}>
          <button onClick={handleLogOut}>Log Out</button>
        </div>
        <div className={styles.ticketsBought}>
          { /*userData*/ user && userData ? (
          <>
            <p>data has been returned</p>
            <p>{/*userData.email*/ userData.email}</p>
            <p>Your bought ticket are: </p>
            { myTicketsBought && myTicketsBought.map((ticket) => (
              <>
                <div key={ticket.id}>
                  <p>{ticket.formalEventName}</p>
                  <p>{ticket.formalTicketCollege}</p>
                </div>
              </>
            ))}
          </>
        ) : (
          <p>no user data</p>
        )}
      </div>
      </>
    )
}

//and whatever other categories are needed, like resetting user details and stuff
export default UserPage;