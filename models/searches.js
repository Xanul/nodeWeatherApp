const axios = require('axios');

class Searches {

  history = ['Tegucigalpa', 'Madrid', 'San Jose'];

  // Constructor
  constructor() {
    //TODO: Leer base de datos si existe



  }

  // Getters
  get paramsMapbox(){
    return {
      'limit': 5,
      'language':'es',
      'access_token':process.env.MAPBOX_KEY
    }
  }

  // Methods
  async city( place = '' ) {

    // Peticion HTTP
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


}

module.exports = Searches;