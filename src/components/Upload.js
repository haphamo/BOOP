import React, { Fragment } from 'react';
import { Widget } from '@uploadcare/react-widget';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../index.css';

// Upload images to Pet Gallery
// Assisted by Guy Tonye(mentor)
export default function Upload(props) {
  const { id } = useParams()
  const onUpload = (info) => {
    // Save the image to the database
    axios.post(`/api/pets/${id}/images`, { 
      url: info.originalUrl 
    })
    .then(() => {
      props.setLastUploaded(info.originalUrl);
    })
  }
  return (
    <Fragment>
      <div className="upload">
        <Widget 
          publicKey='9aed545b12b2a131d196'
          onChange={onUpload} 
          clearable
          previewStep='true'
          crop='true'
        />
      </div>
    </Fragment>
  )
}
