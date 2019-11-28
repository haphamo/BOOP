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
    'justifyContent': 'center',
    'flexDirection': 'column',
    'alignItems': 'center'
  },
  bigAvatar: {
    width: 150,
    height: 150,
  },
}));

export default function UserProfile(props) {
  console.log('props',props)
  //define states
  const [userAvatar, setUserAvatar] = useState('')
  const [userName, setUserName] = useState('')
  const [petData, setPetData] = useState({})
  useEffect(()=> {
    // id is the user_id that comes from the cookie
    //right now it is hardcoded
    axios.get(`/api/users/${props.userId}/pets`)
    .then(res => {
      setUserAvatar(res.data.result[0].user_avatar)
      setUserName(res.data.result[0].owner)
      // setPetData(res.data.result)
      console.log('res', res)
    })
    .catch(err => {
      console.log('error:', err)
    })
  }, [])

  const classes = useStyles();

  return (
    <Fragment>
    <div className={classes.root}>
      <Avatar alt={userName} src={userAvatar} className={classes.bigAvatar} />
    <strong>{userName}</strong>
    </div>
    <PetsOnUserPage userId={props.userId}/>
    </Fragment>
  );
}