import React, { Fragment, useEffect , useState} from "react";
import {useParams} from 'react-router-dom';
import axios from "axios";

import { makeStyles } from '@material-ui/core/styles';
import PetProfilePhoto from "./PetProfilePhoto";
import PetInfo from "./PetInfo";
import PetFav from "./PetFav";
import Upload from './Upload';
import Gallery from './Gallery';
import Button from '@material-ui/core/Button';
import PetFavForm from './petFavForm';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

export default function PetPage(props) {
  // this id is of the pet
  let { id } = useParams()

  // initial state of fav bar will always have an add button
  const addFav = { category: 'Add', favourite_id: 0}

  // hidden button style
  const classes = useStyles();
  
  // define my states
  const [petAvatar, setPetAvatar] = useState('')
  const [petName, setPetName] = useState('')
  const [petFav, setPetFav] = useState([addFav])
  const [petInfo, setPetInfo] = useState('')
  const [petGallery, setPetGallery] = useState([])
  const [lastUploaded, setLastUploaded] = useState('')
  const [showPetFavForm, setShowPetFavForm] = useState(true)

  
  useEffect(() => {
    Promise.all([
      axios.get(`/api/pets/${id}`),
      axios.get(`/api/pets/${id}/images`)

    ])
    .then(all => {
      setPetName(all[0].data.result[0].name)
      setPetAvatar(all[0].data.result[0].profile_photo)
      setPetInfo(all[0].data.result[0].quirky_fact)
      setPetGallery(all[1].data.result)
      
      let category = all[0].data.result
      // const fav = {}
      // category.map(item => {fav[item.category]=item.favourite_item}) 
      setPetFav([addFav, ...category]);
      
    })
    .catch(err => {
      console.log('error:', err)
    })
    
  }, [lastUploaded, id])

  const styles = {
    display: 'flex',
    'justifyContent': 'space-around',
    'alignItems': 'center'
  }
  //the first button in the header is hidden to center the name of the pet
  const hidden = {
    visibility: 'hidden'
  }
  
  return(
    <Fragment>
      <div className="header" style={ styles }>
        <Button variant="contained" style={hidden} className={classes.button}>
        Default
        </Button>
        <h2>{petName}</h2>
        <Upload setLastUploaded={setLastUploaded}/>
      </div>
      <hr></hr>
      { showPetFavForm ?
      <div>
        <div className="pet-profile-div" >
          <PetProfilePhoto 
          petImg={petAvatar}/>
        </div>
        <PetInfo petInfo={petInfo}/>
        <PetFav petFav={petFav} setShowPetFavForm={setShowPetFavForm}/>
        <div>
          <Gallery petGallery={petGallery}/>
        </div> 
      </div> : 
      <div>
        <PetFavForm setShowPetFavForm={setShowPetFavForm}/>
        <PetFav petFav={petFav} setShowPetFavForm={setShowPetFavForm}/>
        <Gallery petGallery={petGallery}/>
      </div>
      }

    </Fragment>
    
  )
}