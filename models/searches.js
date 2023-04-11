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
      'access_token':'pk.eyJ1IjoieGFudWwiLCJhIjoiY2xnY3UyNDVmMDFhNDNmbGh3c3lqYnRtYiJ9.AMLT37irmADPCIiiLpFlnw'
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
      console.log(resp.data);

      return []; // Retornar los lugares que coincidan con la busqueda

    } catch (error) {
      
      return [];

    }

    

  }


}

module.exports = Searches;