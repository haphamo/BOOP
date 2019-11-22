import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.scss';
import BottonNav from './components/BottomNav';
import PetInfo from './components/PetInfo';
import PetProfilePhoto from './components/PetProfilePhoto';
import PetFav from './components/PetFav';


export default function App() {
  return (
    <Router>
      <div>

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <DogsNearby />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/friends">
            <Friends />
          </Route>
          <Route path="/notifications">
            <Notifications />
          </Route>
        </Switch>
      </div>
      <BottonNav />
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.

function DogsNearby() {
  return (
    <div>
      <h2 class="header">DogsNearby</h2>
      <hr></hr>
     
    </div>
  );
}

//Must be a nested route in profile to get to pet profile
function Profile() {
  const styles = {
    display: "flex",
    "justify-content": "center"
  }
  return (
    <div>
      <h2 class="header">My Profile</h2>
      <hr></hr>
      <div class="pet-profile-div" >
      <PetProfilePhoto />
      </div>
      
      <PetInfo />
      <PetFav />
      
   
    </div>
  );
}

function Notifications() {
  return (
    <div>
      <h2 class="header">Notifications</h2>
      <hr></hr>
    </div>
  );
}

function Friends() {
  return (
    <div class="header">
      <h2>Friends</h2>
      <hr></hr>
    </div>
  );
}
