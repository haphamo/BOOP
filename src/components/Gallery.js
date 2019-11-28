import React , { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import axios from 'axios';
import { useParams } from 'react-router-dom'


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    marginTop: '1em',
    paddingRight: '1em',
    paddingLeft: '1em'
  },
  gridList: {
    width: '100',
   
  }
}));

//Fixture data
const images = [
  { id: 1, url: 'https://www.petlandkennesaw.com/wp-content/uploads/2017/03/maltipoo-puppies-for-sale.jpg'},
  { id: 2, url: 'https://www.dallaspetland.com/wp-content/uploads/2017/07/923895_800.jpg'},
  { id: 3, url: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/teddy-bear-dog-breeds-maltipoo-1570409269.jpg'},
  { id: 4, url: 'https://data.whicdn.com/images/106070832/original.jpg'}
]
export default function Gallery(props) {
  console.log('Here!', props)
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={200} className={classes.gridList} cols={1} >
        {props.petGallery.map(img => (
          <GridListTile key={img.id} cols={img.cols || 1} >
            <img src={img.picture} alt={img.id} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}