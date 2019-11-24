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
      setResults([...results, response.data.results]);

      // return axios.post('/api/images')
      // Image: { url:, petId: ,}
      // pg.query('INSERT INTO images (url, pet_id) VALUES ($1, $2)', [req.body.url, req.petId,])
    }).then()
    // .then((response) => {
    // })
    // Store the image in the images table in the database
  }, [uuid, results]);

  // useEffect(() => {
  //   console.log('Results changed: ', results);
  // }, [results]);

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
