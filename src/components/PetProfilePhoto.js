import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';


export default function PetProfilePhoto() {
  const imgStyle = {
    display: "flex",
    "justify-content": "center"
  }

  return (
    <React.Fragment >
      <CssBaseline />
      <Container maxWidth="sm" style={ imgStyle }><img src={'https://pbs.twimg.com/profile_images/962170088941019136/lgpCD8X4_400x400.jpg'} alt="cutedog" />
      </Container>
    </React.Fragment>
  );
}