



export default async function addConnectedAccountIdToUser(userData, connectedAccountId, token) {

    const userToken = token;
    console.log("userToken inside of addConnectedAccountIdToUser function is:", userToken);

    console.log("connectedAccountId inside of addConnectedAccountIdToUser functioin is:", connectedAccountId);
    const userId = userData.id;
    console.log("id inside of addConnectedAccountIdToUser functioin is:", userId);

    try {
        const response = await fetch(`http://localhost:1338/api/users/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`  // if authentication is required
          },
          body: JSON.stringify({
            connectedAccountId: connectedAccountId
          })
        });
        
        if (!response.ok) {
          throw new Error('Failed to update user with connectedAccountId');
        }
    
        const updatedUser = await response.json();
        console.log("updatedUser about to return from addConnectedAccountIdToUser:", updatedUser);
        return updatedUser;
      } catch (error) {
        console.error("Error updating user:", error);
        throw error;  // Re-throw for further handling
      }

}