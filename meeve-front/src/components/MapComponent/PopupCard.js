import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import "./popupCardStyle.css"

const theme = createTheme({
  typography: {
    fontfamily: "Futura",
    fontsize: 11,
    fontstyle: "italic",
    fontweight: 500,
    lineheight: 22,
    letterspacing: 0,
    textalign: "left",

  },
  palette: {
    primary: {
      light: '#1ccf90',
      main: '#1ccf90',
      dark: '#1ccf90',
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

const PopupCard = ({ meetInformation }) => {
    
  
    return (
      <div className="popup-card-container">
        <ThemeProvider theme={theme}>
          <Card  className='meetsCardsContainer'>
            <CardActionArea>
              <CardMedia
                component="img"
                height="80"
                image="https://images.pexels.com/photos/28061/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="green iguana"
              />
              <CardContent className='meetCardContent'>
                <Typography className='cardTitle' gutterBottom variant="h6" component="div">
                  {meetInformation.title}
                </Typography>
                <div className="iconText-container">
                  <CalendarMonthIcon />
                  <Typography variant="body2" color="text.secondary"><b>{meetInformation.date}</b></Typography>
                </div>
                <div className="iconText-container">
                  <ScheduleIcon />
                  <Typography variant="body2" color="text.secondary"><b>{meetInformation.time}</b></Typography>
                </div>
                <div className="iconText-container">
                  <LocationOnIcon />
                  <Typography variant="body2" color="text.secondary"><b>{meetInformation.place}</b></Typography>
                </div>
                <div className='button-container'>
                  <button className='button' >goooo!</button>
                </div>
                
              </CardContent>
            </CardActionArea>
          </Card>
        </ThemeProvider>
      </div>
    );
  };

export default PopupCard;
