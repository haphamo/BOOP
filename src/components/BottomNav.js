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
    height: '10%',
    borderTop: '1px solid',
    borderTopColor: 'grey'
  },
  bottomNavIcon: {
    height: '100%'
  }
});

export default function BottomNav() {
  const classes = useStyles();

  return (
    <BottomNavigation
     
      className={classes.stickToBottom}
    >
      <Link to='/'><BottomNavigationAction className={classes.bottomNavIcon} label="Dashboard" icon={<PetsIcon />} /></Link>
      <Link to='/profile'><BottomNavigationAction className={classes.bottomNavIcon} label="User" icon={<PersonIcon />} /></Link>
      <Link to='/friends'><BottomNavigationAction className={classes.bottomNavIcon} label="Friends" icon={<GroupIcon />} /></Link>
      <Link to='/notifications'><BottomNavigationAction className={classes.bottomNavIcon} label="Notifications" icon={<NotificationsIcon />} /></Link>
    </BottomNavigation>
  );
}