import React from "react"

export default function UploadTicket() {
    return (
        <>
          <p>page to upload your ticket</p>
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








    Navigate('/') // - use navigate to send user to a 'Thank You' component at the end
}*/