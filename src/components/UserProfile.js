import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import PetsOnUserPage from './PetOnUserPage';

const userData = {
  firstName: 'Maria',
  avatar: 'https://image.flaticon.com/icons/svg/920/920963.svg',
  alt: 'avatar'
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
    width: 150,
    height: 150,
  },
}));

export default function UserProfile() {
  const classes = useStyles();

  return (
    <Fragment>
    <div className={classes.root}>
      <Avatar alt="Remy Sharp" src="https://image.flaticon.com/icons/svg/920/920963.svg" className={classes.bigAvatar} />
    <strong>{userData.firstName}</strong>
    </div>
    <PetsOnUserPage />
    </Fragment>
  );
}