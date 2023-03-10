import * as React from 'react';
import Box from '@mui/material/Box';
import {Button, Divider} from "@mui/material";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchMovieAsync, selectMovie, selectMovieLoadStatus} from "../../redux/movieSlice";
import {LOCAL_STORAGE_KEY} from "../../app/constants";
import {useNavigate, useParams} from "react-router-dom";
import {styles} from "../../styles";
import Typography from "@mui/material/Typography";
import {
    ArrowBack, Star
} from "@mui/icons-material";

export default function Detail() {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const movie = useAppSelector(selectMovie);
    const status = useAppSelector(selectMovieLoadStatus);
    useEffect(() => {
        dispatch(fetchMovieAsync(id || ""))
    }, [id, dispatch]);

    const inLocalStorage = (id: string) => {
        let items = localStorage.getItem(LOCAL_STORAGE_KEY) || "{}"
        if (items) {
            items = JSON.parse(items);
            return id in (items as Object);
        }
        return false;
    }
    const [inStorage, setInStorage] = useState(inLocalStorage(id || ""));

    const addToFavourites = (obj: any) => {
        let itemsStr = localStorage.getItem(LOCAL_STORAGE_KEY)
        let items: any = {};
        if (itemsStr) {
            items = JSON.parse(itemsStr);
        }
        if (items[obj.imdbID]) {
            delete items[obj.imdbID]
        } else {
            items[obj.imdbID] = obj;
        }
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items))
        setInStorage(inLocalStorage(obj.imdbID));
    }

    if (movie && status==='idle') {
        return (
            <Box sx={styles.right}>
                <Box sx={styles.detail}>
                    <Typography
                        component="h2"
                        variant="h4"
                        color="inherit"
                        noWrap
                        sx={{paddingTop: "4px", width: '100%', display:'flex'}}
                    >
                        <Box>{movie['Title']}</Box>

                    </Typography>
                    <Divider sx={{my: 1}}/>
                    <Button variant="text" startIcon={<ArrowBack />} onClick={()=>navigate(-1)}>
                        Back
                    </Button>
                    <Button color={!inStorage?"primary":"secondary"} variant="text" startIcon={<Star />} onClick={()=>addToFavourites(movie)}>
                        {inStorage?"Remove From Favorite":"Add To Favorite"}
                    </Button>
                    <Divider sx={{my: 1}}/>
                    <Box sx={styles.itemImage(movie.Poster)}/><br/>
                    <Box>{movie['Plot']}</Box><br/>
                    <Box>
                        <Box>
                            <Box><b>Actors:</b> {movie['Actors']}</Box>
                            <Box><b>Awards:</b> {movie['Awards']}</Box>
                            <Box><b>Box Office:</b> {movie['BoxOffice']}</Box>
                            <Box><b>Country:</b> {movie['Country']}</Box>
                            <Box><b>DVD:</b> {movie['DVD']}</Box>
                            <Box><b>Director:</b> {movie['Director']}</Box>
                            <Box><b>Genre:</b> {movie['Genre']}</Box>
                            <Box><b>Language:</b> {movie['Language']}</Box>
                            <Box><b>Meta score:</b> {movie['Metascore']}</Box>
                            <Box><b>Production:</b> {movie['Production']}</Box>
                            <Box><b>Rated:</b> {movie['Rated']}</Box>
                            <Box><b>Released:</b> {movie['Released']}</Box>
                            <Box><b>Runtime:</b> {movie['Runtime']}</Box>
                            <Box><b>Type:</b> {movie['Type']}</Box>
                            <Box><b>Website:</b> {movie['Website']}</Box>
                            <Box><b>Writer:</b> {movie['Writer']}</Box>
                            <Box><b>Year:</b> {movie['Year']}</Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        )

    } else {
        return null;
    }
}
