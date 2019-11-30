import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    'flex-direction': 'column'
  },
  input: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const avatarStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
    'flex-direction': 'column',
    'align-items': 'center'
  },
  bigAvatar: {
    width: 170,
    height: 170,
    'border-style': 'solid',
    'border-color': 'coral'
  },
}));

// Add a new pet
// Only the owner that is logged in can add a new pet on their profile
export default function AddPet(props) {
  const currentUser = props.userId
  const classes = useStyles();
  const avatarClasses = avatarStyles();

  // Need to send: current user, name, age, breed, quirky_fact, profile_photo
  const addPet = function(currentUser, name, ) {
    axios.post('api/pets', { name, currentUser })

    .then(res => {
      console.log("Added a new  pet: ", res)
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <Fragment>
      <h3>Add a new pet</h3>
      <em>All fields are required.</em>
      <div className={avatarClasses.root}>
    </div>
    <div className={classes.container}> 
      <Input
        placeholder="Pet Name"
        className={classes.input}
        inputProps={{
          'aria-label': 'description',
        }}
      />
      <Input
        placeholder="Age"
        className={classes.input}
        inputProps={{
          'aria-label': 'description',
        }}
      />
       <Input
        placeholder="Quirky Fact"
        className={classes.input}
        inputProps={{
          'aria-label': 'description',
        }}
      />
       <Input
        placeholder="Breed"
        className={classes.input}
        inputProps={{
          'aria-label': 'description',
        }}
      />
       <Input
        placeholder="Add a Profile Photo (url)"
        className={classes.input}
        inputProps={{
          'aria-label': 'description',
        }}
      />
      <Button variant="outlined" className={classes.button} onClick={() => props.setShowForm(false)}>
        Cancel
      </Button>
      <Button variant="outlined" className={classes.button}>
        Submit
      </Button>

    </div>
    </Fragment>
  );
}