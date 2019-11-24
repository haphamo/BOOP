import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

//Make axios call to retrieve pet data of current user
const petData = {
  petId: 1,
  petName: 'Labber',
  img: 'https://pbs.twimg.com/profile_images/962170088941019136/lgpCD8X4_400x400.jpg'
}

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
    width: 170,
    height: 170,
  },
}));

export default function PetOnUserPage() {

  const classes = useStyles();
  
    return (
      <Fragment>
      <div key={petData.petId} className={classes.root}>
        <Avatar alt={petData.petName} src={petData.img} className={classes.bigAvatar} />
        <h1>{petData.petName}</h1>
      </div>
      </Fragment>
    );

}