//function to select formalbackgroundImage from public folder images, based on formalEventCollege


async function getCollegeImageItself(fileName) {
    let url = `http://localhost:1337/api/upload/files?filters[name][$eq]=${fileName}`;

    

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`, // Include JWT token for authentication
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch image for ${fileName}`);
        }
    
        const imageData = await response.json();
        if (imageData.length === 0) {
          console.error(`No image found in Strapi for ${fileName}`);
          return null;
        }
          console.log("this is the ImageData about to be returned: ", imageData);
          //console.log("this is what urlToReturn is: ", urlToReturn);
        return imageData;
        } catch (error) {
            console.error('Error fetching college background image:', error);
            return null;
  }
}

async function getCollegeBackgroundImage(formalEventCollege) {
    
    console.log("the formalEventName passed to getCollegeBackgroundImage is: ", formalEventCollege);
    
    //better than switch/if logic syntax
    const colleges = {
        "King's": 'kings.jpeg',
        "Queen's": 'queens.jpeg'
    }

    const fileName = colleges[formalEventCollege];
    console.log("This is what fileName is: ", fileName);
    //need to make sure that the string names in uploadTicket form match with the .jpeg file names/image names in the media library
     
    if (!fileName) {
        console.error(`No image file mapped for college: ${formalEventCollege}`);
        return null; // Return a fallback or handle gracefully
    }

    const dataToReturn = await getCollegeImageItself(fileName);
    //const realDataToReturn = dataToReturn[0].url;
    //console.log("this should be url to return", realDataToReturn);
    return dataToReturn;

// then get the whole image field, and return it so it's acttched to newTicket, and newTicket looks in the database like the manually created ones??
}


async function uploadQRCode(file) {
    const formData = new FormData();
    formData.append('files', file);

    try {
        const response = await fetch('http://localhost:1337/api/upload', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to upload QR code');
        }

        const uploadedFiles = await response.json();
        console.log('Uploaded file details:', uploadedFiles);

        // Return the uploaded file's ID
        return uploadedFiles[0].id; // Assuming the first file is what we need
    } catch (error) {
        console.error('Error uploading QR code:', error);
        return null;
    }
}



async function updateBuyerUser(ticket, user) {
  
    const ticketDocumentId = ticket.documentId;
    const userDocumentId = user.user.documentId; //needs to be user.user.documentId
    const token = user.token;
    //console.log("the userDocumentId is: ", userDocumentId);

    try {
        const response = await fetch(`http://localhost:1337/api/formal-tickets/${ticketDocumentId}?populate=buyerUser`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`, // Include JWT token for authentication
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: {
                    //bought: true, // Set bought to true
                    buyerUser: userDocumentId, // Assign the user's documentId to buyerUser
                },
            }),
        });

        if (!response.ok) {
            throw new Error(`Failed to update ticket: ${response.statusText}`);
        }

        const updatedTicketData = await response.json();
        console.log('Ticket updated successfully:', updatedTicketData);
        return updatedTicketData; // Return the updated ticket data
    } catch (error) {
        console.error("Error updating ticket buyer:", error);
        throw error; // Rethrow the error for further handling if needed
    }

  }
  
  async function updateUserTicketsListed(user, ticket) {

    const ticketDocumentId = ticket.documentId;
    const userDocumentId = user.user.documentId;
    const userId = user.user.id;

    try {
        // Fetch the user data first to get the current MyTicketsBought
        const userResponse = await fetch(`http://localhost:1337/api/users/me?populate=*`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`, // Include JWT token for authentication
                'Content-Type': 'application/json',
            },
        });

        if (!userResponse.ok) {
            throw new Error(`Failed to fetch user data: ${userResponse.statusText}`);
        }

        const userData = await userResponse.json();

        // Update the user's MyTicketsBought to include the new ticket
        const updateResponse = await fetch(`http://localhost:1337/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`, // Include JWT token for authentication
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: {
                    myTicketsBought: [...(userData.MyTicketsListed || []), ticketDocumentId], // Add the new ticket ID
                },
            }),
        });

        if (!updateResponse.ok) {
            throw new Error(`Failed to update user: ${updateResponse.statusText}`);
        }

        const updatedUserData = await updateResponse.json();
        console.log('User updated successfully:', updatedUserData);
        return updatedUserData; // Return the updated user data
    } catch (error) {
        console.error("Error updating user tickets bought:", error);
        throw error; // Rethrow the error for further handling if needed
    }
};

export { getCollegeBackgroundImage, uploadQRCode, updateUserTicketsListed };