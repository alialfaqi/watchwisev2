import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    modalIsShown: false,
    loginModalStatus: true,
    signUpModalStatus: false
};

export const signModalSlice = createSlice({
    name: "signModal",
    initialState,
    reducers: {
        toggleModal(state) {
            state.modalIsShown = !state.modalIsShown
        },
        toggleModalContent(state) {
            state.loginModalStatus = !state.loginModalStatus
            state.signUpModalStatus = !state.signUpModalStatus
        }
    }
})


export const signModalActions = signModalSlice.actions;


