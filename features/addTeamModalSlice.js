import { createSlice } from '@reduxjs/toolkit'

export const addTeamSlice = createSlice({
    name: 'AddTeam',
    initialState: {
        open: false,
        open2: false,
        added: 0
    },
    reducers: {
        openModalTeam_1: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            if (state.open == false) {
                state.open = true
            } else {
                state.open = false
            }
        },
        openModalTeam_2: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            if (state.open2 == false) {
                state.open2 = true
            } else {
                state.open2 = false
            }
        },
        addSome: (state) => {
            state.added += 1
        }
    },
})

// Action creators are generated for each case reducer function
export const { openModalTeam_1, openModalTeam_2, addSome } = addTeamSlice.actions

export default addTeamSlice.reducer