






let initialState = {};

//do i set up with redux toolkit, or just the original redux?

const ticketsInventory(state = initialState, action) {

    switch(action.type) {
        case "ticketsinventory/addTickets": {
            return ...state, action.payload 
        }
    }
}

//need to create the action creator

//will need to create a seperate cart state, later?