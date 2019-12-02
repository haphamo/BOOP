import React, { useState, useEffect } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from "axios";

import './App.scss';
import BottomNav from './components/BottomNav';
import PetsIcon from '@material-ui/icons/Pets';
import PetPage from './components/PetPage';
import PetForm from './components/PetForm';
import UserProfile from './components/UserProfile';
import PetProfilePhoto from './components/PetProfilePhoto';
import PetInfoDashboard from './components/petInfoDashboard';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import ClearIcon from '@material-ui/icons/Clear';
import Homepage from './components/Homepage';

export default function App() {
 const [userId, setUserId] = useState(undefined)
 console.log("Current user who is logged in: ", userId)

 const handleLogin = function(id){
  setUserId(id)
 }

 
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
          {userId ?  <DogsNearby 
            userId={userId}
            /> : <Homepage onLogin={handleLogin} />} 
          </Route>
          <Route path="/homepage">
            <Homepage />
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

// This function takes the response from Uploadcare and sends the url to the database
// const onUpload = function(info) {
//   // Save the image to the database
//   axios.post('api/pets/images', {
//     url: info.originalUrl
//   })
// }

// Styling for components below
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
    'justifyContent': 'center',
    'flexDirection': 'row',
    'alignItems': 'center'
  },
  petAvatar: {
    width: 170,
    height: 170,
  },
  largeButton: {
    // transform: 'scale(0.4)'
    height: '20%'
  },
  buttonStyle: {
    justifyContent: 'space-around',
    display: 'flex',
    // height: '300px'
  },
  profileStyles: {
    display: 'flex',
    'justifyContent': 'space-around',
    'alignItems': 'center'
  },
  hidden: {
    visibility: 'hidden'
  }
}))

// Helper functions
const connect = function(userId, receiverId, status, callback){
  axios.post(`api/users/${userId}/notifications`, { receiver_id: receiverId, status: status })
  
  .then(res => {
    callback()
    console.log('res', res)
  })
  .catch(err => {
    console.log(err)
  })
}

const declineFriendRequest = function( userId, receiver_id, status){
  axios.post(`api/users/${userId}/notifications/decline`, { sender_id: receiver_id, status: status })
  .then(res => {
    console.log('res', res)
    
  })
  .catch(err => {
    console.log(err)
  })
}

const acceptFriendRequest = function(userId, receiver_id, status) {
  axios.post(`api/users/${userId}/notifications/accept`, { sender_id: receiver_id, status: status })
  
  .then(res => {
    console.log('res', res)
  })
  .catch(err => {
    console.log(err)
  })
}

// Pets with no connections (PENDING, ACCEPTED, DECLINED)
function DogsNearby(props) {
  const classes = useStyles();
  const [dogsNearby, setDogsNearby] = useState([])
  const [currentDogIndex, setCurrentDogIndex] = useState(0)
  
  useEffect(()=> {
    axios.get(`/api/users/${props.userId}/dashboard`)
    .then(res => {
      setDogsNearby(res.data.result)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])
  
  const petNameTextStyle = {
    'textAlign': 'center'
  }
  const requestConnection = function(ownerId) {
    const callback = () => setCurrentDogIndex(prev => prev+1)
    connect(props.userId, ownerId, 'PENDING', callback)
  }
  const declineConnection = function(ownerId) {
    const callback = () => setCurrentDogIndex(prev => prev+1)
    connect(props.userId, ownerId, 'DECLINED', callback)
   
  }

  return (
    <div>
      <h2 className="header">Nearby</h2>
      <hr></hr>
      { dogsNearby && dogsNearby.length > 0 && dogsNearby[currentDogIndex] ? 
        <div key={dogsNearby[currentDogIndex].owner_id}>
          <h3 style={petNameTextStyle}>{dogsNearby[currentDogIndex].pet}</h3>
          <PetProfilePhoto 
            petId={dogsNearby[currentDogIndex].pet_id}
            petImg={dogsNearby[currentDogIndex].photo}
          />
          <PetInfoDashboard 
            petInfo={dogsNearby[currentDogIndex].quirky_fact}
          />
          <div className={classes.buttonStyle}>

            <input  className={classes.largeButton} type="image" src="https://image.flaticon.com/icons/svg/585/585956.svg" alt="skip" onClick={() => declineConnection(dogsNearby[currentDogIndex].owner_id)}>
            </input>
            <input  className={classes.largeButton} type="image" src="https://image.flaticon.com/icons/svg/585/585962.svg" alt="addFriend" onClick={() => requestConnection(dogsNearby[currentDogIndex].owner_id)}>
            </input>
    
           </div>
        </div> : 
        <small>No More furry friends left !</small> }
    </div>
  );
}

function Profile(props) {
  const classes = useStyles();
  const [showForm, setShowForm] = useState(false)
  const [pet, setPet] = useState({})

  const addNewPet = function(name, age, breed, quirky_fact, userId, profile_photo) {
    const newPet = { name, age, breed, quirky_fact, owner_id: userId, profile_photo }
    axios.post('api/pets', newPet)
    .then(res => {
      console.log("Added a new pet: ", res)
      setPet(pet)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const handleCreatePet = function(){
    setShowForm(false)
  }

  return (
    <div>
      <div className={ classes.profileStyles }>
        <PetsIcon className={ classes.hidden }/>
        <h2 className="my-profile-text">My Profile</h2>
        <PetsIcon onClick={()=> setShowForm(true)}/>
    </div>
    
      {showForm ? <PetForm setShowForm={setShowForm} userId={props.userId} onAddPet={addNewPet} handleCreatePet={handleCreatePet}/> : 
      <UserProfile userId={props.userId} />}
    </div>
  )
}

// PENDING Friend Requests
function Notifications(props) {
  const classes = useStyles();
  const [notifications, setNotifications] = useState([])

  const declineRequest = function(userId, receiver_id) {
    declineFriendRequest(userId, receiver_id, 'DECLINED')
    reRender()
  }

   const acceptRequest = function(userId, receiver_id){
    acceptFriendRequest(userId, receiver_id, 'ACCEPTED')
    reRender()
  }


  const reRender = function(){
    axios.get(`/api/users/${props.userId}/notifications`)
    .then(res => {
      setNotifications(res.data.result)
      
    }).catch(err => {
      console.log(err)
    })
  }

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
        <div className={classes.root}>
          <Avatar alt={notification.pet} src={notification.pet_photo} className={classes.petAvatar} />
          <div className="right-side">
            <h4>{notification.owner} and {notification.pet} want to connect with you.</h4>
            <div className={classes.buttonStyle}>
              <ClearIcon className={classes.largeButton} onClick={()=> declineRequest(props.userId, notification.receiver_id)}/>
              <PetsIcon className={classes.largeButton} onClick={()=> acceptRequest(props.userId, notification.receiver_id)}/>
            </div>
          </div>
        </div>
      </div>
    )
  })

  return (
    <div className="header">
      <h2>Notifications</h2>
      <hr></hr>
      <div className="container">
      {friendRequests}
      </div>
    </div>
  );
}

// ACCEPTED Friend Requests
function Friends(props) {
  const classes = useStyles()
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
        <div className={classes.root}>
          <Link to={`/pets/${friend.pet_id}`} ><Avatar alt={friend.pet} src={friend.pet_photo} className={classes.bigAvatar} /></Link>
          <h4>{friend.owner} and {friend.pet}</h4>
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
  )
}


