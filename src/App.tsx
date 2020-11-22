import React, { useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import RenderLoader from "./components/RenderLoader/RenderLoader";

const Chat = lazy(() => import("./components/Chat/Chat"));
const Login = lazy(() => import("./components/Login/Login"));

const App = () => {
  const [name, setName] = useState<string>("");
  const [chatRoom, setChatRoom] = useState<string>("");
  const [language, setLanguage] = useState<string>("en");

  return (
    <Suspense fallback={RenderLoader("")}>
      <Router>
        <Route
          path="/"
          exact
          render={() => (
            <Login
              setName={setName}
              setChatRoom={setChatRoom}
              setLanguage={setLanguage}
              name={name}
              chatRoom={chatRoom}
              language={language}
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
    </Suspense>
  );
};

export default App;
