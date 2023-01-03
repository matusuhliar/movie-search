import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {
    Link,
    Toolbar
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Star';
import {styles} from './styles';
import {
    Routes,
    Route, useNavigate, matchPath, useLocation
} from "react-router-dom";
import Search from "./features/search/Search";
import Detail from "./features/detail/Detail";
import Favourites from "./features/favourites/Favourites";

const theme = createTheme({
    typography: {
        fontSize: 12,
    },
});

export default function App() {
    const navigate = useNavigate();
    const location = useLocation();
    const isFavourites = matchPath(location.pathname, '/favourites');
    const isSearch = matchPath(location.pathname, '/');


    return (
        <ThemeProvider theme={theme}>
            <Box sx={styles.top}>
                <Toolbar>
                    <Typography component="h1" variant="h5" color="inherit" noWrap sx={{flexGrow: 1, paddingTop: "4px"}}>
                        Movies - Sample Movie Database
                    </Typography>
                </Toolbar>
            </Box>
            <Box sx={styles.main}>
                <Box sx={styles.left}>
                    <Link sx={isSearch?styles.linkSelected:styles.link} onClick={()=>navigate('/')}><SearchIcon/> Search</Link>
                    <Link sx={isFavourites?styles.linkSelected:styles.link} onClick={()=>navigate('/favourites')}><FavoriteIcon/> Favourite</Link>
                </Box>
                <Routes>
                    <Route path="/" element={<Search/>}/>
                    <Route path="/detail/:id" element={<Detail />}/>
                    <Route path="/favourites" element={<Favourites />}/>
                </Routes>
            </Box>
        </ThemeProvider>
    );
}
