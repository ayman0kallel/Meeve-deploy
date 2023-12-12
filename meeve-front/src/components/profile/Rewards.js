//base imports
import React from 'react';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from "../../assets/img/LOGO.png";
import Layout from '../Layout/Layout';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import "../../style/profile/Rewards.css";
import LocalActivityIcon from '@mui/icons-material/LocalActivity';


//popUp
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



//redux
import { useSelector, useDispatch } from 'react-redux'
import { reducePoints} from '../../store/userStore'

//images
import protein from "../../assets/img/gym/myProtein.png";
import basicFit from "../../assets/img/place/basicFit.png";
import fitPark from "../../assets/img/place/fitPark.png";
import keepCool from "../../assets/img/place/keepcool.png";



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

  const Rewards = () => {

//store
const [open, setOpen] = React.useState(false);

const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};
//const userStore = useSelector((state) => state.user.value) // get


const userPoints = useSelector((state) => state.user.points); //get
const dispatch = useDispatch() // set
const [rewards, setRewards] = useState({
    300: { claimed: false, code: null },
    450: { claimed: false, code: null },
    500: { claimed: false, code: null },
    600: { claimed: false, code: null },
  });



  function generateCode() {

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
        
  
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
  
    return code;
  }

  function claimRewards(points) {
    if (userPoints >= points && !rewards[points].claimed) {
      dispatch(reducePoints(points));
      setRewards((prevRewards) => ({
        ...prevRewards,
        [points]: { claimed: true, code: generateCode() },
      }));
    } else {
      handleClickOpen();
    }
  }

  
    return (
      <Layout>
        <ThemeProvider theme={theme}>
          <div className="ChooseSportContainer">
          <section className="logo-editProfile">
            <img src={logo} alt="logo"></img>
          </section>
          <section className='backButton'>
                <IconButton className='arrowButton'  aria-label="Retour" component={Link} to="/profile">
                  <ArrowBackIosIcon/>
                </IconButton>
          </section>
          <section className='SportSelected'>
          <Typography variant="h6" className='title' >Mes récompenses</Typography>
            <Typography variant="h6" className='currentSportSelected' >{userPoints} points</Typography>
          </section>
          <section className='chooseReward'>
            <ul className='itemReward'>
                <li className='userItem RewardSize'         
                 onClick={(e) => {
                  //  setFavoriteSport("Fitness");
                  claimRewards(300);
                }}>
                <div className='rewardsInfoContainer'>
                        {!rewards[300].claimed ? (
                        <>
                            <LocalActivityIcon />
                            <Typography className='itemTitle'>300 points</Typography>
                        </>
                        ) : (
                        <>
                            <Typography className='itemTitle codePromo'>Code promo -50% sur le panier</Typography>
                            <img className='logoPoints' src={keepCool} alt="protein logo" />
                            <Typography className='promo'>{rewards[300].code}</Typography>
                        </>
                        )}
                    </div>
                </li> 
                <li className='userItem RewardSize' onClick={(e) => {
                  //  setFavoriteSport("Poids");
                  claimRewards(450);
                }}>
                <div className='rewardsInfoContainer'>
                        {!rewards[450].claimed ? (
                        <>
                            <LocalActivityIcon />
                            <Typography className='itemTitle'>450 points</Typography>
                        </>
                        ) : (
                        <>
                            <Typography className='itemTitle codePromo'>Code promo -30% sur le panier</Typography>
                            <img className='logoPoints' src={protein} alt="protein logo" />
                            <Typography className='promo'>{rewards[450].code}</Typography>
                        </>
                        )}
                    </div>
                </li> 
                <li className='userItem RewardSize'
                   onClick={(e) => {
                 //   setFavoriteSport("Boxing");
                 claimRewards(500);
                }}>
                <div className='rewardsInfoContainer'>
                        {!rewards[500].claimed  ? (
                        <>
                            <LocalActivityIcon />
                            <Typography className='itemTitle'>500 points</Typography>
                        </>
                        ) : (
                        <>
                            <Typography className='itemTitle codePromo'>Code promo -15% sur le panier</Typography>
                            <img className='logoPoints' src={basicFit} alt="protein logo"/>
                            <Typography className='promo'>{rewards[500].code}</Typography>
                        </>
                        )}
                    </div>
                </li> 
                <li className='userItem RewardSize'
                   onClick={(e) => {
                 //   setFavoriteSport("Boxing");
                 claimRewards(600);
                }}>
                <div className='rewardsInfoContainer'>
                        {!rewards[600].claimed  ? (
                        <>
                            <LocalActivityIcon />
                            <Typography className='itemTitle'>600 points</Typography>
                        </>
                        ) : (
                        <>
                            <Typography className='itemTitle codePromo'>Code promo -10% sur le panier</Typography>
                            <img className='logoPoints' src={fitPark} alt="protein logo"/>
                            <Typography className='promo'>{rewards[600].code}</Typography>
                        </>
                        )}
                    </div>
                </li> 
                
            </ul>
          </section>
          </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Ooops ! vous ne'avez plus points à depenser..."}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                si vous voulez continuer à échanger des points, c
                ontinuez à collecter des Meets
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>
                    Continuer
                </Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
      </Layout>
    );
  };
  
  export default Rewards;