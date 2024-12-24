export async function createStripeAccount(setError, setAccountCreatePending, setAccountLinkCreatePending, setConnectedAccountId) {
    setAccountCreatePending(true);
    console.log("setAccountCreatePending is:", setAccountCreatePending);
                setError(false);
                fetch('http://localhost:5001/account', {
                  method: "POST",
                })
                  .then((response) => response.json())
                  .then((json) => {
                    setAccountCreatePending(false);
  
                    const { account, error } = json;
  
                    if (account) {
                      setConnectedAccountId(account);
                      return account;
                    }
  
                    if (error) {
                      setError(true);
                      return error;
                    }
                  });
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