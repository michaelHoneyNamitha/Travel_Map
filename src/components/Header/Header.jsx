import React, {useState} from 'react';
import { Autocomplete } from '@react-google-maps/api';
import {Toolbar, AppBar, Typography, InputBase, Box} from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';
import useStyles from './styles.js';

const Header = ({setCoordinates}) => {
    const classes=useStyles();
    const [autocomplete,setAutocomplete]= useState(null);

    const onLoad= (autoC) => setAutocomplete(autoC);
    const onPlaceChanged=() =>{
      const lat = autocomplete.getPlace().geometry.location.lat();
      const lng = autocomplete.getPlace().geometry.location.lng();
      setCoordinates({lat,lng});
    }
    return (
        <AppBar position="static">
          <Toolbar className={classes.toolBar}>
            <Typography variant="h5" className={classes.title}>
              Travel Map
            </Typography>
            <Box display="flex">
              <Typography variant="h6" className={classes.title}>
                Find Places
              </Typography>
             <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase placeholder="Search…" classes={{ root: classes.inputRoot, input: classes.inputInput }} />
                </div>
              </Autocomplete>
            </Box>
          </Toolbar>
        </AppBar>
      );
    };
    
    export default Header;