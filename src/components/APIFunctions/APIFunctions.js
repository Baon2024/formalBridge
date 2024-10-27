



async function fetchTicketsData() {

    const url = 'http://localhost:1337/api/formal-tickets?populate=*'
    //'?populate=*' is required to return media

    //implement 'pending/failed/successful' hooks, so when pending is true you can display a load icon in container body
   
   try {
   const response = await fetch(url, {
     method: "GET",
     headers: {
         "Content-type": "application/json",
     },
   });
 
   if (!response.ok) {
     const errorData = await response.json();
     throw new Error(errorData.message || "Network response was not ok");
   }
 
   const jsonResponse = await response.json();
     const entries = jsonResponse.data; // Accessing the 'data' array
     console.log("Data retrieved:", entries);
     return entries;
  } catch (error) {
    console.log("Error:", error);
  }
}

export { fetchTicketsData };