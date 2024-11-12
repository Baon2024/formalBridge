import React, { useState } from "react";
import styles from './uploadTicket.module.css';
//import { DatePicker } from '@mui/x-date-pickers';
//import { TextField } from "@mui/material";
//import { TimePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { createNewTicket } from "../APIFunctions/APIFunctions";
import { useSelector } from "react-redux";
import { selectTicketsInventory } from "../../reduxStateComponents/TicketInventorySlice/ticketInventorySlice";


export default function UploadTicket({user}) {

    function generateRandomId() {
        return Math.floor(10000000 + Math.random() * 90000000).toString();
    }
    const ticketsInventory = useSelector(selectTicketsInventory);
    //need to pass user down, so i can access user's details

    const [ formalEventName, setFormalEventName ] = useState('');
    const [ selectedDate, setSelectedDate ] = useState(null);
    const [ selectedTime, setSelectedTime ] = useState(null);
    const [ ticketPrice, setTicketPrice ] = useState(null);
    const [ selectCollege, setSelectCollege ] = useState('');
    const [ selectDietary, setSelectDiet ] = useState('');

    
    function createTicketHandler(e) {

        e.preventDefault();

        const dateTime = new Date(selectedTime);
        const formattedTime = dateTime.toTimeString().slice(0, 8);
        
        const newTicket = {
          formalEventName: formalEventName,
          formalTicketDate: new Date(selectedDate).toISOString().split('T')[0], // "2024-11-22"
          formalTicketTime: formattedTime,
          formalTicketPrice: Number(ticketPrice),
          formalTicketCollege: selectCollege,
          formalTicketDietary: selectDietary,
          formalTicketCollegeBackgroundImage: null,
          formalTicketQRCode: null,
          bought: false,
          formalTicketID: generateRandomId(),
          buyerUser: null, // - is this the correct value to set?
          sellerUser: user.user.id   //need to check whether its document id of user i need here, or what
        }


      //need API Put call to create ticket, to formal-tickets collection
      //and need to make sure that you add all the property fields above, even empty ones.
      //need to make sure names match proper names in collection database 
      createNewTicket(newTicket, user);
      console.log("the formal-tickets collection is now: ", ticketsInventory);
      //once this function is working, will then need to Navigate('/userPage') so user can see their listed ticket

    }
   


    //need to make the uploadTicket into component elsewhere, and import into here
    //and within teh component import the MUI time and date pickers
    //need to do dropdown selectors

    //need to amend permisions for users, to allow them to make POST/Put api calls

    return (
        <>
          <div className={styles.eventForm}>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label>formal event</label>
          <input value={formalEventName} onChange={(e) => setFormalEventName(e.target.value)} type="text" placeholder="enter formal event name" />
        </div>
        <div className={styles.formGroup}>
          <label>college</label>
          <div className={styles.dropdown}>
            <input className={styles.dropdownInput} type="dropdown" placeholder="Placeholder" value={selectCollege} onChange={(e) => setSelectCollege(e.target.value)} />
          </div>
        </div>
      </div>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label>price to list</label>
          <input type="number" placeholder="Placeholder" value={ticketPrice} onChange={(e) => setTicketPrice(e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label>dietary</label>
          <div className={styles.dropdown}>
            <input className={styles.dropdownInput} type="dropdown" placeholder="Placeholder" value={selectDietary} onChange={(e) => setSelectDiet(e.target.value)} />
          </div>
        </div>
      </div>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label>date picker</label>
          <DatePicker
                //label="Select Date"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                renderInput={(params) => <TextField {...params} />}
            />
        </div>
        <div className={styles.formGroup}>
          <label>time picker</label>
          <TimePicker
            value={selectedTime}
            onChange={(newValue) => setSelectedTime(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
      </div>
      <div>
        <button onClick={createTicketHandler}>list my formal ticket</button>
      </div>
    </div>
        </>
    )
}

// - simply implement a basic version of the ticket upload form, without the media inputs
//smae logic otherwise, use local state to create newTicket object, then FetchAPI send to the database



//in addition to any note sin the other formalbridge version, i suspect the joined-up wya that uploading files and attaching
//them to the newticket works, is to upload the file seeprately as the guides suggest
//and then use the file from 'file/setFile' local state in a Fetch API request to the STrapi media collection
//in order to retrieve the pdf url and attach it to the newTicket object

//so newTicket would have a property of 'formalTicketPDF: retrievePDFFromStrapiMedia(file);' or something like this??
//then resetinng file to "" when the rest of the local states are resetted. 


/*
function handleFormSubmission(e) {


   <DatePicker
                //label="Select Date"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                
                slotProps={{ textField: { fullWidth: true } }}
            />

    <TimePicker
            value={selectedTime}
            onChange={(newValue) => setSelectedTime(newValue)}
          />



    Navigate('/') // - use navigate to send user to a 'Thank You' component at the end
}*/