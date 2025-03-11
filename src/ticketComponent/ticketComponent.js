//here you will create the ticket Component, which you'll import to the tcketCollectionPage
//to map each ticket item into
import TicketCard from "./ticketCard"

//use transform: scale (num) with :hover in order to make the ticketComponent expand on mouse hover - like transform: scale (1.2) makes it 1.2x bigger on hover
//and find the CSS to turn curoser into pointer (?) on hover over
//and need the whole ticket Component to be a Link or button element, so when any part is clicked, it works. 

/* const navigate = useNavigate(); // React Router hook for navigation

  const handleClick = () => {
    navigate(link); // Navigate to the provided link
  };

  return (
    <div className="card" onClick={handleClick}> */

// so, just add eventhandler to teh ticketComponent's outer division, and useNavigate is used to access each dynamic link
//and send user to it without refreshing when clicked. pass down the link in props as with rest. 

function TicketComponent({ticketsInventory}) {

    //in ticketsList/whatever its name, just pass down the ticket as props for each component, then extra the propertis below:

    //just extra ticket properties by destructing
  

  //const navigate = useNavigate();

  /*function handleClick() {
    navigate(ticketLink); //-sends user to 'ticketsPage/:name' or whatever you call it
  }*/


  //design the card in Figma, use the different tools/codeAi stuff to extra the exact code, then add below


  //need to change ticketsInventory so that it equals fTBST if that is truthy, otherwise equals filteredTickets
  //and would then need to change filteredTickets so its passed as prop, rather than assigned to ticketsinventory in parent
  /*let ticketsInventory;
  // it needs to be 'if search is true, tI equals fTBST, else equals fT. so, needs to 
  if (filteredTicketsBySearchTerm) {
    ticketsInventory = filteredTicketsBySearchTerm
  } else {
      ticketsInventory = filteredTickets
  }*/
  console.log("value of ticketsInventory is:", ticketsInventory);
  
  return (
    <>
    {ticketsInventory.map((ticket, index) => (
      <TicketCard
      //think it needs to be numeric index, in order to be able to access the sampleData array
      ticket={ticket}
      key={index}
      />
    ))}
    </>
  )

}

export default TicketComponent;