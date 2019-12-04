import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const infoBox = {
  'marginRight': '5%',
  'marginLeft': '5%',
  'fontFamily': 'Permanent Marker, cursive',
  'textAlign': 'center'
}
export default function PetInfoDashboard(props) {
  console.log(props)
  return (
    <Paper >
    <br></br>
    <Typography component="p" style={infoBox}>
      {props.petInfo}
    </Typography>
    <br></br>
  </Paper>
  )
}