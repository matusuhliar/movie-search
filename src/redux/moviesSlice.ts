import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchMovies} from '../app/api';
import {RootState} from "../app/store";

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
    'movies/fetchMovies',
    async (data: SearchRequest) => {
        const {search, page} = data;
        return await fetchMovies(search, page);
    }
);

export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        clean(state) {
            state.movies = [];
            state.status = 'idle';
        }
    },
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

export const { clean } = moviesSlice.actions
export const selectMovies = (state: RootState) => state.movies.movies;
export const selectMoviesTotalCount = (state: RootState) => state.movies.total;
export const selectMoviesStatus = (state: RootState) => state.movies.status;
export default moviesSlice.reducer;