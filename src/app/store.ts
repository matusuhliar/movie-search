import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import moviesReducer from "../redux/moviesSlice";
import movieReducer from "../redux/movieSlice";

export const store = configureStore({
    reducer: {
        movies: moviesReducer,
        movie: movieReducer,
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
        serializableCheck: false,
    })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;
