import React, { Fragment, useState, useEffect } from 'react';
import { Widget } from '@uploadcare/react-widget';
import {useParams} from 'react-router-dom';
import axios from 'axios';

export default function Upload(props) {
  // const [uuid, setUuid] = useState("");
  const uuid = "";
  // const [results, setResults] = useState([]);
  const { id } = useParams()

  useEffect(() => {
    // Upload an image to Uploadcare
    // What is the response we get from the upload???
    const url = `https://ucarecdn.com/${uuid}/`;
    // May not need an axios.get at this point
    // axios.get(url)
    // .then(response => {
      // setResults([...results, response.data.results]);
      // Save the image to the database
      axios.post(`/api/pets/images/${id}`, {
        url
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
    // })
  }, [id, uuid]);

  // useEffect(() => {
  //   console.log('Results changed: ', results);
  // }, [results]);

  return (
    <Fragment>
      <div className="upload">
        <Widget 
          publicKey='e409ed1db8c88f8b8083'
          // onChange={results} 
          clearable
          previewStep='true'
          crop='true'
        />
      </div>
    </Fragment>
  )
}
