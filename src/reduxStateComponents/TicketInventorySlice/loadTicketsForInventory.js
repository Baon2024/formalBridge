//import { createAsyncThunk } //need to install redux~toolkit??
import { fetchTicketsData, fetchTicketsData2 } from "../../components/APIFunctions/APIFunctions"
import { createAsyncThunk } from "@reduxjs/toolkit";

const loadTicketsForInventory = createAsyncThunk(
    'ticketsInventory/loadTicketsForInventory',
    async() => {
        const response = await fetchTicketsData2();
        return response;
  })


export default loadTicketsForInventory;

