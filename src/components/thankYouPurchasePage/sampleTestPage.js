import { useEffect, useState } from "react";




export default function SampleTestPage () {


    const [ tickets, setTickets ] = useState([]);
    //test function to backend
    async function fetchTicketsData() {

        
        
        const data = await fetch('http://localhost:5001/getTickets');
        const dataToReturn = await data.json();
        console.log("these are the filtered tickets returned to the front-end, just before being set:", dataToReturn);
        setTickets(dataToReturn);
    }
    useEffect(() => {
        
        fetchTicketsData();
    },[])
    

  return (
    <>
    <p>nothing here yet</p>
    <h2>except this</h2>
    { tickets && tickets.map((ticket) => (
        <p>{ticket.formalEventName}</p>
    ))
    }
    </>
  )
}