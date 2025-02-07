







export default async function sendProblemToBackend(message) {

    const user = localStorage.getItem('user');

    console.log("user in frontend of problem function is:", user);

    const url = 'http://localhost:5001/api/problem';

    console.log("problemText in frontend function is:", message);

    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message, // shorthand for problemText: problemText
            user,        // shorthand for user: user
        }),
    });
    
    //const jsonedResponse = await response.json();

    const jsonedResponse  = await response.json();
    console.log("session in the frontend is:", jsonedResponse );
    return jsonedResponse;
}