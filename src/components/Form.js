import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Upload from './Upload';
import Avatar from '@material-ui/core/Avatar';


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

export default function PetForm(props) {
  const classes = useStyles();
  const avatarClasses = avatarStyles();

  return (
    <Fragment>
      <div className={avatarClasses.root}>
      <Avatar alt="Remy Sharp" src={ null } className={avatarClasses.bigAvatar} />
      <Upload />
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