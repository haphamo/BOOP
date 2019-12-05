import React from 'react';
import Container from '@material-ui/core/Container';


export default function PetProfilePhoto(props) {
  const imgStyle = {
    display: "block",
    justifyContent: "center",
    width:'100%',
    height:'auto',
    objectFit: 'cover',
    overflow: 'hidden',
  }
  const imgFillWidth = {
    width: '100%',
  }

  return (
      <Container style={ imgStyle }><img style={ imgFillWidth }src={props.petImg} alt={props.petId} />
      </Container>
  );
}