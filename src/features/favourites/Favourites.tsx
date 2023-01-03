import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
    Divider, Paper
} from "@mui/material";
import {styles} from "../../Styles";
import {LOCAL_STORAGE_KEY} from "../../app/constants";
import {useNavigate} from "react-router-dom";

export default function Favourites() {
    let moviesStr = localStorage.getItem(LOCAL_STORAGE_KEY)
    const navigate = useNavigate();
    let movies: any = [];
    if (moviesStr) {
        const moviesParsed = JSON.parse(moviesStr)
        movies = Object.keys(moviesParsed).map(k => moviesParsed[k])
    }
    const openDetail = (id: string) => {
        navigate('/detail/' + id)
    }

    return (
        <Box sx={styles.right}>
            <Paper elevation={0}>
                <Box>
                    <Typography
                        component="h1"
                        variant="h5"
                        color="inherit"
                        noWrap
                        sx={{flexGrow: 1, paddingTop: "4px"}}
                    >
                        Favorites
                    </Typography>
                    <Divider sx={{my: 1}}/>
                </Box>
                {
                    !movies.length ? null :
                        <Box sx={styles.items}>
                            {
                                movies.map((movie: any) => (
                                    <Box key={movie.imdbID} sx={styles.item} onClick={() => openDetail(movie.imdbID)}>
                                        <Box sx={styles.itemImage(movie.Poster)}/>
                                        <Typography sx={styles.itemLabel}>{movie.Title}</Typography>
                                    </Box>
                                ))
                            }
                        </Box>
                }
            </Paper>
        </Box>
    );
}
