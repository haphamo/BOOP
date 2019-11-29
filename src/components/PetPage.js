import PetProfilePhoto from "./PetProfilePhoto";
import PetInfo from "./PetInfo";
import PetFav from "./PetFav";
import React, { Fragment, useEffect , useState} from "react";
import Upload from './Upload';
import {useParams} from 'react-router-dom';
import axios from "axios";
import Gallery from './Gallery';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));
const hidden = {
  visibility: 'hidden'
}

export default function PetPage(props) {
  // this id is of the pet
  let { id } = useParams()

  // initial state of fav bar will always have an add button
  const addFav = { category: 'Add'}

  // hidden button style
  const classes = useStyles();
  
  // define my states
  const [petAvatar, setPetAvatar] = useState('')
  const [petName, setPetName] = useState('')
  const [petFav, setPetFav] = useState([addFav])
  const [petInfo, setPetInfo] = useState('')
  const [petGallery, setPetGallery] = useState([])
  // const [showLoadFile, setShowLoadFile] = useState(false);
  const [lastUploaded, setLastUploaded] = useState('');
  
  useEffect(() => {
    Promise.all([
      axios.get(`/api/pets/${id}`),
      axios.get(`/api/pets/${id}/images`)

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
      setPetFav([addFav, ...category]);
      
    })
    .catch(err => {
      console.log('error:', err)
    })
    
  }, [lastUploaded])

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
      <Button variant="contained" style={hidden} className={classes.button}>
        Default
      </Button>
          <h2>{petName}</h2>
          <Upload setLastUploaded={setLastUploaded}/>
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