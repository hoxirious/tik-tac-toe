import PlayGround from "./components/PlayGround";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from "firebase/app";
import React from "react";
import Home from "./components/pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/3x3" exact>
          <PlayGround />
        </Route>
        {/* <Route path="/4x4" exact>
          <PlayGround />
        </Route> */}
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
