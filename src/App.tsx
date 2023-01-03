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
import {styles} from './Styles';
import {
    Routes,
    Route
} from "react-router-dom";
import Search from "./features/search/Search";

const theme = createTheme({
    typography: {
        fontSize: 12,
    },
});

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={styles.top}>
                <Toolbar>
                    <Typography
                        component="h1"
                        variant="h5"
                        color="inherit"
                        noWrap
                        sx={{flexGrow: 1, paddingTop: "4px"}}
                    >
                        Movies - Sample Movie Database
                    </Typography>
                </Toolbar>
            </Box>
            <Box sx={styles.main}>
                <Box sx={styles.left}>
                    <Link sx={styles.link}><SearchIcon/> Search</Link>
                    <Link sx={styles.link}><FavoriteIcon/> Favourite</Link>
                </Box>
                <Routes>
                    <Route path="/" element={<Search/>}/>
                </Routes>
            </Box>
        </ThemeProvider>
    );
}
