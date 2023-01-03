import * as React from 'react';
import Box from '@mui/material/Box';
import {
    Button, Divider,
    Paper
} from "@mui/material";
import {useEffect, useState} from "react";

import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchMovieAsync, selectMovie} from "../movies/movieSlice";
import {LOCAL_STORAGE_KEY} from "../../app/constants";
import {StarBorder} from "@mui/icons-material";
import {useParams} from "react-router-dom";
import {styles} from "../../Styles";
import Typography from "@mui/material/Typography";

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

                <Box sx={{width: '100%'}}>
                    <Typography
                        component="h2"
                        variant="h4"
                        color="inherit"
                        noWrap
                        sx={{paddingTop: "4px", width: '100%'}}
                    >{movie.Title}

                        <Box sx={{
                                border: "1px solid silver",
                                display: 'inline-block',
                                height: '30px',
                                float: 'right',
                                color: 'white',
                                fontSize:'12px',
                                borderRadius: '3px',
                                cursor: 'pointer',
                                background:inStorage?"#2f2f2f":"gray",
                                paddingRight:"20px"
                            }}
                            onClick={() => addToFavourites({
                                imdbID: movie.imdbID,
                                Title: movie.Title,
                                Year: movie.Year,
                                Poster: movie.Poster
                            })}
                        >
                            <StarBorder sx={{
                                position: 'relative',
                                left: '4px',
                                top: '4px',
                                marginRight:'10px',
                                color: 'yellow'
                            }}
                            /> {inStorage?'Remove from':'Add to'} Favorites
                        </Box>
                    </Typography>
                    <Divider sx={{my: 1}}/>
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
