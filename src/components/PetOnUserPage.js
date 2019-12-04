import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
      'borderColor': 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      paddingRight: '5px',
    },
    'justify-content': 'center',
    'flex-direction': 'column',
    'alignItems': 'center',
    'background': 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
  bigAvatar: {
    width: 170,
    height: 170,
  },
  removePadding: {
    'paddingLeft': 0,
    marginTop: 0,
  },
  imgStyle: {
    'borderRadius': '10px',
    width: '100%',
    border: '3px solid',
    'borderColor': 'white'
  },
  fontStyle: {
    'fontFamily': 'Permanent Marker, cursive',
    color: 'white',
  
  }
}));


export default function PetOnUserPage(props) {
  const classes = useStyles();
  const allPets = props.petData.map(pet => {
    return(
      <div>
      <Card >
      <li key={pet.pet} className={classes.root} >
        <Link to={`/pets/${pet.pet_id}`} ><img className={classes.imgStyle} alt={pet.pet} src={pet.pet_avatar} /></Link>
        <h1 className={classes.fontStyle}> {pet.pet} </h1>
        {/* <em className={classes.fontStyle}>{pet.pet}</em> */}
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