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
  
    return (
      <Fragment>
      <div key={props.petId} className={classes.root} >
      <Link to={`/pets/${props.petId}`} ><Avatar alt={props.petName} src={props.petImg} className={classes.bigAvatar} /></Link>
        <em>{props.petName}</em>
      </div>
      </Fragment>
    );

}