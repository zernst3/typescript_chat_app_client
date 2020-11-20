import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Chat from "./components/Chat/Chat";
import Login from "./components/Login/Login";

const App = () => {
  const [name, setName] = useState<string>("");
  const [chatRoom, setChatRoom] = useState<string>("");
  const [language, setLanguage] = useState<string>("English");

  return (
    <Router>
      <Route
        path="/"
        exact
        render={() => (
          <Login
            setName={setName}
            setChatRoom={setChatRoom}
            setLanguage={setLanguage}
          />
        )}
      />
      <Route
        path="/chat"
        render={() => (
          <Chat name={name} chatRoom={chatRoom} language={language} />
        )}
      />
    </Router>
  );
};

export default App;
