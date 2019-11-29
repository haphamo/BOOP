import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.scss';
import BottomNav from './components/BottomNav';
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
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';

//Fixture data

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
            <Notifications userId={userId} />
          </Route>
          <Route path="/pets/:id">
          <PetPage />
          </Route>
        </Switch>
      </div>
      <BottomNav />
    </Router>
  );
}

function DogsNearby(props) {

  const [dogsNearby, setDogsNearby] = useState([])
  // Ha is working on getting getting the index dynamically
  const [currentDogIndex, setCurrentDogIndex] = useState(0)

  useEffect(()=> {
    axios.get(`/api/users/${props.userId}/dashboard`)
    .then(res => {
      setDogsNearby(res.data.result[0])
      setCurrentDogIndex(prev => prev + 1)
      console.log('DogsNearby', res.data.result)
      
    })

    .catch(err => {
      console.log(err)
    })

  }, [])
  
  const petNameTextStyle = {
    'textAlign': 'center'
  }
  
  return (
    <div>
      <h2 className="header">DogsNearby</h2>
      <hr></hr>
        <div key={dogsNearby.owner_id}>
          <h3 style={petNameTextStyle}>{dogsNearby.pet}</h3>
          <em>owner_id: {dogsNearby.owner_id}</em>
          <PetProfilePhoto 
          petId={dogsNearby.pet_id}
          petImg={dogsNearby.photo}
          />
          <PetInfo 
          petInfo={dogsNearby.quirky_fact}
          />
        </div>
        <div className="buttons">
          <ArrowBackRoundedIcon />
          <FavoriteRoundedIcon 
          // { setCurrentDogIndex(prev => prev+1)}
          />

        </div>
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

// Avatar styles for the Notifications and Friends route

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

function Notifications(props) {
  const classes = useStyles();
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    axios.get(`/api/users/${props.userId}/notifications`)
    .then(res => {
      setNotifications(res.data.result)
    }).catch(err => {
      console.log(err)
    })
  }, [props.userId])

  const friendRequests = notifications.map(notification => {
    return (
      <div className="notification-card" key={notification.pet_id}>
        <h2>{notification.owner}</h2>
        <h2>{notification.pet}</h2>
          <div className={classes.root}>
          <Avatar alt={notification.pet} src={notification.pet_photo} className={classes.bigAvatar} />
        <Avatar alt={notification.owner} src={notification.owner_photo} className={classes.bigAvatar} />
          </div>
      </div>
    )
  })

  return (
    <div className="header">
      <h2>Notifications</h2>
      <hr></hr>
      {friendRequests}
    </div>
  );
}

function Friends(props) {
  const classes = useStyles();

  const [friends, setFriends] = useState([])
  useEffect(() => {
    axios.get(`/api/users/${props.userId}/friends`)
    .then(res => {
      setFriends(res.data.result)
    }).catch(err => {
      console.log(err)
    })

  }, [props.userId])

  const furryFriends = friends.map(friend => {
    return (
      <div className="friend-card" key={friend.pet_id}>
      <h2>{friend.owner}</h2>
      <h2>{friend.pet}</h2>
        <div className={classes.root}>
        <Avatar alt={friend.pet} src={friend.pet_photo} className={classes.bigAvatar} />
        <Avatar alt={friend.owner} src={friend.owner_photo} className={classes.bigAvatar} />
        </div>
      </div>
    )
  })
  return (
    <div className="header">
      <h2>Friends</h2>
      <hr></hr>
    {furryFriends}
    </div>
  );
}


