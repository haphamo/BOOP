import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PetsOnUserPage from './PetOnUserPage';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
    'justifyContent': 'center',
    'flexDirection': 'column',
    'alignItems': 'center',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    padding: '0 10px',
  
  },
  bigAvatar: {

    width: 'auto%',
    height: '20vh',
  },
  whiteBorder: {
    border: '3px solid',
    borderColor: 'white',
    borderRadius: '10px',
  },
  fontStyle: {
    'fontFamily': 'Permanent Marker, cursive',
    color: 'white',
  }

}));

export default function UserProfile(props) {
  const [userAvatar, setUserAvatar] = useState('')
  const [userName, setUserName] = useState('')
  const [petData, setPetData] = useState([])

  useEffect(()=> {
    // id is the user_id that comes from the cookie
    Promise.all([
      axios.get(`/api/users/${props.userId}/pets`),
      axios.get(`/api/users/${props.userId}`)
    ])
    
    .then(res => {
      setUserAvatar(res[1].data.result[0].profile_photo)
      setUserName(res[1].data.result[0].first_name)
      setPetData(res[0].data.result)
    })
    .catch(err => {
      console.log('error:', err)
    })
  }, [props.userId])
  
  const classes = useStyles();
  
  // console.log('petData', petData)
  return (
    
    <div>
      <div className={classes.root}>
        <div className={classes.whiteBorder}>
        <img alt={userName} src={userAvatar} className={classes.bigAvatar} />
        </div>
      <h1 className={classes.fontStyle}>{userName}</h1>
      </div>
      <div>
        <PetsOnUserPage petData={petData}/>
      </div>
    </div>
  );
}