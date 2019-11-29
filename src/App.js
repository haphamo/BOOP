import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.scss';
import BottonNav from './components/BottomNav';
import PetsIcon from '@material-ui/icons/Pets';
import PetPage from './components/PetPage';
import PetForm from './components/Form';
import UserProfile from './components/UserProfile';
import PetProfilePhoto from './components/PetProfilePhoto';
import PetInfo from './components/PetInfo';
import Login from './components/Login';
import PetFavForm from './components/petFavForm';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

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
            userId={userId}
            /> : <Login onLogin={handleLogin} />}
           
          </Route>
          <Route path="/profile">
            <Profile userId={userId}/>
          </Route>
          <Route path="/friends">
            <Friends userId={userId}/>
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

function DogsNearby(props) {

  axios.get(`/api/users/:id/dashboard`)
  .then(res => {
    console.log('DogsNearby',res.data.result)
  })
  const petNameTextStyle = {
    'textAlign': 'center'
  }

  axios.get(`/api/users/${props.userId}/dashboard`)
  .then(res => {
    console.log(res)
  })

  return (
    <div>
      <h2 className="header">DogsNearby</h2>
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
      <UserProfile userId={props.userId} />}
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


// Avatar styles for the friends route

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
}));

function Friends(props) {
  const classes = useStyles();

  const [username, setUsername] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [petNames, setPetNames] = useState('')
  const [petAvatars, setPetAvatars] = useState('')

  axios.get(`/api/users/${props.userId}/friends`)
  .then(res => {
    console.log('friends', res.data.result[0])
    setUsername(res.data.result[0].owner)
    setUserAvatar(res.data.result[0].owner_photo)
    setPetNames(res.data.result[0].pet)
    setPetAvatars(res.data.result[0].pet_photo)
  })

  
  return (
    <div className="header">
      <h2>Friends</h2>
      <hr></hr>
      <div className="friend-card">
      <h2>{username}</h2>
      <h2>{petNames}</h2>
      <div className={classes.root}>
      <Avatar alt={petNames} src={petAvatars} className={classes.bigAvatar} />
      <Avatar alt={username} src={userAvatar} className={classes.bigAvatar} />

    </div>
      </div>
    </div>
  );
}


