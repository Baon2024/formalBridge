import { createSlice } from "@reduxjs/toolkit";


const initialState = [];

const cartInventorySlice = createSlice({
    name: 'cartInventory',
    initialState: initialState,
    reducers: {
        addTicketToCart: (state, action) => {
          state.push(action.payload);
        },
        removeTicketFromCart: (state, action) => {
          return state.filter((ticket) => ticket.id !== action.payload.id)
        },
        resetCart: () => initialState
}})











//need to export cartInventory = state.reducer; (??)
export const selectCartInventory = (state => state.cart || []);
export default cartInventorySlice.reducer;
export const { addTicketToCart, removeTicketFromCart, resetCart } = cartInventorySlice.actions;
