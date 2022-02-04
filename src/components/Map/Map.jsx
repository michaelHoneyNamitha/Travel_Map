import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography,useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles.js';

const Map = ({setCoordinates, setBounds, coordinates, places, setChildClicked, weatherData}) =>{
    const classes=useStyles();
    const isNotMobile=useMediaQuery('(min-width:600px)');

    
    
   //My Project 97579(googlecloud)
    return(
      <div className={classes.mapContainer}>

                <GoogleMapReact
                  bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                  defaultCenter={coordinates}
                  center={coordinates}
                  defaultZoom={14}
                  marginBounds={[50, 50, 50, 50]}
                  options={{disableDefaultUI: true, zoomControl: true}}
                  onChange={(e) => {
                    console.log(e);
                    setCoordinates({ lat: e.center.lat, lng: e.center.lng });
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });

                  }}
                  onChildClick={(child) => setChildClicked(child)}
                  >
                  {places?.map((place, i) =>(
                    <div 
                    className={classes.markerContainer}
                    lat={Number(place.latitude)/*to convert string to integer*/}
                    lng={Number(place.longitude)}
                    key={i}
                    >
                     { !isNotMobile ? (
                        <LocationOnOutlinedIcon color="primary" fontSize="large" />
                        
                      ) : (
                        <Paper elevation={3} className={classes.paper}>
                          <Typography className={classes.typography} variant="subtitle2" color="primary" gutterBottom>{place.name}</Typography>
                          <img className={classes.pointer}
                               src={place.photo ? place.photo.images.large.url : 'https://www.elitetraveler.com/wp-content/uploads/2014/11/The-Lawns1.jpg'}
                               alt={place.name} />
                           <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />    

                        </Paper>
                      )}

                    </div>
                  ))}
                  {weatherData?.list?.length && weatherData.list.map((data, i) => (
                         <div key={i} >
                            <img height="50px" src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="WeatherIcon" />
                         </div>
                  ))}
                    

            </GoogleMapReact>
            
        </div>
        
    );

}

export default Map;