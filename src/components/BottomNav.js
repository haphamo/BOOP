import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PersonIcon from '@material-ui/icons/Person';
import PetsIcon from '@material-ui/icons/Pets';
import NotificationsIcon from '@material-ui/icons/Notifications';

import GroupIcon from '@material-ui/icons/Group';
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    
  }
});

export default function BottomNav() {
  const classes = useStyles();

  return (
    <BottomNavigation
      showLabels
      className={classes.stickToBottom}
    >
      <Link to='/'><BottomNavigationAction label="Dashboard" icon={<PetsIcon />} /></Link>
      <Link to='/profile'><BottomNavigationAction label="User" icon={<PersonIcon />} /></Link>
      <Link to='/friends'><BottomNavigationAction label="Friends" icon={<GroupIcon />} /></Link>

      <Link to='/Notifications'><BottomNavigationAction label="Notifications" icon={<NotificationsIcon />} /></Link>
    </BottomNavigation>
  );
}