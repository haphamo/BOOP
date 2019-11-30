import React, { Fragment } from 'react';
import { Widget } from '@uploadcare/react-widget';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// Upload images to Pet Gallery
// Assisted by Guy Tonye(mentor)
export default function Upload(props) {
  return (
    <Fragment>
      <div className="upload">
        <Widget 
          publicKey='e409ed1db8c88f8b8083'
          onChange={props.onUpload} 
          clearable
          previewStep='true'
          crop='true'
        />
      </div>
    </Fragment>
  )
}
