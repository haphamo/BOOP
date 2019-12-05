import React, { useEffect , useState} from "react";
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
  styles: {
    display: 'flex',
    'justifyContent': 'space-around',
    'alignItems': 'center'
  },
  marginBottom: {
    marginBottom: '15%'
  },
  header: {
    'fontFamily': 'Permanent Marker, cursive'
  }

}));

export default function PetPage(props) {
  // this id is of the pet
  let { id } = useParams()

  // initial state of fav bar will always have an add button
  const addFav = { category: 'Add', favourite_id: 0}

  const classes = useStyles();
  
  // define my states
  const [petAvatar, setPetAvatar] = useState('')
  const [petName, setPetName] = useState('')
  const [petFavs, setPetFavs] = useState([addFav])
  const [petInfo, setPetInfo] = useState([])
  const [petGallery, setPetGallery] = useState([])
  const [lastUploaded, setLastUploaded] = useState('')
  const [showPetFavForm, setShowPetFavForm] = useState(true)
  const [listOfPets, setListOfPets] = useState([])

  useEffect(() => {
    Promise.all([
      axios.get(`/api/pets/${id}`),
      axios.get(`/api/pets/${id}/images`),
      axios.get(`/api/pets/${id}/favourites`),
      axios.get(`/api/users/${props.userId}/pets`)
    ])
    .then(res => {
      // console.log("What is the response", res)
      setPetName(res[0].data.result[0].name)
      setPetAvatar(res[0].data.result[0].profile_photo)
      setPetInfo(res[0].data.result[0])
      setPetGallery(res[1].data.result)
      
      let favourites = res[2].data.result

      setPetFavs([addFav, ...favourites]);
      setListOfPets(res[3].data.result)
    
    })
    .catch(err => {
      console.error(err)
    })
    
  }, [lastUploaded, id])

  const submitPetFav = function(favourite_item, category) {
    const newFav = { favourite_item, category, id }
    axios.post(`/api/pets/${id}/favourites`, newFav)
    .then(() => {
      setPetFavs([...petFavs, newFav])
      setShowPetFavForm(true)
    })
    .catch(err => {
      console.error(err)
    })
  }

  //the first button in the header is hidden to center the name of the pet
  const hidden = {
    visibility: 'hidden'
  }

  //this variable stores the pet ids of the current user
  let allPets = listOfPets.map(pet => (pet.pet_id))
  // console.log('allPets', allPets)
  // console.log('id', Number(id))
  // console.log('test', allPets.includes(Number(id)))

 // if allPets.includes(Number(id)) is true then show as is, if false, remove the first element in petFavs 

  return(
    <div className={classes.marginBottom}>
    
      <div className={classes.styles}>
        <Button variant="contained" style={hidden} className={classes.button}>
        Default
        </Button>
          <h2 className={classes.header}>{petName}</h2>
        {/* if the id in useparams exists in the array of users pets, allow upload else do not */}
        { allPets.includes(Number(id)) ? <Upload setLastUploaded={setLastUploaded} onUpload={props.onUpload} />  : 
        <Button variant="contained" style={hidden} className={classes.button}>
        Default
        </Button>}
      </div>
      <hr></hr>
      { showPetFavForm ?
      <div>
        <div className="pet-profile-div" >
          <PetProfilePhoto 
          petImg={petAvatar}/>
        </div>
        <PetInfo petInfo={petInfo}/>
        <PetFav petFavs={petFavs} setShowPetFavForm={setShowPetFavForm}/>
        <div>
          <Gallery petGallery={petGallery}/>
        </div> 
      </div> : 
      <div>
        <PetFavForm onCreatePetFav={submitPetFav} setShowPetFavForm={setShowPetFavForm}/>
        <PetFav petFavs={petFavs} setShowPetFavForm={setShowPetFavForm}/>
        <Gallery petGallery={petGallery}/>
      </div>
      }
    </div>
  )
}