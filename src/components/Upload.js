import React, { Fragment, useState, useEffect } from 'react';
import { Widget } from '@uploadcare/react-widget';
import axios from 'axios';

export default function Upload(props) {
  const [uuid, setUuid] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Uploading an image to Uploadcare
    const url = `https://ucarecdn.com/${uuid}/`;
    axios.get(url)
    .then(response => {
      setResults(response.data.results);
    })
    // Store the image in the images table in the database
    // axios.post('/api/users/pets/:id/images')
    // .then((response) => {
      
    // })
  }, [uuid]);

  return (
    <Fragment>
      <div class="upload">
        <Widget 
          publicKey='e409ed1db8c88f8b8083'
          onChange={results} 
          clearable
          previewStep='true'
          crop='true'
        />
      </div>
    </Fragment>
  )
}
