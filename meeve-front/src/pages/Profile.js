import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';
import Layout from '../components/Layout/Layout.js';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from "../assets/img/LOGO.png";

import "../style/pages/Profile.css";
import MeetCards from "../components/profile/MeetCards.js";
import { Link } from 'react-router-dom';

import { useSelector, useDispatch} from 'react-redux';
import {updateIcon} from "../store/navBarStore.js";
import axios from 'axios';
import { useAuth } from '../AuthContext.js';


const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  palette: {
    primary: {
      light: '#00FD90',
      main: '#00FD90',
      dark: '#00FD90',
      contrastText: '#fff',
    },
    secondary: {
      light: '#2d2d2d',
      main: '#2d2d2d',
      dark: '#2d2d2d',
      contrastText: '#000',
    },
    tertiary: {
      light: '#fffbf1',
      main: '#fffbf1',
      dark: '#fffbf1',
      contrastText: '#000',
    },
  },
});

const styles = {

    avatar: {
      width: '100px',
      height: '100px',
      marginBottom: '10px',
      border: '2px solid #1ccf90',
    },
   
};

const Profile = () => {
  
//store
/*const userStore = useSelector((state) => state.user) //get
const dispatch = useDispatch();
dispatch(updateIcon("profile"));*/

const [user, setUser] = useState(null);
const { accessToken } = useAuth();

useEffect(() => {
  const fetchUserProfile = async () => {
    try {
      if (accessToken) {
        const response = await axios.get('https://meeve-express.onrender.com/profile', {
          headers: {
            Authorization: `${accessToken}`,
          },
        });
        setUser(response.data.user); 
      } else {
        console.error('Access token is missing');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  fetchUserProfile();
}, [accessToken]);

  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <div className="ProfileContainer">
        <div className="logo-profile">
                    <img src={logo} alt="logo"></img>
                </div>
          <section className='profileHeaderContainer'>
          <Avatar className='userAvatar'
            alt={user ? user.firstname : ''}
            src={user ? user.profileImage : ''}
            sx={styles.avatar}
          />
          <section className='profileHeaderButtons'>
            <IconButton arial-label = "ManageAccountsOutlinedIcon" component={Link} to="/EditProfile">
              <ManageAccountsOutlinedIcon className='settingsButton'/>
              </IconButton>
          </section>
          <Typography className='userNameProfile' variant="h5">{user ? user.firstname : ''} {user ? user.lastname : ''}</Typography>     
          </section>
          <section className='interactionButtonContainer'>
          <Button variant="contained" endIcon={<AddBoxIcon />} component={Link} to="/CreerMeet">
            Créer un Meet
          </Button>
          {/* <IconButton aria-label="PersonAddOutlinedIcon">
            <PersonAddOutlinedIcon/>
          </IconButton> */}
          </section>
          <section className='userPersonalInfo'>
            <ul className='itemPersonal'>
              <li className='userItem userFriends'>
                <Typography className='itemValue itemButton'>{user ? user.friendCount : ''}</Typography>
                <Button variant="contained" startIcon={<LocalActivityOutlinedIcon />} component={Link} to="/Rewards">
            Voir
          </Button>
              </li>
                <li className='userItem userFavPlace'>
                  <Typography className='itemValue'>{user ? user.favoriteGym : ''} </Typography>
                  <Typography className='itemTitle'> <FmdGoodOutlinedIcon className='itemIcon'></FmdGoodOutlinedIcon> Lieu</Typography>
                </li> 
                <li className='userItem userFavSport'>
                  <Typography className='itemValue'>{user ? user.favoriteSport : ''}</Typography>
                  <Typography className='itemTitle'> <FavoriteBorderOutlinedIcon className='itemIcon'></FavoriteBorderOutlinedIcon>  Sport</Typography>
                </li> 
            </ul>
          </section>

          <section  className='biographySection' >
            <Typography variant="h6" className='biographyTitle' >
              Sur-Moi
            </Typography>
            <Typography variant="body2" className='biographyText'>
              {user ? user.biography : ''}
            </Typography>
          </section>
          <section className='userMeets'>
          <Typography variant="h6" className='meetTitle' >
              Mes Séances
          </Typography>
          <div className='userMeetsCardsContainer'>
          <MeetCards></MeetCards>
          <MeetCards></MeetCards>
          <MeetCards></MeetCards>
          </div>
          </section>
        </div>
      </ThemeProvider>
    </Layout>
  );
};

export default Profile;
