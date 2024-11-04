





//API fetch request to log-in existing user
const signUpUser = async (email, password) => {
    try {
        const response = await fetch('http://localhost:1337/api/auth/local/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: email,
              email: email,
              password: password
            }),
          });
      
          if (!response.ok) {
            throw new Error('Failed to register');
          }
      
          const data = await response.json();
          //localStorage.setItem('jwt', data.jwt); // Store JWT if needed
          //localStorage.setItem('user', JSON.stringify(data.user));
          console.log("Here's the data about to be returned: ", data);
          return data;
        } catch (error) {
          console.error("Registration Error:", error);
          return null;
        }
}
//API fetch request to login user
const loginUser = async (identifier, password) => {
    try {
      const response = await fetch('http://localhost:1337/api/auth/local?populate=*', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier, // username or email
          password,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to log in');
      }
  
      const data = await response.json();
      localStorage.setItem('jwt', data.jwt); // Store JWT
      return data;
    } catch (error) {
      console.error("Login Error:", error);
      return null;
    }
  };

//api fetch function to retrieve user's info
async function fetchUserDetails(token) {
    //let token = localStorage.getItem('jwt');
    try {
      const response = await fetch(`http://localhost:1337/api/users/me?populate=*`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }
  
      const userDetails = await response.json();
      return userDetails;
    } catch (error) {
      console.error("Error fetching user details:", error);
      return null;
    }
  }


export { signUpUser, loginUser, fetchUserDetails };