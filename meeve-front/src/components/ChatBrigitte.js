import { useState } from "react";
import { Link } from "react-router-dom";
import {} from "react-router-dom";
import {
  ChatContainer,
  ConversationHeader,
  Avatar,
  MessageList,
  MessageSeparator,
  Message,
} from "@chatscope/chat-ui-kit-react";
import InputBase from "@mui/material/InputBase";

import avatar2 from "../assets/img/avatar2.jpg";
import logo from "../assets/img/LOGO.png";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../style/pages/ChatList.css";
import { Button } from "@mui/material";

import ChevronLeftSharpIcon from "@mui/icons-material/ChevronLeftSharp";
import SendIcon from "@mui/icons-material/Send";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  palette: {
    primary: {
      light: "#00FD90",
      main: "#00FD90",
      dark: "#00FD90",
      contrastText: "#fff",
    },
    secondary: {
      light: "#2d2d2d",
      main: "#2d2d2d",
      dark: "#2d2d2d",
      contrastText: "#000",
    },
    tertiary: {
      light: "#fffbf1",
      main: "#fffbf1",
      dark: "#fffbf1",
      contrastText: "#000",
    },
  },
});

export default function ChatBrigitte() {
  const [messageText, setMessageText] = useState("");
  const [message, setMessage] = useState("");

  var messages = [];

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage(messageText);
    setMessageText("");
    if (message !== "" && message !== null && message !== undefined) {
      messages.push(message);
    }
    console.log(messages);
    event.target.reset();
  };

  return (
    <div className="chat-container">
      <ThemeProvider theme={theme}>
        <div className="logo-container">
          <img src={logo} alt="Logo" />
        </div>
        <section style={{ height: "100%", marginTop: "5rem" }}>
          <Button
            color="secondary"
            size="small"
            startIcon={<ChevronLeftSharpIcon />}
            component={Link}
            to="/ChatList"
          >
            Retour
          </Button>

          <ChatContainer>
            <ConversationHeader>
              <Avatar src={avatar2} name="Brigitte" />
              <ConversationHeader.Content userName="Brigitte" />
            </ConversationHeader>
            <MessageList>
              {message ? <MessageSeparator content="Aujourd'hui" /> : null}

              {messages.map((message) => {
                return (
                  <Message
                    model={{
                      message: message,
                      direction: "outgoing",
                      position: "last",
                    }}
                  />
                );
              })}

              {message ? <div className="message-bubble">{message}</div> : null}

              <form className="cs-message-input" onSubmit={handleSubmit}>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Ecris ton message ici"
                  inputProps={{ "aria-label": "Ecris ton message ici" }}
                  onChange={(event) => {
                    setMessageText(event.target.value);
                  }}
                />
                <Button
                  type="submit"
                  endIcon={<SendIcon />}
                  disabled={!messageText}
                ></Button>
              </form>
              {/*<Message
              model={{
              message: "Hola",
              sentTime: "15 mins ago",
              direction: "incoming",
              position: "single",
              }}
              ></Message>
              <Message model={{
                message: messageInputValue,
                direction: "outgoing",
                position: "last"
                }}
              />*/}
            </MessageList>
            {/*<MessageInput placeholder="Ecris ton message ici" attachButton={false} onSend={e => handlechange}/>*/}
          </ChatContainer>
        </section>
      </ThemeProvider>
    </div>
  );
}
