const fs = require('fs');
const axios = require('axios');


class Searches {

  history = [];
  dbPath = './db/database.json'

  // Constructor
  constructor() {
    
    this.readDB();

  }

  // Getters
  get paramsMapbox(){
    return {
      'limit': 5,
      'language':'es',
      'access_token':process.env.MAPBOX_KEY
    }
  }

  get paramsOpenWeather(){
    return {
      'appid': process.env.OPENWEATHER_KEY,
      'units': 'metric'
    }
  }

  get historyCap() {
    
    const newArray = this.history.map( word => {
      return word.split(" ").map( word2 => word2.charAt(0).toUpperCase() + word2.slice(1) ).join(" ")
    })

    return newArray

  }

  // Methods
  async city( place = '' ) {
    // HTTP request for places
    try {
      
      const axiosInstance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.paramsMapbox
      })
      
      const resp = await axiosInstance.get();
      
      return resp.data.features.map( place => ({
        id: place.id,
        name: place.place_name,
        lng: place.center[0],
        lat: place.center[1]
      }))

    } catch (error) {
      
      return [];

    }
  }

  async weatherByPlace(lat, lon) {

    try {
      
      // Instancia de axios, axios.create();
      const axiosInstance2 = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: {...this.paramsOpenWeather, lat, lon}
      });
      // extraer la informacion de la data
      const resp = await axiosInstance2.get();
      const {main, weather} = resp.data;

      return {
        temp: main.temp,
        min: main.temp_min,
        max: main.temp_max,
        desc: weather[0].description
      }

    } catch (error) {
      console.log('No se logro encontrar la ciudad')
      console.log(error);
    }

  }

  addToHisotry( place = '' ) {

    // Verify if the place already exists in array
    if ( this.history.includes( place.toLowerCase() ) ) return;

    // Adds the place in the array
    this.history.unshift(place.toLowerCase());

    // Saves the array to database
    this.saveToDB();

  }

  // Method to save to database file
  saveToDB() {
    
    const payload = {
      history: this.history
    }

    fs.writeFileSync(this.dbPath, JSON.stringify( payload ));
    
  }

  readDB(){

    if ( !fs.existsSync( this.dbPath ) ) return

    const infoFromDB = fs.readFileSync( this.dbPath, {encoding: 'utf-8'} );
    const data = JSON.parse( infoFromDB );
  
    this.history = data.history
    
    console.log(this.historyCap)

  }

}

module.exports = Searches;