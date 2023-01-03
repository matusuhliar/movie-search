import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchMovie} from '../app/api';
import {RootState} from "../app/store";

export interface Movie {
    Title: string,
    Year: number,
    Rated: string,
    Released: string,
    Runtime: string,
    Genre: string,
    Director: string,
    Writer: string,
    Actors: string,
    Plot: string,
    Language: string,
    Country: string,
    Awards: string,
    Poster: string,
    Metascore: number,
    imdbRating: number,
    imdbVotes: number,
    imdbID: string,
    Type: string,
    DVD: string,
    BoxOffice: string,
    Production: string,
    Website: string
}

export interface MoviesState {
    movie?: Movie,
    status: 'idle' | 'loading' | 'failed'
}

const initialState: MoviesState = {
    movie: undefined,
    status: 'idle'
};

export const fetchMovieAsync = createAsyncThunk(
    'movies/fetchMovie',
    async (id:string) => {
        return await fetchMovie(id);
    }
);

export const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovieAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMovieAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.movie = action.payload.data
            })
            .addCase(fetchMovieAsync.rejected, (state) => {
                state.status = 'failed';
            });
    },
});



export const selectMovie = (state: RootState) => state.movie.movie;
export const selectMovieLoadStatus = (state: RootState) => state.movie.status;
export default movieSlice.reducer;