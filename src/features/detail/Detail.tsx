import * as React from 'react';
import Box from '@mui/material/Box';
import {
    Paper
} from "@mui/material";
import {useEffect, useState} from "react";

import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchMovieAsync, selectMovie} from "../movies/movieSlice";
import {LOCAL_STORAGE_KEY} from "../../app/constants";
import {StarBorder} from "@mui/icons-material";
import {useParams} from "react-router-dom";
import {styles} from "../../Styles";

export default function Detail(props: any) {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const movie = useAppSelector(selectMovie);
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


    if (movie) {
        return (
            <Box sx={styles.right}>

                <Box>
                    <h2 style={{paddingTop:'0px'}}>{movie.Title} <StarBorder color={inStorage ? "primary" : "secondary"}
                                                  onClick={() => addToFavourites({
                                                      imdbID: movie.imdbID,
                                                      Title: movie.Title,
                                                      Year: movie.Year,
                                                      Poster: movie.Poster
                                                  })}/></h2>
                    <Box sx={styles.itemImage(movie.Poster)}/><br/>
                    <Box>{movie['Plot']}</Box><br/>
                    <Box>
                        <Box>
                            <Box><b>Actors:</b>{movie['Actors']}</Box>
                            <Box><b>Awards:</b>{movie['Awards']}</Box>
                            <Box><b>BoxOffice:</b>{movie['BoxOffice']}</Box>
                            <Box><b>Country:</b>{movie['Country']}</Box>
                            <Box><b>DVD:</b>{movie['DVD']}</Box>
                            <Box><b>Director:</b>{movie['Director']}</Box>
                            <Box><b>Genre:</b>{movie['Genre']}</Box>
                            <Box><b>Language:</b>{movie['Language']}</Box>
                        </Box>
                        <Box className={"right"}>
                            <Box><b>Metascore:</b>{movie['Metascore']}</Box>
                            <Box><b>Production:</b>{movie['Production']}</Box>
                            <Box><b>Rated:</b>{movie['Rated']}</Box>
                            <Box><b>Released:</b>{movie['Released']}</Box>
                            <Box><b>Runtime:</b>{movie['Runtime']}</Box>
                            <Box><b>Type:</b>{movie['Type']}</Box>
                            <Box><b>Website:</b>{movie['Website']}</Box>
                            <Box><b>Writer:</b>{movie['Writer']}</Box>
                            <Box><b>Year:</b>{movie['Year']}</Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        )

    } else {
        return null;
    }
}
