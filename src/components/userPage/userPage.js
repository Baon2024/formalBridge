//page for all the users' detaisl - lets make this a single page, just with many components

//obviously use useParams() to get current user, and show their stuff
//best to get all the users in this page, by making Fetch API request here, rather than passing it down as a global state

//and will need to retrieve the 'my tickets listed' and 'my tickets bought' properties and feed them to each component

function User() {
    return (
      <>
      <MyTicketsBought />
      <MyTicketsListed />
      </>
    )
}

//and whatever other categories are needed, like resetting user details and stuff