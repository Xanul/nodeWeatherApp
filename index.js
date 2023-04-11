const { readInput, inquirerMenu, pause } = require("./helpers/inquirer");


const main = async () => {

  let menuOption;

  do {

    menuOption = await inquirerMenu();
    console.log(menuOption);

    if (menuOption !== 0) await pause();
    
  } while (menuOption !== 0);

}

main();

