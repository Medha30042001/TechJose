import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice"

export const store = configureStore({
    reducer : {
        counter : counterReducer, //counter is a state section
    }, //the counter state section is managed using counterReducer
});