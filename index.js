const { readInput, inquirerMenu, pause, placesList } = require("./helpers/inquirer");
const Searches = require("./models/searches");
require('dotenv').config();
require('colors');


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

        // Getting weather info
        const weatherInfo = await currentSearch.weatherByPlace(selectedPlace.lat, selectedPlace.lng);

        // Show the results in console
        console.clear();
        console.log("\nCity Information\n".green);
        console.log("City:", selectedPlace.name.green);
        console.log("Lat:", selectedPlace.lat );
        console.log("Lng:", selectedPlace.lng);
        console.log("Weather: ", weatherInfo.desc.yellow);
        console.log("Temperature:", weatherInfo.temp);
        console.log("Min Temp:", weatherInfo.min);
        console.log("Max Temp:", weatherInfo.max);
        break;
    
      default:
        break;
    }
    

    if (menuOption !== 0) await pause();
    
  } while (menuOption !== 0);




}

main();

