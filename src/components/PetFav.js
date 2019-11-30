import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';


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
  imgStyle: {
    height: '60%',
    "paddingTop": '10%'
  },
  listItemStyle: {
    width:"100%",
    height:"100px"
  },
  categoryTextStyle: {
    "textAlign": "center"
  },
  fixedHeight: {
    height:'100px',
    width: '30%'
  }

}));

// the images for the categories of pet favourites
let data = {
  add: "https://image.flaticon.com/icons/svg/149/149145.svg",
  treat: "https://image.flaticon.com/icons/svg/1025/1025349.svg", 
  toy: "https://image.flaticon.com/icons/svg/802/802340.svg",
  park: "https://image.flaticon.com/icons/svg/189/189502.svg"
}
 
export default function PetFav(props) {

  console.log('props', props)
  const classes = useStyles();

  return (
    <div className={classes.root} >
      <GridList className={classes.listItemStyle} className={classes.gridList} cols={2.5}>
        
        {props.petFav.map(item => (
          <GridListTile className={ classes.fixedHeight } onClick={()=> props.setShowPetFavForm(false)}>
            <img 
            key={item.favourite_id}
            className={ classes.imgStyle } 
            src={data[item.category.toLowerCase()]} 
            alt={item.category} />
            <h3 className={ classes.categoryTextStyle }>{item.favourite_item}</h3>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}