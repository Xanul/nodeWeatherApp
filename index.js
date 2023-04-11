const { readInput, inquirerMenu, pause } = require("./helpers/inquirer");
const Searches = require("./models/searches");


const main = async () => {

  let menuOption;
  const currentSearch = new Searches();
  

  do {

    menuOption = await inquirerMenu();
    console.log(menuOption);
    
    switch (menuOption) {
      case 1:
        // Mostrar mensaje
        const place = await readInput("Please enter a city");
        await currentSearch.city(place);
        
        // Buscar el lugar
        // Seleccionar el lugar 
        // Datos del clima
        // Mostrar los resultados
        console.log("\nCity Information\n".green);
        console.log("City:", );
        console.log("Lat:", );
        console.log("Lng:", );
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

