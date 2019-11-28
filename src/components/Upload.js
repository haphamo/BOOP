import React, { Fragment } from 'react';
import { Widget } from '@uploadcare/react-widget';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// id parameter is hard-coded for now
// Assisted by Guy Tonye(mentor)
export default function Upload(props) {
  const { id } = useParams()
  const onUpload = (info) => {
    // Save the image to the database
    axios.post(`/api/pets/images/${id}`, { 
      url: info.originalUrl 
    })
    .then(() => {
      props.setLastUploaded(info.originalUrl);
    })
    // props.setPetGallery(prev => {}info.originalUrl)
  }
  return (
    <Fragment>
      <div className="upload">
        <Widget 
          publicKey='e409ed1db8c88f8b8083'
          onChange={onUpload} 
          clearable
          previewStep='true'
          crop='true'
        />
      </div>
    </Fragment>
  )
}
