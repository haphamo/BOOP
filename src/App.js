import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

import './App.scss';
import BottonNav from './components/BottomNav';
import Upload from './components/Upload';
import PetInfo from './components/PetInfo';
import PetProfilePhoto from './components/PetProfilePhoto';
import PetFav from './components/PetFav';
import PetForm from './components/Form';
import UserProfile from './components/UserProfile';

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
            
            {/* Add a conditional render for a pet profile page */}
          </Route>
          <Route path="/friends">
            <Friends />
            <PetForm />
          </Route>
          <Route path="/notifications">
            <Notifications />
          </Route>
          <Route path="/pets/:id">
            {/* <PetComponent /> */}
          </Route>
        </Switch>
      </div>
      <BottonNav />
    </Router>
  );
}

// const PetComponent = props => {
//   let { id } = useParams()

//   console.log("This was the id", id)
//   useEffect(() => {
//     //axios.get(`/api/pets/${id}`)
//   }, [id])
//   return null
// }

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

function Profile() {
  // const styles = {
  //   display: "flex",
  //   "justify-content": "center"
  // }
  return (
    <div>
      <div class="my-profile-header">
        <h2 class="my-profile-text">My Profile</h2>
        <Upload />  
      </div>
      <hr></hr>
      <UserProfile />
      {/* Add a conditional render on pet image */}
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
