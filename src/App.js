import React, {useState, useEffect} from  'react';

import { CssBaseline, Grid } from '@material-ui/core';

import Header from './components/Header/Header';
import Map from './components/Map/Map';
import ListOfPlaces from './components/ListOfPlaces/ListOfPlaces';
import {getPlaces, getWeather} from  './Api';

const App = () => {
    const [places, setPlaces]=useState([]);
    const [coordinates,setCoordinates]=useState({lat: 0, lng:0});
    const [bounds, setBounds]=useState({});
    const [childClicked, setChildClicked]=useState(null);
    const [isLoading, setIsLoading]=useState(false);
    const [type,setType]= useState('attractions');
    const [rating,setRatings]= useState('0');
    const [filteredPlaces, setFilteredPlaces]=useState([]);
    const[weatherData, setWeatherData]= useState([]);
    

    useEffect(() =>{
        navigator.geolocation.getCurrentPosition(( {coords:{latitude,longitude} }) => {
            setCoordinates({lat:latitude, lng:longitude});

        })
    // This [] empty dependency array allows this code inside the useEffect to execute only at the start of the applications.
    },[]);

    useEffect(() =>{
        const filteredPlace= places.filter((place) => place.rating > rating);
        setFilteredPlaces(filteredPlace);

    },[rating]);

    useEffect(() => {
        if (bounds.sw && bounds.ne){
            setIsLoading(true);

            getWeather(coordinates.lat, coordinates.lng).then((data) => setWeatherData(data));

            getPlaces( type, bounds.sw, bounds.ne)
                     .then((data) => {
                        // console.log(data);
                        setPlaces(data?.filter((place) => place.name && place.num_reviews >0));// to eliminate no name and no review places.
                        setFilteredPlaces([]);
                        setIsLoading(false);
            })
        } 
    
    },[type, bounds]); 

    //console.log(places);
    //console.log(filteredPlaces);

    return(
        <>
        <CssBaseline/>
        <Header setCoordinates={setCoordinates}/>
        <Grid container spacing={3} style={{width:'100%'}}>
        <Grid item xs={12} md={4}>

            < ListOfPlaces 
                places={filteredPlaces.length ? filteredPlaces : places}
                childClicked={childClicked} 
                isLoding={isLoading}
                type={type}
                setType={setType}
                rating={rating}
                setRatings={setRatings}
                />
        </Grid>
        <Grid item xs={12} md={8}>
            <Map 
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
           // bounds={bounds}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
            weatherData={weatherData}
            
            />
        </Grid>
        </Grid>
        </>

    );
}

export default App;