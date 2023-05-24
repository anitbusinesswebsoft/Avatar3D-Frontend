import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: '',
    characterValue:"",
    isLoading: true
}

export const counterSlice = createSlice({
    name: 'characterType',
    initialState,
    reducers: {
        bodyType: (state, action) => {
            state.value = action.payload
        },
        selectedCharacter: (state, action) => {
            state.characterValue = action.payload
        },
        isLoading:(state, action) => {
            state.isLoading = action.payload
        }
    }
})

export const { bodyType, selectedCharacter, isLoading } = counterSlice.actions
export default counterSlice.reducer
