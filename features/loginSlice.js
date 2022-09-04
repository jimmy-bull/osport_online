import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
    name: 'Login',
    initialState: {
        islogin: false,
        token: ''
    },
    reducers: {
        // increment: (state) => {
        //     // Redux Toolkit allows us to write "mutating" logic in reducers. It
        //     // doesn't actually mutate the state because it uses the Immer library,
        //     // which detects changes to a "draft state" and produces a brand new
        //     // immutable state based off those changes
        //     state.value += 1
        // },
        // decrement: (state) => {
        //     state.value -= 1
        // },
        // incrementByAmount: (state, action) => {
        //     state.value += action.payload
        // },
        login: (state, action) => {
            state.islogin = true
            state.token = action.payload
        },
        logout: (state) => {
            state.islogin = false
            state.token = ""
        }
    },
})

// Action creators are generated for each case reducer function
export const { login, logout } = loginSlice.actions

export default loginSlice.reducer