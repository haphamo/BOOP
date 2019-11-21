import React, {useState} from 'react';
import Card from 'react-bootstrap/Card';
export default function PetProfile () {
  return (

  <Card style={{ width: '100%' }}>
  
      <Card.Body style={{ width: '50%' }}>
      <Card.Text>
        Maltese
        <hr></hr>
        Age: 5
        <hr></hr>
        "I don't like belly rubs"       
      </Card.Text>
    </Card.Body>

 

  </Card>
  )
}