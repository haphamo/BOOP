import React from 'react';
import Container from '@material-ui/core/Container';

// pass in props to change the url in src
export default function PetProfilePhoto(props) {
  const imgStyle = {
    display: "flex",
    "justifyContent": "center",
    width: '100%'
  }
  const imgFillWidth = {
    width: '100%'
  }

  return (
      <Container style={ imgStyle }><img style={ imgFillWidth }src={props.petImg} alt={props.petId} />
      </Container>
  );
}