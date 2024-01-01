import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from '../Layout/Layout';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Button from '@mui/material/Button';
import logo from "../../assets/img/LOGO.png";
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';

//popUpConfirmation
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

//date
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
//heure
import dayjs from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import "../../style/profile/CreerMeet.css";
//place
import Box from '@mui/material/Box';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import parse from 'autosuggest-highlight/parse';
import { debounce } from '@mui/material/utils';
import axios from 'axios';

const GOOGLE_MAPS_API_KEY = 'AIzaSyCPGSHVtCPu2WInyU8cHwsLxhTUnfSqD4E';

// Place api google maps
function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

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

  const CreerMeet = () => {
    
    //popup
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    // sports
    const [sports, setSports] = useState([]);
    const [selectedSport, setSelectedSport] = useState(null);
    //heure
    const [value, setValue] = React.useState(dayjs('2022-04-17T15:30'));
    // google maps
    const [valueM, setValueM] = React.useState(null);
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState([]);
    const loaded = React.useRef(false);

    if (typeof window !== 'undefined' && !loaded.current) {
      if (!document.querySelector('#google-maps')) {
        loadScript(
          `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
          document.querySelector('head'),
          'google-maps',
        );
      }
  
      loaded.current = true;
    }


    useEffect(() => {
      const fetchAllSports = async () => {
        try {
            const res = await axios.get("https://meeveapi.onrender.com/sports")
            setSports(res.data);
        } catch(err) {
            console.log(err)
        }
      }
      fetchAllSports()
    }, [])

    const handleSportChange = (event, value) => {
      setSelectedSport(value);
    }

    // fetch places
    const fetch = React.useMemo(
      () =>
        debounce((request, callback) => {
          autocompleteService.current.getPlacePredictions(request, callback);
        }, 400),
      [],
    );

    React.useEffect(() => {
      let active = true;
  
      if (!autocompleteService.current && window.google) {
        autocompleteService.current =
          new window.google.maps.places.AutocompleteService();
      }
      if (!autocompleteService.current) {
        return undefined;
      }
  
      if (inputValue === '') {
        setOptions(valueM ? [valueM] : []);
        return undefined;
      }
  
      fetch({ input: inputValue }, (results) => {
        if (active) {
          let newOptions = [];
  
          if (valueM) {
            newOptions = [valueM];
          }
  
          if (results) {
            newOptions = [...newOptions, ...results];
          }
  
          setOptions(newOptions);
        }
      });
  
      return () => {
        active = false;
      };
    }, [valueM, inputValue, fetch]);

// soumission du formulaire
    const handleCreateMeet = async () => {
      try{
        if(!selectedSport || !value || !valueM) {
          console.error("Veuillez selectionner un sport, une date, une heure et un lieu.");
          return;
        }

        const meetData = {
          sport_id: selectedSport.id_sport,
          date: value.format('YYYY-MM-DD'),
          time: value.format('HH:mm'),
          location: valueM.description,
          author_id: 1 // recup l'id de l'auteur (id user)
        };
        console.log("Meet Data:", meetData);
        const response = await axios.post("http://localhost:5000/meet", meetData);
        console.log(response.data);

      } catch(err) {
        console.error("Erreur lors de la création du Meet :", err);
      }
    }

    return (
      <Layout>
        <ThemeProvider theme={theme}>
            <div className='creetMeetContainer'>
            <div className="meeve-logo">
                    <img src={logo} alt="logo"></img>
                </div>
                <section className='backButtonToProfile'>
                <IconButton  aria-label="Retour" component={Link} to="/Profile">
                  <ArrowBackIosIcon />
                </IconButton>
                </section>
              <section className='creerMeetFormContainer'>
                <form className='creerMeetForm'>
                <Typography variant="h6" className='mCreerTitle' >
                  Créer Nouveau Meet
                </Typography>
                <Typography variant="body2" className='cMeetPrincipalInfo' >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget 
                </Typography>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={sports}
                  getOptionLabel={(option) => option.name}
                  onChange={handleSportChange}
                  value={selectedSport}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Choisissez un sport" />}
                />
                <section className='datePickerContainer'>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker']}>
                        <DatePicker label="Date" />
                      </DemoContainer>
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['TimePicker', 'TimePicker']}>
                      <TimePicker
                        label="Heure"
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </section>
                <Autocomplete
                    id="google-map-demo"
                    sx={{ width: 300 }}
                    getOptionLabel={(option) =>
                      typeof option === 'string' ? option : option.description
                    }
                    filterOptions={(x) => x}
                    options={options}
                    autoComplete
                    includeInputInList
                    filterSelectedOptions
                    value={valueM}
                    noOptionsText="Ne pas trouvé"
                    onChange={(event, newValue) => {
                      setOptions(newValue ? [newValue, ...options] : options);
                      setValueM(newValue);
                    }}
                    onInputChange={(event, newInputValue) => {
                      setInputValue(newInputValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Lieu" fullWidth />
                    )}
                    renderOption={(props, option) => {
                      const matches =
                        option.structured_formatting.main_text_matched_substrings || [];

                      const parts = parse(
                        option.structured_formatting.main_text,
                        matches.map((match) => [match.offset, match.offset + match.length]),
                      );

                      return (
                        <li {...props}>
                          <Grid container alignItems="center">
                            <Grid item sx={{ display: 'flex', width: 44 }}>
                              <LocationOnIcon sx={{ color: 'text.secondary' }} />
                            </Grid>
                            <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                              {parts.map((part, index) => (
                                <Box
                                  key={index}
                                  component="span"
                                  sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                                >
                                  {part.text}
                                </Box>
                              ))}
                              <Typography variant="body2" color="text.secondary">
                                {option.structured_formatting.secondary_text}
                              </Typography>
                            </Grid>
                          </Grid>
                        </li>
                      );
                    }}
                  />
                            <section className='submitCreerunMeet'>
                            <Button variant="contained" endIcon={<AddBoxIcon />} onClick={handleCreateMeet}>
                              Créer un Meet
                            </Button>
                            </section>
                </form>
              </section>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Creation Meet"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                Votre Meet a été créé.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} component={Link} to="/Profile">
                    Continuer
                </Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
      </Layout>
    );
  };


  
  export default CreerMeet;
  