import axios from 'axios';


export const getPlaces= async(type, sw, ne) =>{
    try{
        const {data : {data}}=await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,{
          params: {
            bl_latitude: sw.lat,
            tr_latitude: ne.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng,
            
          },
          headers: {
            'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
            'x-rapidapi-key': process.env.REACT_APP_RAPID_API_TRAVEL_KEY
          }
        });

        return data;
        
    }catch (e){
        console.log(e)
    }
};

export const getWeather = async(lat, lng) => {
  try{
    
    const {data}=await axios.get('https://community-open-weather-map.p.rapidapi.com/find',{
             params: { lat:lat, lon:lng,},
    
             headers: {
                   'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
                   'x-rapidapi-key': process.env.REACT_APP_RAPID_API_WEATHER_KEY
            }
          }); 
          return data; 
        
        }catch (e){
          console.log(e)
      }  

};

