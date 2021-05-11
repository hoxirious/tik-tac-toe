import firebase from "firebase/app";
import "firebase/firestore";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Board from "./components/pages/Board.page";
import { useStoreState } from "./store/hooks.store";
import Home from "./components/pages/Home.page";
import Lobby from "./components/pages/Lobby.page";
import Joining from "./components/pages/Joining";
import PlayGround from "./components/PlayGround";
import { firebaseConfig } from "./services/firestore.service";
import Pending from "./components/pages/Pending.page";

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  const BASE_HOST = "localhost";
  const FIRESTORE_PORT = 8080;
  // Initialize an instance of firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }
  firebase.firestore().useEmulator(BASE_HOST, FIRESTORE_PORT);
} else {
  // production code
}
const App = () => {
  const { playerIds } = useStoreState((store) => {
    return store.boardModel;
  });
  const isRoomReady = (listPlayers: string[]) => {
    return listPlayers.length === 2;
  };
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/board-size" component={PlayGround} />

        {isRoomReady(playerIds) && (
          <Route exact path="/board" component={Board} />
        )}

        {!isRoomReady(playerIds) && (
          <Route exact path="/board" component={Pending} />
        )}

        <Route exact path="/lobby" component={Lobby} />
        <Route exact path="/waiting-room" component={Joining} />
      </Switch>
      <Footer />
    </Router>
  );
};
export default App;
