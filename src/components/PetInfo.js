import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
  fontStyle: {
    fontFamily: 'Permanent Marker, cursive',
  }
}));

export default function PetInfo(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography component="p" className={classes.fontStyle}>
        {props.petInfo.breed}
        <br></br>
        {props.petInfo.age} {props.petInfo.age > 1 ? <em>years old</em> : <em>year old</em>}
        <br></br>
        {props.petInfo.quirky_fact}
      </Typography>
    </Paper>
  );
}