import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function PetForm() {
  const classes = useStyles();

  return (
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
      <Button variant="outlined" className={classes.button}>
        Cancel
      </Button>
      <Button variant="outlined" className={classes.button}>
        Submit
      </Button>

    </div>
  );
}