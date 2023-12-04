import "./carteStyle.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { Icon, divIcon, point } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import PopupCard from "./PopupCard";
import logo from "../../assets/img/LOGO.png";
import LocationOn from "../../assets/img/Location-on.png";
import LocationOff from "../../assets/img/Location-off.png";
import { useEffect, useState } from "react";
import {Drawer, Fab, IconButton, Typography } from "@mui/material";
import TuneIcon from '@mui/icons-material/Tune';
import CloseIcon from '@mui/icons-material/Close';
import basicFit from "../../assets/img/gym/basicFit.png"
import fitPark from "../../assets/img/gym/fitpark.png"
import keepCool from "../../assets/img/gym/keepCool.png"
import lappartFit from "../../assets/img/gym/lappartFit.png"

export default function CarteComponent() {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isFilterDialogOpen, setFilterDialogOpen] = useState(false);
  const [selectedSportButton, setSelectedSportButton] = useState(null);
  const [clickedSportBtn, setClickedSportBtn] = useState([]);
  const [clickedTimeBtn, setClickedTimeBtn] = useState([]);
  const [clickedLocationBtn, setClickedLocationBtn] = useState([]);

  const sportsList = ['Fitness', 'Boxe', 'Running', 'Yoga', 'Muscu', 'Tennis'];
  const horaireList = ['06-08h', '08-10h', '10-12h', '12-14h', '14-16h', '16-18h', '18-20h', '20-22h', '22-00h'];
  const gymList = {'basicFit':basicFit, 'fitPark':fitPark,'keepCool': keepCool, 'lappartFit': lappartFit};
  function MapComponent(){
    useMapEvents({
      click(){
        setSelectedMarker(false);
      }
    })
    return null
  }
  const handleSportButtonClick = (index) => {
    const updatedButtons = [...clickedSportBtn];
    updatedButtons[index] = !updatedButtons[index];

    setClickedSportBtn(updatedButtons)
  };
  const handleTimeButtonClick = (index) => {
    const updatedButtons = [...clickedTimeBtn];
    updatedButtons[index] = !updatedButtons[index];

    setClickedTimeBtn(updatedButtons)
  };
  const handleLocationButtonClick = (index) => {
    const updatedButtons = [...clickedLocationBtn];
    updatedButtons[index] = !updatedButtons[index];

    setClickedLocationBtn(updatedButtons)
  };
  //filter function
  const filterMeetInformation = (meetInfo) => {
    const sportFilterActive = clickedSportBtn.some(btn =>btn);
    const timeFilterActive = clickedTimeBtn.some(btn => btn);
    const locationFilterActive = clickedLocationBtn.some(btn => btn);

    if (sportFilterActive){
      if (!clickedSportBtn[sportsList.indexOf(meetInfo.title)]){
        return null;
      }
    }

    if (timeFilterActive) {
      if (!clickedTimeBtn[horaireList.indexOf(meetInfo.time)]) {
        return null;
      }
    }
    if (locationFilterActive) {
      if (!clickedLocationBtn[Object.keys(gymList).indexOf(meetInfo.place)]) {
        return null;
      }
    }

    return meetInfo;
  }
  useEffect(() => {
    // Get the user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  }, []);

  if (!userLocation) {
    return <div>Refresh...</div>;
  }

  //markers
  const markers = [
    {
      geocode: userLocation,
      popup: "popup 1",
    },
    {
      geocode: [45.7400, 4.8760],
      popup: "popup 2",
    }
  ];

  const LocationOffIcon = new Icon({
    iconUrl: LocationOff,
    iconSize: [38, 38],
  });
  const LocationOnIcon = new Icon({
    iconUrl: LocationOn,
    iconSize: [38, 38],
  });
  const meetInformation = {
    title: 'Fitness',
    image: 'https://images.pexels.com/photos/28061/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'Vendredi 12 Juillet',
    time: '10-12h',
    place: 'basicFit',
    creator: 'Davis',
  };

  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true),
    });
  };

  const handleMarkerClick = (index) => {
    setSelectedMarker(index);
  };

  const resetSelectedMarker = () => {
    setSelectedMarker(null);
  };

  const handleClickFilterOpen = () => {
    setFilterDialogOpen(true);
  };
  
  const handleCloseFilterDialog = () => {
    setFilterDialogOpen(false);
  };

  return (
      <MapContainer center={userLocation} zoom={13}>
        <MapComponent/>
        <div className="logo-container">
          <img src={logo} alt="Logo" />
        </div>
        {!isFilterDialogOpen && (
          <Fab onClick={handleClickFilterOpen}  style={{ backgroundColor: '#00FD90' }} className="group-container" >
          <TuneIcon/>
        </Fab>
        )}
        <Drawer 
          anchor="top" 
          open={isFilterDialogOpen} 
          onClose={handleCloseFilterDialog} 
          variant="temporary" 
          PaperProps={{
            sx: {
              borderRadius:'0 0 25px 25px',
              backgroundColor: '#fffbf1',
              zIndex: 1000
            }
          }}
        >
          <div className="logo-container">
            <img src={logo} alt="Logo" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '8px' }}>
                <IconButton onClick={handleCloseFilterDialog} style={{ fontSize: '2rem', color: '#333' }}>
                  <CloseIcon style={{ fontSize: '2.5rem' }} />
                </IconButton>
          </div>
          <section  className='filterSection' >
            <Typography variant="h6" className='filterTitle' >
              Sport
            </Typography>
          </section>
          <div className="sportButtons">
            {sportsList.map((sport, index) => (
              <button
                key={index}
                variant="contained"
                className={`sportButtons bn37 ${clickedSportBtn[index] ? 'clicked' : ''}`}
                onClick={() => handleSportButtonClick(index)}
              >
                {sport}
              </button>
            ))}
          </div>

          <section  className='filterSection' >
            <Typography variant="h6" className='filterTitle' >
              Horaire
            </Typography>
          </section>
          <div className="sportButtons">
            {horaireList.map((horaire, index) => (
              <button
                key={index}
                variant="contained"
                className={`sportButtons bn37 ${clickedTimeBtn[index] ? 'clicked' : ''}`}
                onClick={() => handleTimeButtonClick(index)}
              >
                {horaire}
              </button>
            ))}
          </div>
          <section  className='filterSection' >
            <Typography variant="h6" className='filterTitle' >
              Lieu
            </Typography>
          </section>
          <div className="sportButtons" style={{marginBottom:"10%"}}>
            {Object.keys(gymList).map((gymName, index) => (
              <button
                key={index}
                variant="contained"
                className={`sportButtons bn37 ${clickedLocationBtn[index] ? 'clicked' : ''}`}
                onClick={() => handleLocationButtonClick(index)}
              >
                <img src={gymList[gymName]} alt={gymName} />
              </button>
            ))}
          </div>
          
        </Drawer>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright"> OpenStreetMap </a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup chunkedLoading iconCreateFunction={createCustomClusterIcon}>
          
          {markers.map((marker, index) => {
            const filteredMeetInfo = filterMeetInformation(meetInformation);
            if (filteredMeetInfo) {
              return (
                <Marker 
                position={marker.geocode} 
                icon={selectedMarker === index ? LocationOnIcon : LocationOffIcon} 
                key={index} 
                eventHandlers={{click: () => handleMarkerClick(index)}}
                >
                  <Popup closeButton={false}>
                    <PopupCard meetInformation={meetInformation}/>
                  </Popup>
                </Marker>
              )}
              return null;
          }
          )}
        </MarkerClusterGroup>
      </MapContainer>
  );
}
