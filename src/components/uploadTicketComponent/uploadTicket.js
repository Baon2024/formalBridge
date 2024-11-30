import React, { useState } from "react";
import styles from './uploadTicket.module.css';
//import { DatePicker } from '@mui/x-date-pickers';
//import { TextField } from "@mui/material";
//import { TimePicker } from '@mui/x-date-pickers';
//import { TextField } from '@mui/material';
//import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { createNewTicket } from "../APIFunctions/APIFunctions";
import { useSelector } from "react-redux";
import { selectTicketsInventory } from "../../reduxStateComponents/TicketInventorySlice/ticketInventorySlice";
import { getCollegeBackgroundImage, uploadQRCode, updateUserTicketsListed } from "./getCollegeBackgroundImage";
import { useNavigate } from "react-router-dom";


export default function UploadTicket({user}) {

    const colleges = ["King's", "Queen's", "Corpus Christi", "Madgalene", "Peterhouse", "Murray Edwards", "Selwyn", ""]; // Add more as needed
    const dietaryOptions = ["Vegan", "Vegetarian", "Gluten-Free", "None"]; // Add more as needed


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
    const [ selectedFile, setSelectedFile ] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    //const [ qrFile, setQRFile ] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Get the first selected file
        setSelectedFile(file);
    };

    let qrCodeId;
    
    async function uploadQRCodeHandler() {


        qrCodeId = await uploadQRCode(selectedFile);
        console.log("qrCodeId is: ", qrCodeId);
    }

   
    
    async function createTicketHandler(e) {

        e.preventDefault();

        if (isSubmitting) return; // Prevent multiple clicks
        setIsSubmitting(true);
       
        try {
        const dateTime = new Date(selectedTime);
        const formattedTime = dateTime.toTimeString().slice(0, 8);

        const collegeBackgroundImage = await getCollegeBackgroundImage(selectCollege);
        const imageObject = collegeBackgroundImage && collegeBackgroundImage.length > 0 ? collegeBackgroundImage[0] : null;

        const newTicket = {
          formalEventName: formalEventName,
          formalTicketDate: new Date(selectedDate).toISOString().split('T')[0], // "2024-11-22"
          formalTicketTime: formattedTime,
          formalTicketPrice: Number(ticketPrice),
          formalTicketCollege: selectCollege,
          formalTicketDietary: selectDietary,
          formalTicketCollegeBackgroundImage: /*await getCollegeBackgroundImage(selectCollege)*/ imageObject ? { id: imageObject.id } : null,
          formalTicketQRCode: { id: qrCodeId }, // getQRCode(unique identifier returned by upload API function);
          bought: false,
          formalTicketID: generateRandomId(),
          buyerUser: null, // - is this the correct value to set?
          sellerUser: user.user.id   //need to check whether its document id of user i need here, or what
        }
      
      //BREAK QR CODE UPLOADER INTO TWO PARTS
    //  1. Upload QR .jpeg/png to media library on button click
    //  2. retrirve QR .jpeg/png as value for formalTicketQRCode in newTicket. presumably need returned unique identified (documentId??) in order to select it, returnd from prior function
    
    //can test 1. by console logging the returned API codes, due to seperate button for uploading QR jpeg/png. 


      //need API Put call to create ticket, to formal-tickets collection
      //and need to make sure that you add all the property fields above, even empty ones.
      //need to make sure names match proper names in collection database 
      const returnedNewTicket = await createNewTicket(newTicket, user);
      const returnedNewTicketJSONed = returnedNewTicket.json();
      console.log("returnedNewTicket is: ", returnedNewTicketJSONed);
      console.log("the formal-tickets collection is now: ", ticketsInventory);
      
      if (returnedNewTicket.status >= 200 && returnedNewTicket.status < 300) {
        navigate(`/userPage/${user.user.id}`);
      }

      } catch(error) {
        console.error("Error creating ticket:", error);
      } finally {
        setIsSubmitting(false);
      }
      //once this function is working, will then need to Navigate('/userPage') so user can see their listed ticket
      //add function to add ticket to myTicketsListed field. 
      //updateUserTicketsListed(user, returnedNewTicket);
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
          <input
            value={formalEventName}
            onChange={(e) => setFormalEventName(e.target.value)}
            type="text"
            placeholder="enter formal event name"
          />
        </div>
        <div className={styles.formGroup}>
          <label>college</label>
          <div className={styles.dropdown}>
            <select
              className={styles.dropdownInput}
              value={selectCollege}
              onChange={(e) => setSelectCollege(e.target.value)}
            >
              <option value="" disabled>Select college</option>
              {colleges.map((college, index) => (
                <option key={index} value={college}>{college}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label>price to list</label>
          <input
            type="number"
            placeholder="Enter price"
            value={ticketPrice}
            onChange={(e) => setTicketPrice(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>dietary</label>
          <div className={styles.dropdown}>
            <select
              className={styles.dropdownInput}
              value={selectDietary}
              onChange={(e) => setSelectDiet(e.target.value)}
            >
              <option value="" disabled>Select dietary preference</option>
              {dietaryOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label>date picker</label>
          <DatePicker
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
      <div classname={styles.formRow}>
        <div className={styles.formGroup}>
          <label id="qrCodeInput">upload your ticket</label>
          <input id="qrCodeInput" type="file" accept=".jpeg, .png" onChange={handleFileChange} required />
          <button onClick={uploadQRCodeHandler}>Upload your ticket</button>
        </div>
      </div>
      <div>
        <button onClick={createTicketHandler} disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "List My Formal Ticket"}</button>
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