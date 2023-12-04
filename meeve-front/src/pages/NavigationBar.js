import React from 'react';
import { AppBar, Toolbar, IconButton } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PersonIcon from '@mui/icons-material/AccountCircleOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// store
import { useSelector, useDispatch} from 'react-redux';
import {updateIcon} from "../store/navBarStore";
// Personalized Theme
const defaultTheme = createTheme({
  palette: {
    primary: {
      light: '#00FD90',
      main: '#00FD90',
      dark: '#00FD90',
      contrastText: '#fff',
    },
    secondary: {
      light: '#333',
      main: '#333',
      dark: '#333',
      contrastText: '#000',
    },
    terciary: {
      light: '#fffbf1',
      main: '#fffbf1',
      dark: '#fffbf1',
      contrastText: '#000',
    },
  },
});

const NavigationBar = () => {
  
//store
const navStore = useSelector((state) => state.icon) //get
const dispatch = useDispatch();

const handleIconClick = (iconName) => {
  dispatch(updateIcon(iconName));
};

const getIconColor = (iconName) => {
  return navStore.iconName === iconName ? defaultTheme.palette.primary.main : 'white';
};

  return (
    <ThemeProvider theme={defaultTheme}>
    <AppBar position="static" 
    style={{ 
      backgroundColor: defaultTheme.palette.secondary.main, 
      display:'flex', 
      alignItems: 'center',
      borderRadius:'100px',
      width: '95%',
      alignSelf: 'center',
      marginBottom: '2%'
       }}>
      <Toolbar>
        <div className="icon-container">
          <IconButton style={{ color: getIconColor('home'), margin: '0 8px' }}
            component={Link} to="/HomePage" 
            onClick={() => handleIconClick('home')}
            >
            <LocationOnOutlinedIcon sx={{
            fontSize: '2rem'
            }} />
          </IconButton>
        </div>
        <div className="icon-container">
          <IconButton style={{ color: getIconColor('match'), margin: '0 8px' }}
            component={Link} to="/Match"
            onClick={() => handleIconClick('match')}
            >
            <FavoriteBorderOutlinedIcon sx={{
            fontSize: '2rem'}} />
          </IconButton>
        </div>
        <div className="icon-container">
          <IconButton style={{ color: getIconColor('profile'), margin: '0 8px' }}
            component={Link} to="/Profile" 
            onClick={() => handleIconClick('profile')}
            >
            <PersonIcon sx={{
              fontSize: '2rem'}} />
          </IconButton>
        </div>
        <div className="icon-container">
          <IconButton style={{ color: getIconColor('message'), margin: '0 8px' }}
            component={Link} to="/profile"
            onClick={() => handleIconClick('message')}
            >
            <ChatBubbleOutlineOutlinedIcon sx={{
              fontSize: '2rem'}}/>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
    </ThemeProvider>
  );
}

export default NavigationBar;
