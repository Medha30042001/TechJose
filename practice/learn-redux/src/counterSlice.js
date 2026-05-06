import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    value : 0
};

const counter = createSlice({
    name : "counter",
    initialState,
    reducers : {
        increment : (state) => {
            state.value += 1;
        },
        decrement : (state) => {
            state.value -= 1;
        },
        incrementByAmount : (state, action) => {
            state.value += Number(action.payload);
        },
    },
});

export const {increment, decrement, incrementByAmount} = counter.actions;
export default counter.reducer;

//counterSlice.js controls the counter section

//increment, decrement, etc are the only actions we created 
// for changing the counter.

//the actionsare written inside reducers as an object 
// because Redux Toolkit expects that format.

// Why export increment and decrement?
// to make these action functions available to other files.