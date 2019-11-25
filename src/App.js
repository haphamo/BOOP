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

import PetPage from './components/PetPage';
import PetForm from './components/Form';
import UserProfile from './components/UserProfile';
import PetProfilePhoto from './components/PetProfilePhoto';
import PetInfo from './components/PetInfo';
import PetOnUserPage from './components/PetOnUserPage';

const userData = {
  firstName: 'Maria',
  avatar: 'https://image.flaticon.com/icons/svg/920/920963.svg',
  alt: 'avatar'
}

const petData = {
  petId: '1',
  petName: 'Labber',
  img: 'https://pbs.twimg.com/profile_images/962170088941019136/lgpCD8X4_400x400.jpg',
  info: "I'm a 5 month Labbie and I like to make friends."
}

const otherDogsNearby = {
  petId: '4',
  petName: 'Mikey',
  img: 'https://pbs.twimg.com/media/EKL01x6XkAItDjx.jpg',
  info: "I'm a 2 year old Boxer and I like snow."
}


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
            <DogsNearby 
            petId={otherDogsNearby.petId}
            petName={otherDogsNearby.petName}
            petImg={otherDogsNearby.img}
            petInfo={otherDogsNearby.info}
            />
          </Route>
          <Route path="/profile">
            <Profile 
            />
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
          <PetPage 
          petId={petData.petId}
          petName={petData.petName}
          petImg={petData.img}
          petInfo={petData.petInfo}/>
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

function DogsNearby(props) {
  const petNameTextStyle = {
    'text-align': 'center'
  }
  return (
    <div>
      <h2 class="header">DogsNearby</h2>
      <hr></hr>
      <h3 style={petNameTextStyle}>{props.petName}</h3>
      <PetProfilePhoto 
      petId={props.petId}
      petImg={props.petImg}/>
      <PetInfo 
      petInfo={props.petInfo}/>
    </div>
  );
}

function Profile(props) {
  // const styles = {
  //   display: "flex",
  //   "justify-content": "center"
  // }
  return (
    <div>
      <div class="my-profile-header">
        <h2 class="my-profile-text">My Profile</h2>
      </div>
      <hr></hr>
      <UserProfile 
        userFirstName={userData.firstName}
        userAvatar={userData.avatar}
        petId={petData.petId}
        petName={petData.petName}
        petImg={petData.img}/>
      {/* Add a conditional render on pet image */}
     
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
