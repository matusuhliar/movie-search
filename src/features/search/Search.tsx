import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
    CircularProgress,
    Divider, Pagination, Paper, TextField
} from "@mui/material";
import {useEffect} from "react";
import {styles} from "../../styles";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {
    clean,
    fetchMoviesAsync,
    selectMovies,
    selectMoviesStatus,
    selectMoviesTotalCount
} from "../../redux/moviesSlice";
import {useNavigate, useSearchParams} from "react-router-dom";
import queryString from "query-string";

export default function Search() {
    const [searchParams] = useSearchParams();
    const search = searchParams.get("s") || ""
    const page = Number(searchParams.get("p")) || 1
    const movies = useAppSelector(selectMovies);
    const total = useAppSelector(selectMoviesTotalCount);
    const status = useAppSelector(selectMoviesStatus);
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(clean())
        dispatch(fetchMoviesAsync({search: search, page: page}))
    }, [search, page, dispatch]);

    const handleChangeText = (e: React.ChangeEvent) => {
        const value = (e.target as HTMLInputElement).value
        navigate('/?' + queryString.stringify({s:value,p:1}))
    };

    const handleChangePage = (
        event: React.ChangeEvent<unknown>, value: number
    ) => {
        navigate('/?' + queryString.stringify({s:search,p:value}))
    };

    const openDetail = (id: string) => {
        navigate('/detail/' + id)
    }

    return (
        <Box sx={styles.right}>
            <Paper elevation={0}>
                <Box>
                    <Typography component="h1" variant="h5" color="inherit" noWrap sx={{flexGrow: 1, paddingTop: "4px"}}>
                        Search for movies
                    </Typography>
                    <Divider sx={{my: 1}}/>
                    <TextField id="outlined-basic" fullWidth={true} label="Search" variant="outlined" value={search} onChange={handleChangeText}/>
                    <Divider sx={{my: 1}}/>
                </Box>
                {
                    movies.length ? null :
                        <Box sx={{flex:1, padding: "10px", color:"#2f2f2f"}}>
                            <Typography component="div" color="inherit" noWrap>
                                {(status==='idle'?<span>No movie found for search phrase "{search}" ...</span>:<CircularProgress />)}
                            </Typography>
                        </Box>
                }
                {
                    !movies.length || status!=='idle' ? null :
                        <Box sx={styles.items}>
                            {
                                movies.map((movie) => (
                                    <Box key={movie.imdbID} sx={styles.item} onClick={() => openDetail(movie.imdbID)}>
                                        <Box sx={styles.itemImage(movie.Poster)}/>
                                        <Typography sx={styles.itemLabel}>{movie.Title}</Typography>
                                    </Box>
                                ))
                            }
                        </Box>
                }
                {
                    !movies.length || status!=='idle' ? null :
                        <Box sx={styles.pagination}>
                            <Pagination count={Math.ceil(total / 10)} page={page} onChange={handleChangePage}/>
                        </Box>
                }
            </Paper>
        </Box>
    );
}
