const axios = require('axios');

class Searches {

  history = ['Tegucigalpa', 'Madrid', 'San Jose'];

  // Constructor
  constructor() {
    //TODO: Leer base de datos si existe



  }

  // Methods
  async city( place = '' ) {

    // Peticion HTTP
    try {
      
      const resp = await axios.get('https://reqres.in/api/users?page=2');
      console.log(resp.data);  
      return []; // Retornar los lugares que coincidan con la busqueda

    } catch (error) {
      
      return [];
      
    }

    

  }


}

module.exports = Searches;