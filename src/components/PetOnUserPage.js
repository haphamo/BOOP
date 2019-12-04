import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';

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
  removePadding: {
    'paddingLeft': 0
  }
}));


export default function PetOnUserPage(props) {
  const classes = useStyles();

  const allPets = props.petData.map(pet => {
    return(
      <div>
      <Card >
      <li key={pet.pet} className={classes.root} >
        <Link to={`/pets/${pet.pet_id}`} ><Avatar alt={pet.pet} src={pet.pet_avatar} className={classes.bigAvatar} /></Link>
        <em>{pet.pet}</em>
      </li>
      </Card>
      <br></br>
      </div>
    )
  })
  return(
    <ul className={classes.removePadding}>
      {allPets}
    </ul>
  )
}