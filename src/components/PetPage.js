import PetProfilePhoto from "./PetProfilePhoto";
import PetInfo from "./PetInfo";
import PetFav from "./PetFav";
import React, { Fragment, useEffect } from "react";
import Upload from './Upload';
import {useParams} from 'react-router-dom';


export default function PetPage(props) {
  let { id } = useParams()

  //useEffect axios get using the id
  const styles = {
    display: 'flex',
    'justify-content': 'space-around',
    'align-items': 'center'
  }
  const hidden = {
    visibility: 'none'
  }
  console.log('props', props)
  return(
    <Fragment>
      <div class="header" style={ styles }>
        <Upload style={ hidden } />
        <h2>{props.petName}</h2>
        <Upload />
      </div>
      <hr></hr>
      <div class="pet-profile-div" >
        <PetProfilePhoto 
        petImg={props.petImg}/>
      </div>
      <PetInfo petInfo={props.petInfo}/>
      <PetFav />
    </Fragment>
  )
}