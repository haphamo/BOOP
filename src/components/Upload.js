import React, { Fragment, useState, useEffect } from 'react';
import { Widget } from '@uploadcare/react-widget';
import axios from 'axios';

export default function Upload(props) {
  // const [uuid, setUuid] = useState("");
  const uuid = "";
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Upload an image to Uploadcare
    const url = `https://ucarecdn.com/${uuid}/`;
    axios.get(url)
    .then(response => {
      setResults([...results, response.data.results]);
      // Save the image to the database
      return axios.post('/api/images', {
        url
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
    })
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
