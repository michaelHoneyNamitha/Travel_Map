import React from 'react';
import {Box,Typography, Button, Card, CardMedia, CardContent, CardActions, Chip} from '@material-ui/core';
import LoctionOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating'

import useStyles from './styles.js'
const PlaceDetails = ({place,elementSelected, refProp}) =>{

    //console.log(place);
    const classes=useStyles();

    if(elementSelected) refProp?.current?.scrollIntoView({behavior: "smooth" , block:"start"});

    return(
        <Card elevation={6}>
            <CardMedia
               style={{ height: 350 }}
               image={place.photo ? place.photo.images.large.url : 'https://www.elitetraveler.com/wp-content/uploads/2014/11/The-Lawns1.jpg'}
               title={place.name}
      />
                <CardContent>
                    <Typography gutterBottom variant="h5">{place.name}</Typography>

                    <Box display="flex" justifyContent="space-between">
                        <Rating name="read only" value={Number(place.rating)} readOnly />
                        <Typography gutterBottom variant="subtitle1">({place.num_reviews} reviews)</Typography>
                    </Box>

                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="subtitle1">Price</Typography>
                        <Typography gutterBottom variant="subtitle1">{place.price_level}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="subtitle1">Rating</Typography>
                        <Typography gutterBottom variant="subtitle1">{place.ranking}</Typography>
                    </Box>
                    {place?.awards?.map((award) =>(
                        <Box my={1} display="flex" justifyContent="space-between" alignItems="center">
                            <img src={award.images.small} alt={award.display_name} />
                            <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
                        </Box>
                    ))}
                    {place?.cuisine?.map(( {name} /* to display the cuisine*/) =>(
                        <Chip key={name} size="small" label={name} className={classes.chip} />

                    ))}
                    
                    {place?.address && /* to dispaly address*/ (
                    
                        <Typography gutterBottom variant="subtitle2" color="textSecondary" className={classes.subtitle}>
                            <LoctionOnIcon/>{place.address}
                        </Typography>
                    )}
                    {place?.phone &&(
                        <Typography gutterBottom variant="subtitle2" color="textSecondary" className={classes.spacing}>
                            <PhoneIcon /> {place.phone}
                        </Typography>
                    )}
                    <CardActions>
                        <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>
                            Trip Advisor
                        </Button>
                        <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
                            Website
                        </Button>

                    </CardActions> 

                </CardContent>
        </Card>
        
    );

}

export default PlaceDetails;