import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
// import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
// import tileData from './tileData';
// import image from '../images/bone.jpg';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

// The example data is structured as follows:




 const tileData = [
   {
     img: "https://image.flaticon.com/icons/svg/149/149145.svg",
     category: 'add'
  },
  {
    img: "https://image.flaticon.com/icons/svg/1025/1025349.svg",
    category: 'treat'
 },
 {
  img: "https://image.flaticon.com/icons/svg/802/802340.svg",
  category: 'toy'
},
{
  img: "https://image.flaticon.com/icons/svg/189/189502.svg",
  category: 'park'
},
];
 
export default function PetFav() {
  const classes = useStyles();

  const stylesOfFav = {
    height: '30%',
    "padding-top": "10%"
  }

  const listItemStyle = {
    width:"100%",
    height:"100px"
  }

  const categoryTextStyle = {
    "text-align": "center"
  }

  return (
    <div className={classes.root} >
      <GridList style={listItemStyle} className={classes.gridList} cols={2.5}>
        {tileData.map(tile => (
          <GridListTile key={tile.img}>
            <img style={ stylesOfFav } src={tile.img} alt={tile.category} />
            <h5 style={ categoryTextStyle }>{tile.category}</h5>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}