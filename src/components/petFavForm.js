import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

const categories = [
  {
    value: 'Treat',
    label: 'Treat',
  },
  {
    value: 'Toy',
    label: 'Toy',
  },
  {
    value: 'Park',
    label: 'Park',
  },
  {
    value: 'Vet',
    label: 'Vet',
  },
];

const formStyle = {
  width:'100%',
  display: 'flex',
  alignContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
}

const buttonStyles = {
  display: 'flex',
  justifyContent: 'space-evenly',
  flexDirection: 'row',
  width: '80%',
  paddingTop: '2em'
}

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '80%',

  },
  menu: {
    width: 200,
  },
}));

const largeButton = {
  transform: 'scale(1.8)'
}

export default function PetFavForm() {
  const classes = useStyles();
  const [category, setCategory] = React.useState('EUR');

  const handleChange = event => {
    setCategory(event.target.value);
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <div style={formStyle}>
        <TextField
          id="standard-select-category"
          select
          label="Category"
          className={classes.textField}
          value={category}
          onChange={handleChange}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          margin="normal"
        >
          {categories.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField id="standard-basic" className={classes.textField} label="Favourite"/>
        <div className="buttons" style={ buttonStyles }>
        <CancelOutlinedIcon style={largeButton}/>
        <CheckCircleOutlineRoundedIcon style={largeButton}/>
        </div>

      </div>
    </form>
  );
}
