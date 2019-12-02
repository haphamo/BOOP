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
    marginTop: '1em',
    paddingRight: '1em',
    paddingLeft: '1em'
  },
  gridList: {
    width: '100',
   
  }
}));

export default function Gallery(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={200} className={classes.gridList} cols={1} >
        {props.petGallery.map(img => (
          <GridListTile key={img.image_id} cols={img.cols || 1} >
            <img src={img.photo} alt={img.image_id} />

          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}