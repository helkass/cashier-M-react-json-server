import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   items: [],
   total: 0,
};

const cartSlice = createSlice({
   name: "cart",
   initialState,
   reducers: {
      add(state, action) {
         const index = state.items.findIndex(
            (item) => item._id === action.payload._id
         );

         if (index >= 0) {
            state.items[index] = {
               ...state.items[index],
               quantity: state.items[index].quantity + 1,
               subTotal: state.items[index].subTotal + state.items[index].price,
            };
         } else {
            const temp = {
               ...action.payload,
               quantity: 1,
               subTotal: action.payload.price,
            };
            state.items.push(temp);
         }

         const sub = state.items.map((item) => item.subTotal);

         state.total = sub.reduce((sum, item) => sum + item, 0);
      },
      decrease(state, action) {
         const index = state.items.findIndex(
            (item) => item._id === action.payload._id
         );

         if (state.items[index].quantity > 1) {
            state.items[index].quantity -= 1;
            state.items[index].subTotal -= state.items[index].price;
         } else if (state.items[index].quantity === 1) {
            const newItems = state.items.filter(
               (item) => item._id !== action.payload._id
            );
            state.items = newItems;
         }
         const sub = state.items.map((item) => item.subTotal);
         state.total = sub.reduce((sum, item) => sum + item, 0);
      },
      removeAll(state) {
         state.items = [];
         state.total = 0;
      },
   },
});

export const { add, decrease, removeAll } = cartSlice.actions;
export default cartSlice.reducer;
