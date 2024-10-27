//need to create the slice here for ticket inventory



//create ticketInventory slice - the state and the action creators





//witjin the state slice, for adding tickets to cart
//need to check before the return { } that ticket isn not already part of state
// so need to filter existing state - const alreadyExists = cart.find((item) => item === action.payload)
//or somehing like that
//if alreadyExists = false, then returb { [...state, action.payload] }
//otherwise, return [...state] - i think that's correct??
//let initialState = {};

//do i set up with redux toolkit, or just the original redux?
//1. - loadTickets for inventory state - on useEffect on ticketCollectionPage
//2. - addTicket for cart state - for each ticketPage
//3. - removeTicket for cart state - only needs to appear in cart footer UI component 

//then need to create the store from the two state slices, by exporting these slices;
/*
const ticketsInventorySlice = (state = initialState, action) => {

    switch (action.type) {
        case "ticketsInventory/addTickets": {
            return ...state, 
            action.payload //pretty sure this is correct?
        }
        default: 
          return state; //this is correct i think??
        } 

  function loadTicketsInventoryFromDatabase(ticketsData) {
  
    return {
      type: "ticketInventory/addTickets",
      payload: ticketsData,
    }
  }
  }

- the redux-Toolkit with asyncThunk should be used for the ticketsInventory state - as am fetching intiially with API
- i think, in my opinion, so that i can use isLoading and Failed states to show loading icon and alternatiev json

//redu@toolkit asyncThunk ticketsInventory state slice
const ticketsInventorySlice = createSlice({
  name: "ticketsInventory",
  initialState: {
    ticketsInventory: {},
    isLoading: fa;se,
    rejected: false
  },
  reducers: {},
  extraReducers: {
    loadTicketsForInventory: (state, action) => {
      [loadTicketsForInventory.pending]: (state) => {
        state.isLoading = true;
        state.rejected = false;
        }
      [loadTicketsForInventory.rejected]: (state) => {
        state.isLoading = false;
        state.rejected = true;
        }
      [loadTicketsForInventory.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.rejected = false;
        state.ticketsInventory = action.payload;
        }
      }
  }
})
check whether that's all correct against documentation and chatGPT?


//now create Cart Slice
const cartSlice = (state = initialState, action) => {
  switch(action.type) {
    case "cart/addTicket": 
    //need to make sure ticket being added isn't already part of Cart
    {
      return [...state, action.payload];
    },
    case "cart/removeTicket": {
      return state = state.filter(ticket => ticket.id !== action.payload.id );
    }
  }

  function addTicket(ticket) {
    return {
      type: "cart/addTicket",
      payload: ticket,
    }
  }
  
  function removeTicket(ticket) {
    return {
      type: "cart/removeTicket",
      payload: ticket,
    }
  }
}

export default ticketsInventorySlice.reducer;*/
