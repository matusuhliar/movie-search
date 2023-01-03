import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchMovies} from './api';
import {RootState} from "../../app/store";

export interface Movie {
    Title: string,
    Year: number,
    imdbID: string,
    Type: string,
    Poster: string
}

export interface MoviesState {
    movies: Movie[],
    status: 'idle' | 'loading' | 'failed',
    total: number
}

interface SearchRequest {
    search: string,
    page: number
}

const initialState: MoviesState = {
    movies: [],
    status: 'idle',
    total: 0
};

export const fetchMoviesAsync = createAsyncThunk(
    'counter/fetchMovies',
    async (data: SearchRequest) => {
        const {search, page} = data;
        const response = await fetchMovies(search, page);
        return response;
    }
);

export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMoviesAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMoviesAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.movies = (action.payload.data.Search || [])
                state.total = Number((action.payload.data.totalResults || 0))
            })
            .addCase(fetchMoviesAsync.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const {} = moviesSlice.actions;

export const selectMovies = (state: RootState) => state.movies.movies;
export const selectMoviesTotalCount = (state: RootState) => state.movies.total;

export default moviesSlice.reducer;