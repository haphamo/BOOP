import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import Upload from './Upload';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  button: {
    margin: theme.spacing(1),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '70%',
  },
  formStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
  }
}));

// Add a new pet
// Only the owner that is logged in can add a new pet on their profile
export default function PetForm(props) {
  const userId = props.userId
  const classes = useStyles()

  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [breed, setBreed] = useState('')
  const [quirkyFact, setQuirkyFact] = useState('')
  const [profilePhoto, setProfilePhoto] = useState('')

  const onSubmit = function (evt) {
    evt.preventDefault();
    props.onAddPet(name, age, breed, quirkyFact, userId, profilePhoto)
    props.handleCreatePet()
  }
  const handleNameChange = e => {
    setName(e.target.value)
  }
  const handleAgeChange = e => {
    setAge(e.target.value)
  }
  const handleBreedChange = e => {
    setBreed(e.target.value)
  }
  const handleQuirkyFactChange = e => {
    setQuirkyFact(e.target.value)
  }
   const handleProfilePhotoChange = e => {
    setProfilePhoto(e.target.value)
  }
  // Will use the Upload component once we successfully add a new pet into the database
  // const handleUpload = function(info) {
  //   setProfilePhoto(info.originalUrl)
  // }

  return (
    <form className={classes.container} onSubmit={onSubmit}>
      <div className={classes.formStyle}>
        <TextField
          required
          id="name"
          label="Name"
          className={classes.textField}
          margin="normal"
          onChange={handleNameChange}
          value={name}
        />
        <TextField
          required
          id="age"
          label="Age"
          className={classes.textField}
          margin="normal"
          onChange={handleAgeChange}
          value={age}
        />
        <TextField
          required
          id="breed"
          label="Breed"
          className={classes.textField}
          margin="normal"
          onChange={handleBreedChange}
          value={breed}
        />
        <TextField
          required
          id="quirkyfact"
          label="Quirky Fact"
          className={classes.textField}
          margin="normal"
          onChange={handleQuirkyFactChange}
          value={quirkyFact}
        />
        <TextField
          required
          id="profilephoto"
          label="Profile Photo Url"
          className={classes.textField}
          margin="normal"
          onChange={handleProfilePhotoChange}
          value={profilePhoto}
        />
        {/* <Upload onUpload={handleUpload}/> */}
          <Button variant="outlined" className={classes.button} onClick={() => props.setShowForm(false)}>
            Cancel
          </Button>
          <Button variant="outlined" 
          className={classes.button} 
          type="submit"
          
          >
            Submit
          </Button> 
      </div>
    </form>
  );
}
