import { configureStore } from "@reduxjs/toolkit";
import { menuSlice } from "./menuSlice";
import { signModalSlice } from "./signModalSlice";
import { movieSlice } from "./movieSlice";
import { searchSlice } from "./searchSlice";


const store = configureStore({
    reducer: {
        menu: menuSlice.reducer,
        signModal: signModalSlice.reducer,
        movies: movieSlice.reducer,
        search: searchSlice.reducer
    }
})

export default store;