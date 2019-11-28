import React, { Fragment } from 'react';
import { Widget } from '@uploadcare/react-widget';
import axios from 'axios';

// id parameter is hard-coded for now
// Assisted by Guy Tonye(mentor)
export default function Upload() {
  const onUpload = (info) => {
    // Save the image to the database
    axios.post('/api/pets/images/1', { 
      url: info.originalUrl 
    })
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
