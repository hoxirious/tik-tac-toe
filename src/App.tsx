import firebase from "firebase/app";

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Board from "./components/pages/Board.page";
import Home from "./components/pages/Home.page";
import Lobby from "./components/pages/Lobby.page";
import Waiting from "./components/pages/Waiting.page";
import PlayGround from "./components/PlayGround";
import { firebaseConfig } from "./services/firestore.service";

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  const BASE_HOST = "localhost";
  const FIRESTORE_PORT = 8080;
  const AUTH_PORT = 9099;
  //Initialize an instance of firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }
  firebase.firestore().useEmulator(BASE_HOST, FIRESTORE_PORT);
  firebase.auth().useEmulator(`http://${BASE_HOST}:${AUTH_PORT}`);

} else {
  // production code
}

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/board-size" component={PlayGround} />
        <Route exact path="/board" component={Board} />
        <Route exact path="/lobby" component={Lobby} />
        <Route exact path="/waiting-room" component={Waiting} />
      </Switch>
      <Footer />
    </Router>
  );
};
export default App;
