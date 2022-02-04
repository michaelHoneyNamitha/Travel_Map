import React, {useState, useEffect, createRef } from 'react';
import {CircularProgress,InputLabel,Typography,Grid,MenuItem,FormControl,Select} from '@material-ui/core';
import useStyles from './styles.js';
import PlaceDetails from '../PlaceDetails/PlaceDetails';


const ListOfPlaces = ({places, childClicked, isLoading, type, setType, rating, setRatings}) =>{
    const classes=useStyles();
   // const [type,setType]= useState('attractions');
    //const [rating,setRatings]= useState('');
    const [elementRefs, setElementRefs]=useState([]);

   // console.log({childClicked});

    useEffect(() =>{
        const references= Array(places?.length).fill().map(( _ ,i) => elementRefs[i] || createRef());
        setElementRefs(references);
    },[places]);

    return(
        <div className={classes.container}>

            <Typography variant="h5" color="textPrimary"> Attractions, Hotels & Restaurants Around You!</Typography>

            {isLoading ? (
                <div className={classes.loading}>
                    <CircularProgress size="5rem" />
                </div>
            ) : (
            <>
            <FormControl className={classes.formControl}>
                <InputLabel>Things to do</InputLabel>
                <Select value={type} onChange={(e) => setType(e.target.value)}>
                    <MenuItem value="restaurants">Resturants</MenuItem>
                    <MenuItem value="hotels">Hotels</MenuItem>
                    <MenuItem value="attractions">Attractions</MenuItem>
                </Select> 
            </FormControl>

            <FormControl className={classes.formControl}>
                <InputLabel>Ratings</InputLabel>
                <Select value={rating} onChange={(e) => setRatings(e.target.value)}>
                    <MenuItem value={0}>All</MenuItem>
                    <MenuItem value={3}>Above 3.0</MenuItem>
                    <MenuItem value={4}>Above 4.0</MenuItem>
                    <MenuItem value={4.5}>Above 4.5</MenuItem>
                </Select> 
            
            </FormControl>

            <Grid container spacing={3} className={classes.list}>
                {places?.map((place, i) =>  (
                    <Grid ref={elementRefs[i]} item key={i} xs={12}>
                     <PlaceDetails 
                         place={place} 
                         elementSelected = {Number(childClicked) === i}
                         refProp={elementRefs[i]}
                         />
                    </Grid>
                ))}
            </Grid>
            </>
            )};
        </div>
        
    );

}

export default ListOfPlaces;