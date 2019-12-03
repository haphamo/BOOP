import React, { useEffect, useState } from 'react';
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
    'alignItems': 'center',
  },
  bigAvatar: {
    width: 150,
    height: 150,
  },

}));


export default function UserProfile(props) {
  // console.log('props',props)
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
   
      console.log('res.data.result', res)
    })
    .catch(err => {
      console.log('error:', err)
    })
  }, [props.userId])
  
  const classes = useStyles();
  
  console.log('petData', petData)
  return (
    
    <div>
      <div className={classes.root}>
        <Avatar alt={userName} src={userAvatar} className={classes.bigAvatar} />
      <strong>{userName}</strong>
      </div>
      <div>
        <PetsOnUserPage petData={petData}/>
      </div>
    </div>
   
  );
}