import React from 'react';
import { Widget } from "@uploadcare/react-widget";

export default function Upload() {

  return (
    <div class="upload">
      <Widget 
        publicKey='e409ed1db8c88f8b8083'
        onChange={console.log} 
        onFileSelect={console.log}
        clearable
        previewStep='true'
        crop='true'
      />
    </div>
  )
}
