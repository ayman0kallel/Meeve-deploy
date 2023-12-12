//base imports
import React from 'react';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from "../../assets/img/LOGO.png";
import Layout from '../Layout/Layout';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import "../../style/profile/EditProfile.css";
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

//redux
import { useSelector, useDispatch } from 'react-redux'
import { updateUsername, updateBiography, updateFavoriteGym, updateFavoriteSport } from '../../store/userStore'

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
        width: '90px',
        height: '90px',
        marginBottom: '10px',
        border: '2px solid #1ccf90',
      },
     
  };

  const EditProfile = () => {

//store
const userStore = useSelector((state) => state.user) //get
const dispatch = useDispatch() // set

//form control
const [formData, setFormData] = useState({
  prenom: '',
  nom: '',
  email: '',
  biography: '',
});

const handleInputChange = (event) => {
  const { id, value } = event.target;
  setFormData({ ...formData, [id]: value });
};


    const userProfile = {
      username: 'User Name',
      profileImage: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      favoriteGym: 'Basic Fit',
      favoriteSport:'Fitness',
      friendsCount: 50,
      biography:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget lorem eu purus feugiat ullamcorper. Vivamus nec quam ut erat malesuada tincidunt in non libero.',
    };
    return (
      <Layout>
        <ThemeProvider theme={theme}>
          <div className="EditProfileContainer">
          <section className="logo-editProfile">
            <img src={logo} alt="logo"></img>
          </section>
          <section className='backButton'>
                <IconButton className='arrowButton'  aria-label="Retour" component={Link} to="/Profile">
                  <ArrowBackIosIcon/>
                </IconButton>
          </section>
          <section className='editProfileHeaderContainer'>
          <Avatar
            alt={userProfile.username}
            src={userProfile.profileImage}
            sx={styles.avatar}
          />  
          </section>
          <section className='modifPersonalInfoContainer'>
            <form className='editProfileForm'>
                <section className='editPersonalInfoContainer'>
                    <Typography variant="h6" className='title' >
                        Informations personelles
                    </Typography>
                    <TextField className='prenomContainer' id="prenom" label="Prénom" value={formData.prenom} onChange={handleInputChange} variant="outlined" />
                    <TextField className='nomContainer' id="nom" label="Nom" value={formData.nom} onChange={handleInputChange}  variant="outlined" />
                    <TextField className='emailContainer' id="email" label="Email" value={formData.email} onChange={handleInputChange}  variant="outlined" />
                </section>
                <section className='description'>
                    <Typography variant="h6" className='title' >
                        Sur Moi
                    </Typography>
                    <TextField
                      className='aboutMe'
                      id="biography"
                      label="ce que j'aime bien..."
                      multiline
                      rows={2}
                      value={formData.biography} 
                      onChange={handleInputChange} 
                      variant="filled"
                    />
                </section>
                <section className='editFavoirs'>
                     <Typography variant="h6" className='title' >
                        Favoris
                    </Typography>
                    <ul className='itemPersonal'>
                    <li className='userItem userFavPlace' >
                        <Link to="/ChoosePlace" style={{ textDecoration: 'none' }}>
                        <Typography className='itemValue'>{userStore.favoriteGym}</Typography>
                        <Typography className='itemTitle'> <FmdGoodOutlinedIcon className='itemIcon'></FmdGoodOutlinedIcon> Lieu</Typography>
                        </Link>
                    </li> 
                        <li className='userItem userFavSport'>
                        <Link to="/ChooseSport" style={{ textDecoration: 'none' }}>
                        <Typography className='itemValue'>{userStore.favoriteSport}</Typography>
                        <Typography className='itemTitle'> <FavoriteBorderOutlinedIcon className='itemIcon'></FavoriteBorderOutlinedIcon>  Sport</Typography>
                        </Link>
                        </li> 
                    </ul>
                </section>
                <section className='buttonModfiContainer'>
                <Button className='modifProfile' variant="contained" component={Link} to="/Profile"
                  onClick={() => {
                    if(!formData.prenom == ""){
                      dispatch(updateUsername(formData.prenom));
                    } 
                    if (!formData.biography == ""){
                      dispatch(updateBiography(formData.biography));
                    }
                  }}
                >
                    Modifier
                </Button>
                </section>
            </form>
          </section>
          </div>
        </ThemeProvider>
      </Layout>
    );
  };
  
  export default EditProfile;