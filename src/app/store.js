import {configureStore } from "@reduxjs/toolkit"
import characterReducer from "../features/counter/counterSlice"

export const store = configureStore({
    reducer:{
        character : characterReducer
    }
}) 