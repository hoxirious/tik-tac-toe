import firebase from "firebase/app";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Board from "./components/pages/Board.page";
import Home from "./components/pages/Home.page";
import PlayGround from "./components/PlayGround";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB46Mwg0lYMJ4BPeCPI0YHSEZcUw4gCL74",
  authDomain: "tic-tac-toe-90fde.firebaseapp.com",
  projectId: "tic-tac-toe-90fde",
  storageBucket: "tic-tac-toe-90fde.appspot.com",
  messagingSenderId: "233177048347",
  appId: "1:233177048347:web:7011c493f11eee6b0b9fbe",
  measurementId: "G-ELV1LSX31C",
};

firebase.initializeApp(firebaseConfig);

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/board-size" component={PlayGround} />
        <Route exact path="/board" component={Board} />
      </Switch>
      <Footer />
    </Router>
  );
};
export default App;
