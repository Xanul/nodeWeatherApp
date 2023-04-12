const { readInput, inquirerMenu, pause, placesList } = require("./helpers/inquirer");
const Searches = require("./models/searches");
require('dotenv').config();


// Main app
const main = async () => {

  let menuOption;
  const currentSearch = new Searches();
  

  do {

    menuOption = await inquirerMenu();
    console.log(menuOption);
    
    switch (menuOption) {
      case 1:
        // Ask for user input
        const placeToSearch = await readInput("Please enter a city");

        // Search user input using API
        const placesFound = await currentSearch.city(placeToSearch);
        
        // Select a place from matches
        const placeID = await placesList(placesFound);
        const selectedPlace = placesFound.find( plc => plc.id = placeID );
        console.log('Lugar encontrado', selectedPlace);

        // Getting weather info
        //TODO pending

        // Show the results in console
        console.log("\nCity Information\n".green);
        console.log("City:", selectedPlace.name);
        console.log("Lat:", selectedPlace.lat );
        console.log("Lng:", selectedPlace.lng);
        console.log("Temperature:", );
        console.log("Min Temp:", );
        console.log("Max Temp:", );
        break;
    
      default:
        break;
    }
    

    if (menuOption !== 0) await pause();
    
  } while (menuOption !== 0);




}

main();

