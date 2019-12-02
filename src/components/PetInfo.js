import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}));

export default function PetInfo(props) {
  const classes = useStyles();
  console.log('props', props.petInfo)
  return (
    <Paper className={classes.root}>
      <Typography variant="h5" component="h3">
        
      </Typography>
      <Typography component="p">
        {props.petInfo.name}
        <br></br>
        {props.petInfo.breed}
        <br></br>
        {props.petInfo.quirky_fact}
      </Typography>
    </Paper>
  );
}