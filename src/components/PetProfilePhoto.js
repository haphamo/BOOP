import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

// pass in props to change the url in src
export default function PetProfilePhoto(props) {
  const imgStyle = {
    display: "flex",
    "justifyContent": "center"
  }
  const imgFillWidth = {
    width: '100%'
  }

  return (
    <React.Fragment >
      <CssBaseline />
      <Container maxWidth="sm" style={ imgStyle }><img style={ imgFillWidth }src={props.petImg} alt={props.petId} />
      </Container>
    </React.Fragment>
  );
}