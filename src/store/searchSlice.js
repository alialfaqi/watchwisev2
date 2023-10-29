import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { data: [], loading: false, error: "", msg: '' }

export const handleSearch = createAsyncThunk("search/handleSearch", async (query) => {
    let { data } = await axios.get(`https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1&api_key=${import.meta.env.VITE_MOVIEDB_APIKEY}`);
    return data.results
})


export const searchSlice = createSlice({
    name: "search",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(handleSearch.pending, (state) => {
            state.loading = true;
            state.data = []
        });
        builder.addCase(handleSearch.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload
        })
    }
})




