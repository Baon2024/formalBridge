export async function createStripeAccount(setError, setAccountCreatePending, setAccountLinkCreatePending, setConnectedAccountId) {
    setAccountCreatePending(true);
    setError(false);
  
    try {
      const response = await fetch('http://localhost:5001/account', {
        method: "POST",
      });
  
      const json = await response.json();  // Wait for the response to be fully resolved
      setAccountCreatePending(false);
  
      const { account, error } = json;
      console.log("account in createStripeAccount function is:", account);
  
      if (account) {
        setConnectedAccountId(account);  // Set state with the account
        return account;  // Return the account after it is set
      }
  
      if (error) {
        setError(true);
        return error;
      }
    } catch (error) {
      setAccountCreatePending(false);
      console.error("Error during Stripe account creation:", error);
      setError(true);
      return error;
    }
  }


  export async function addInfoForStripe (connectedAccountId, setError, setAccountLinkCreatePending) {
    setAccountLinkCreatePending(true);
    setError(false);
    fetch("http://localhost:5001/account_link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        account: connectedAccountId,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        setAccountLinkCreatePending(false);
  
        const { url, error } = json;
        if (url) {
          window.location.href = url;
        }
  
        if (error) {
          setError(true);
        }
      });
  }