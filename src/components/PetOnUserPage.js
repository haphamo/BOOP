import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
    'justify-content': 'center',
    'flex-direction': 'column',
    'align-items': 'center'
  },
  bigAvatar: {
    width: 170,
    height: 170,
  },
}));

export default function PetOnUserPage(props) {
  const classes = useStyles();
  console.log('pets of user props', props.petData)

  const allPets = props.petData.map(pet => {
    return(
      <div key={pet.pet} className={classes.root} >
      <Link to={`/pets/${pet.pet_id}`} ><Avatar alt={pet.pet} src={pet.pet_avatar} className={classes.bigAvatar} /></Link>
      <em>{pet.pet}</em>
      </div>
    )
  })
  return(
    <div>
      {allPets}
    </div>
  )
}