import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import PetsOnUserPage from './PetOnUserPage';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
    'justify-content': 'center',
    'flex-direction': 'column',
    'align-items': 'center'
  },
  bigAvatar: {
    width: 150,
    height: 150,
  },
}));

export default function UserProfile(props) {

  //define states
  const [userAvatar, setUserAvatar] = useState('')
  const [userName, setUserName] = useState('')
  const [petAvatars, setPetAvatars] = useState('')
  const [petNames, setPetNames]= useState('')

  useEffect(()=> {
    // id is the user_id that comes from the cookie
    //right now it is hardcoded
    axios.get(`/api/users/pets/1`)
    .then(res => {
      console.log('res:', res.data.result)
      console.log('this one:', res.data.result[0].user_avatar)
      setUserAvatar(res.data.result[0].user_avatar)
      setUserName(res.data.result[0].owner)
      
    })
    .catch(err => {
      console.log('error:', err)
    })
  }, [])

  const classes = useStyles();

  return (
    <Fragment>
    <div className={classes.root}>
      <Avatar alt={props.userFirstName} src={userAvatar} className={classes.bigAvatar} />
    <strong>{userName}</strong>
    </div>
    <PetsOnUserPage 
    petId={props.petId}
    petImg={props.petImg}
    petName={props.petName}/>
    </Fragment>
  );
}