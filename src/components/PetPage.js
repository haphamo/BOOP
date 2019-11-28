import PetProfilePhoto from "./PetProfilePhoto";
import PetInfo from "./PetInfo";
import PetFav from "./PetFav";
import React, { Fragment, useEffect , useState} from "react";
import Upload from './Upload';
import {useParams} from 'react-router-dom';
import axios from "axios";
import Gallery from './Gallery';

export default function PetPage(props) {
  // this id is of the pet
  let { id } = useParams()

  // initial state of fav bar will always have an add button
  const addFav = { category: 'Add'}
  
  // define my states
  const [petAvatar, setPetAvatar] = useState('')
  const [petName, setPetName] = useState('')
  const [petFav, setPetFav] = useState([addFav])
  const [petInfo, setPetInfo] = useState('')
  const [petGallery, setPetGallery] = useState([])
  // const [showLoadFile, setShowLoadFile] = useState(false);

  useEffect(() => {
    Promise.all([
      axios.get(`/api/pets/${id}`),
      axios.get(`/api/pets/images/${id}`)

    ])
    .then(all => {
      // console.log('all', all)
      setPetName(all[0].data.result[0].name)
      setPetAvatar(all[0].data.result[0].profile_photo)
      setPetInfo(all[0].data.result[0].quirky_fact)
      setPetGallery(all[1].data.result)
      
      let category = all[0].data.result
      const fav = {}
      category.map(item => {fav[item.category]=item.favourite_item}) 
      setPetFav([addFav, ...category])
      
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
      <div className="header" style={ styles }>
          <h2>{petName}</h2>
      </div>
      <hr></hr>
      <div className="pet-profile-div" >
        <PetProfilePhoto 
        petImg={petAvatar}/>
      </div>
      <PetInfo petInfo={petInfo}/>
      <PetFav petFav={petFav}/>
      <div>
      {/* <Upload /> */}
      <Gallery petGallery={petGallery}/>
      </div>
    </Fragment>
    
  )
}