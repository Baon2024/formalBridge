//import { createAsyncThunk } //need to install redux~toolkit??
import { fetchTicketsData } from "../../components/APIFunctions/APIFunctions"
import { createAsyncThunk } from "@reduxjs/toolkit";

const loadTicketsForInventory = createAsyncThunk(
    'ticketsInventory/loadTicketsForInventory',
    async() => {
        const response = await fetchTicketsData();
        return response;
  })


export default loadTicketsForInventory;

