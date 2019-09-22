
const solution = require('./solution');

//answer to part 1.1
//print dave's available cars
async function dave(from, to){
    let result = await solution.daveOnly(from, to)
    result.sort((a,b) => a.price - b.price)
          .forEach(element =>
              console.log(`${element["car_type"]} - ${element["price"]}`)
          );
}

//answer to rest of part 1: given co-ordinates, return available cars with min price
async function minimumCost(from, to, passengers=1){
    const result = await solution.callable(from, to, passengers)
    Object.keys(result).forEach(element => {
        console.log(`${element} - ${result[element][0]} -  ${result[element][1]}`) 
    });
}

//print both answers to the console
async function main(from, to, option, passengers){
    if(option === undefined || parseInt(option) === 0){
        console.log()
        console.log("Question part 1.1: Get all of Dave's available cars right now (price ordered), ignoring 2 second timeout and passengers")
        console.log("-------------------------------")
        await dave(from, to)
    }
    if(option === undefined || parseInt(option) === 1){
        console.log()
        console.log("Question part 1.2: Get all driver vehicles and find lowest cost option for each")
        console.log("-------------------------------")
        await minimumCost(from, to, passengers)
    }
}

//get arguments and validate
const args = process.argv.slice(2)
solution.validateArgs(args[0], args[1], args[3]) ? main(args[0], args[1], args[2], args[3]) 
                                                 : console.log("Please check your co-ordinates!")