import PetProfilePhoto from "./PetProfilePhoto";
import PetInfo from "./PetInfo";
import PetFav from "./PetFav";
import React, { Fragment, useEffect , useState} from "react";
import Upload from './Upload';
import {useParams} from 'react-router-dom';
import axios from "axios";


export default function PetPage(props) {
  let { id } = useParams()

  // define my states
  const [petAvatar, setPetAvatar] = useState('')
  const [petName, setPetName] = useState('')
  const [petFav, setPetFav] = useState([])
  const [gallery, setGallery] = useState([])
  const [petInfo, setPetInfo] = useState('')

  useEffect(() => {
    axios.get(`/api/pets/${id}`)
    .then(res => {
      console.log('response:', res.data.result[0])
      setPetName(res.data.result[0].name)
      setPetAvatar(res.data.result[0].profile_photo)
      setPetInfo(res.data.result[0].quirky_fact)
    
    })
    .catch(err => {
      console.log('error:', err)
    })
  }, [id])

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
        <h2>{petName}</h2>
        <Upload />
      </div>
      <hr></hr>
      <div class="pet-profile-div" >
        <PetProfilePhoto 
        petImg={petAvatar}/>
      </div>
      <PetInfo petInfo={petInfo}/>
      <PetFav petFav={petFav}/>
    </Fragment>
  )
}