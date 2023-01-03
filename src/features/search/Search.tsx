import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
    Divider, Pagination, Paper, TextField
} from "@mui/material";
import {useEffect, useState} from "react";
import {styles} from "../../Styles";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchMoviesAsync, selectMovies, selectMoviesTotalCount} from "../movies/moviesSlice";
import {useNavigate} from "react-router-dom";

export default function Search() {
    const [search, setSearch] = useState("rambo");
    const [page, setPage] = useState(1);
    const movies = useAppSelector(selectMovies);
    const total = useAppSelector(selectMoviesTotalCount);
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchMoviesAsync({search: search, page: page}))
    }, [search, page]);

    const handleChangeText = (e: React.ChangeEvent) => {
        setSearch((e.target as HTMLInputElement).value);
        setPage(1);
    };

    const handleChangePage = (
        event: React.ChangeEvent<unknown>, value: number
    ) => {
        setPage(value);
    };

    const openDetail = (id:string) =>{
        navigate('/detail/'+id)
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
                        Search for movies
                    </Typography>
                    <Divider sx={{my: 1}}/>
                    <TextField id="outlined-basic" fullWidth={true} label="Search" variant="outlined" value={search}
                               onChange={handleChangeText}/>
                    <Divider sx={{my: 1}}/>
                </Box>
                {
                    !movies.length ? null :
                        <Box sx={styles.items}>
                            {
                                movies.map((movie) => (
                                    <Box key={movie.imdbID} sx={styles.item} onClick={()=>openDetail(movie.imdbID)}>
                                        <Box sx={styles.itemImage(movie.Poster)}/>
                                        <Typography sx={styles.itemLabel}>{movie.Title}</Typography>
                                    </Box>
                                ))
                            }
                        </Box>
                }
                {
                    !movies.length ? null :
                        <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px'}}>
                            <Pagination count={Math.ceil(total / 10)} page={page} onChange={handleChangePage}/>
                        </Box>
                }
            </Paper>
        </Box>
    );
}
