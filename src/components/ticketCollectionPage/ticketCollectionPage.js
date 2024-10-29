import React, { useEffect, useState } from "react"
import { fetchTicketsData } from "../APIFunctions/APIFunctions"
import styles from './ticketCollectionPage.module.css';
import TicketComponent from "../../ticketComponent/ticketComponent";
import sampleData from "./sampleData";
import SearchBar from "./searchTerm";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectTicketsInventory, selectIsLoading, selectRejected } from "../../reduxStateComponents/TicketInventorySlice/ticketInventorySlice";
import loadTicketsForInventory from "../../reduxStateComponents/TicketInventorySlice/loadTicketsForInventory";
import { selectCartInventory } from "../../reduxStateComponents/TicketInventorySlice/cartInventorySlice";


function TicketCollectionPage({ticketsInventory, setTicketsInventory, cart}) {

  //const [ ticketsData, setTicketsData ] = useState([]);
  //const [ testData, setTestData ] = useState([]);
  const [ searchTerm, setSearchTerm ] = useState('');
  const dispatch = useDispatch(); 
  const reduxTickets = useSelector(selectTicketsInventory);
  const isLoading = useSelector(selectIsLoading);
  const rejected = useSelector(selectRejected);
  //const cart = useSelector(selectCartInventory);


  useEffect(() => { 

    fetchTicketsData().then((tickets) => setTicketsInventory(tickets));
    //console.log("the ticketsData state is: ", ticketsData);
    console.log("ticketsInventory is: ", ticketsInventory)

    const fetchTickets = async () => {
      dispatch(loadTicketsForInventory()); // Dispatch the async thunk
      console.log("Tickets loaded and stored in Redux: ", reduxTickets);
    };

    fetchTickets();



    //if its being fetched correctly, then need to switch sampleData for ticketsData
    //console.log("Your sampleData is: ", sampleData);
    /*sampleData.map((ticket) => {
      console.log(ticket.formalTicketCollegeBackgroundImage);
    })*/

    //dispatch(loadTicketsForInventory());  

  // - i can stop tickets added to cart from being shown in remaining ticketInventory display, by simple:
  // - const remainingTickets = ticketsData.filter((ticket) => ticket.id !)

  //and then next thing to do is to filter those tickets by the searchTerm.

    

    //the call is being made and logged - its just not accesisng the databse successfully
    //but it works for their example categories - so use that for now
    }, [])

    useEffect(() => {
      if ( reduxTickets.length > 0) {
      console.log("these are the ticketsInventory from redux: ", reduxTickets);
      }

    }, [reduxTickets])
 
    //need to console.log the new data, to make sure its working before the UI code is implemented
    //and later dispalcement array will need to enable refreshing when a product is dleeted due to order.

    //need a further intermediate function to return ticket array whose formal date time is greater than current time.

    /*function returnValidTickets(ticketsInventory) {
      ticketsInventory = ticketsInventory.filter(ticket => ticket.formalticketDate > #function to get current dtae#
        && ticket.formalTicketTime > #function to get current time#
        console.lof(ticketsInventory);
  )}
    
    */

    const filteredTickets = reduxTickets.filter(ticket => !cart.some(cartItem => cartItem.id === ticket.id));
    console.log("These are the tickets you've filtered: ", filteredTickets);

    //need function to filter filteredTickets by the searchTerm variable. something like 'if college name or formal name 
    // === searchTerm, then ticket should be included in the returned array of tickets. 
    ///<IMPORTANT> - first test that searchBar component renders and returns search term in console log 
    ///without filtering the tickets by the search term. THEN, finish code to filter tickets by searchTerm and see.
    function filterTickets(searchTerm, filteredTickets) {
      return filteredTickets.filter(ticket => 
        ticket.formalEventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.formalTicketCollege.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const filteredTicketsBySearchTerm = filterTickets(searchTerm, filteredTickets);
    console.log("These are the filteredTicketsBySearchTerm: ", filteredTicketsBySearchTerm);

    
  // it needs to be 'if search is true, tI equals fTBST, else equals fT. so, needs to 
  if (searchTerm) {
    ticketsInventory = filteredTicketsBySearchTerm
    } else {
      ticketsInventory = filteredTickets
    }
    console.log(ticketsInventory);

    /*const filteredTicketsBySearchTerm = filteredTickets.filter((ticket) => {
      
        if (ticket.formalEventName.toLowerCase() === searchTerm.toLowerCase() || ticket.formalCollegeName.toLowerCase() === searchTerm.toLowerCase()) {
          return ticket;
        }  
        //need to make sure that capital/lowercase letter's don't matter?
      })*/
     

    //pass down both filteredTicketsBySearchTerm AND filteredTickets - filtered Tickets will be used if fTBST is empty (falsy)

//decie what viewpoint height you want for searchTerm component, and TicketsList component
//find the source (material UI?) of teh search omponent in Figma, and just import that
    return (
    <div className={styles.ticketCollectionPageContainer}>
      <div className={styles.searchBarContainer}>
        <SearchBar className={styles.searchBar}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
      { isLoading ? (
        <div className={styles.loadingSpinner}>
           <div className={styles.spinnerCircle}></div>
        </div>
      ) : rejected ? (
        <div className={styles.errorMessage}>Load failed, try again!</div>
      ) : reduxTickets && reduxTickets.length > 0 ? (
      <div className={styles.containerBorder}>
        <TicketComponent
          /*filteredTickets={filteredTickets}*/
        /*filteredTicketsBySearchTerm={filteredTicketsBySearchTerm}*/
        ticketsInventory={ticketsInventory}
        />
      </div> 
      ) : (
        <div className={styles.noTicketsMessage}>No tickets available.</div>
      )}
    </div>
    )
}

/*SearchInput
value={searchText}
onChange={newText => setSearchText(newText)} />*/
//borrowed from React docs - set searchTerm state here, then send down event handler and stateto the component

/* due to importing ticket component, you need an extr alayer here for the card results container
  
  <ticketSearch>
  <div className={styles.cardResultsContainer}>
    <ticketCard />
  </div>
*/


export default TicketCollectionPage
//export { ticketsData };

//the state for ticketSearchTerm will sit on this level, so its passed down to SearchBox component, which stes ticketSearchTerm
//and then ticketSearchTerm is passed down to ticketsResults component, where ticketsData is filtered by searchTerm


//and will use useEffect hook in order to fetch API the ticketsData from strapi database every time the page renders
//and will dispatch it to Redux state slice, replacing the existing state of tickets.

//(new tickets added will be added to the strapi database, rather than added to redux state directly)

//redux ticket state will then be passed down to ticketsResults component

//need to decide on redux set-up - whether ticketsData is loaded as initialState
//or added to a empty {} intitialState.

//i think that initialState should be {}, only load ticketsData when 'page' is opened
