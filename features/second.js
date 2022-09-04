import { createSlice } from '@reduxjs/toolkit'

export const counterSlice_2 = createSlice({
    name: 'counter_2',
    initialState: {
        value: 10,
    },
    reducers: {
        increment_2: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1
        },
        decrement_2: (state) => {
            state.value -= 1
        },
        incrementByAmount_2: (state, action) => {
            state.value += action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { increment_2, decrement_2, incrementByAmount_2 } = counterSlice_2.actions

export default counterSlice_2.reducer