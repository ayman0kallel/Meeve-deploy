import Layout from "../components/Layout/Layout";
import Typography from '@mui/material/Typography';
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import { useNavigate } from "react-router";
import avatar1 from "../assets/img/avatar1.jpg";
import avatar2 from "../assets/img/avatar2.jpg";
import avatar3 from "../assets/img/avatar3.jpg";
import logo from "../assets/img/LOGO.png";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "../style/pages/ChatList.css";
import { Stack } from "@mui/material";

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

let userList = [
  {
    id: '1',
    name: "Emmanuel",
    avatar: avatar1,
  },
  {
    id: '2',
    name: "Brigitte",
    avatar: avatar2,
  },
  {
    id: '3',
    name: "Joe",
    avatar: avatar3,
  },

];

export default function ChatList() {

  const navigate = useNavigate();
  const Emmanuel = () => navigate('/Chat-Emmanuel');
  const Brigitte = () => navigate('/Chat-Brigitte');
  const Joe = () => navigate('/Chat-Joe');

  return (

    <Layout>
      <ThemeProvider theme={theme}>
        <div className="logo-container">
          <img src={logo} alt="Logo" />
        </div>
        <section style={{ height: "100%", marginTop: "5rem", }}
        >
          <Typography className='page-title' variant="h6" color="text.secondary-dark">Mes messages</Typography>

          <div>
            <div className="cs-conversation" onClick={Emmanuel}>
              <Avatar src={avatar1} width="50" height="50" />
              <Stack>
                <Typography variant="subtitle2" color="text.secondary-dark">Emmanuel</Typography>
                <Typography className="chat-list-info" variant="body2" color="text.secondary">On va faire du sport ?</Typography>
              </Stack>
              
            </div>
            <div className="cs-conversation" onClick={Brigitte}>
              <Avatar src={avatar2} width="50" height="50" />
              <Stack>
                <Typography variant="subtitle2" color="text.secondary-dark">Brigitte</Typography>
                <Typography className="chat-list-info" variant="body2" color="text.secondary">On va faire du sport ?</Typography>
              </Stack>
              
            </div>
            <div className="cs-conversation" onClick={Joe}>
              <Avatar src={avatar3} width="50" height="50" />
              <Stack>
                <Typography variant="subtitle2" color="text.secondary-dark">Joe</Typography>
                <Typography className="chat-list-info" variant="body2" color="text.secondary">On va faire du sport ?</Typography>
              </Stack>
              
            </div>
          </div>
        </section>
      </ThemeProvider>
    </Layout>
  );
}
