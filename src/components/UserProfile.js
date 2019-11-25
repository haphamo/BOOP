import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import PetsOnUserPage from './PetOnUserPage';

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
  const classes = useStyles();

  return (
    <Fragment>
    <div className={classes.root}>
      <Avatar alt={props.userFirstName} src={props.userAvatar} className={classes.bigAvatar} />
    <strong>{props.userFirstName}</strong>
    </div>
    <PetsOnUserPage 
    petId={props.petId}
    petImg={props.petImg}
    petName={props.petName}/>
    </Fragment>
  );
}