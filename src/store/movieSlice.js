import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { data: [], loading: false, error: "", trendingMovies: [], itemDetails: {}, movieGenres: [], tvGenres: [] };

//async action
export const getTrending = createAsyncThunk("movies/getTrending", async () => {
    let { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${import.meta.env.VITE_MOVIEDB_APIKEY}`
    );
    return data.results;
});

export const getItemDetails = createAsyncThunk("media/getItemDetails", async ({ media_type, id }) => {
    const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${import.meta.env.VITE_MOVIEDB_APIKEY}&language=en-US`
    );
    return data
})

export const getMovieGenres = createAsyncThunk("movies/getMovieGenres", async () => {
    const { data } = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_MOVIEDB_APIKEY}&language=en-US`
    )
    const genres = data.genres.map((genre) => genre.name)
    return genres
})
export const getTvGenres = createAsyncThunk("movies/getTvGenres", async () => {
    const { data } = await axios.get(
        `https://api.themoviedb.org/3/genre/tv/list?api_key=${import.meta.env.VITE_MOVIEDB_APIKEY}&language=en-US`
    )
    const genres = data.genres.map((genre) => genre.name)
    return genres
})




// Generate pending, fulfilled , rejected action type

export const movieSlice = createSlice({
    name: "movies",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getTrending.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getTrending.fulfilled, (state, action) => {
            state.loading = false;
            state.trendingMovies = action.payload;
        });
        builder.addCase(getTrending.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(getItemDetails.pending, (state) => {
            state.loading = true;
            state.itemDetails = {}; // Clear itemDetails before making the request
        });
        builder.addCase(getItemDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.itemDetails = action.payload
        });
        builder.addCase(getMovieGenres.fulfilled, (state, action) => {
            state.movieGenres = action.payload;
        });
        builder.addCase(getTvGenres.fulfilled, (state, action) => {
            state.tvGenres = action.payload
        })
    }
});


