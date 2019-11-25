import PetProfilePhoto from "./PetProfilePhoto";
import PetInfo from "./PetInfo";
import PetFav from "./PetFav";
import React, { Fragment } from "react";
import Upload from './Upload';
import PetsIcon from '@material-ui/icons/Pets';


export default function PetPage() {

  const styles = {
    display: 'flex',
    'justify-content': 'space-around',
    'align-items': 'center'
  }
  const hidden = {
    visibility: 'none'
  }
  return(
    <Fragment>
      <div class="header" style={ styles }>
        <Upload style={ hidden } />
        <h2>Labber</h2>
        <Upload />
      </div>
      <hr></hr>
      <div class="pet-profile-div" >
        <PetProfilePhoto />
      </div>
      <PetInfo />
      <PetFav />
    </Fragment>
  )
}