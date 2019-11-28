import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.scss';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import BottonNav from './components/BottomNav';
import PetsIcon from '@material-ui/icons/Pets';
import PetPage from './components/PetPage';
import PetForm from './components/Form';
import UserProfile from './components/UserProfile';
import PetProfilePhoto from './components/PetProfilePhoto';
import PetInfo from './components/PetInfo';
import Login from './components/Login';
import PetFavForm from './components/petFavForm';
import Upload from './components/Upload';
//Fixture data

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
 const [userId, setUserId] = useState(undefined)
  console.log('the user id:', userId)

 const handleLogin = function(id){
  setUserId(id)
 }
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
          {userId ?  <DogsNearby 
            petId={otherDogsNearby.petId}
            petName={otherDogsNearby.petName}
            petImg={otherDogsNearby.img}
            petInfo={otherDogsNearby.info}
            /> : <Login onLogin={handleLogin} />}
           
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

// You can think of these components as "pages"
// in your app.
// Added the Upload component for testing 
function DogsNearby(props) {
  const petNameTextStyle = {
    'textAlign': 'center'
  }
  return (
    <div>
      <h2 className="header">DogsNearby</h2>
      <hr></hr>
      <Link to='/login'><LockOpenIcon /></Link>
      <h3 style={petNameTextStyle}>{props.petName}</h3>
      <PetProfilePhoto 
      petId={props.petId}
      petImg={props.petImg}/>
      <PetInfo 
      petInfo={props.petInfo}/>
      <Upload />
    </div>
  );
}

function Profile() {

  const [showForm, setShowForm] = useState(false)
  
  const styles = {
    display: 'flex',
    'justifyContent': 'space-around',
    'alignItems': 'center'
  }
  const hidden = {
    visibility: 'hidden'
  }
  return (
    <div>
      <div style={ styles }className="my-profile-header">
        <PetsIcon style={ hidden }/>
        <h2 className="my-profile-text">My Profile</h2>
        <PetsIcon onClick={()=> setShowForm(true)}/>
    </div>
      <hr></hr>
      {showForm ? <PetForm setShowForm={setShowForm}/> : 
      <UserProfile />
      }
     
    </div>
  );
}

function Notifications() {
  return (
    <div>
      <h2 className="header">Notifications</h2>
      <hr></hr>
      <PetFavForm />  
    </div>
  );
}

function Friends() {
  return (
    <div className="header">
      <h2>Friends</h2>
      <hr></hr>
    </div>
  );
}


