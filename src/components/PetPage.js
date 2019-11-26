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
  const [showLoadFile, setShowLoadFile] = useState(false);

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
    'justifyContent': 'space-around',
    'alignItems': 'center'
  }
  const hidden = {
    visibility: 'hidden'
  }
  
  return(
    <Fragment>
      <div class="header" style={ styles }>
        {showLoadFile && <Upload />}
          <h2>{petName}</h2>
        
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