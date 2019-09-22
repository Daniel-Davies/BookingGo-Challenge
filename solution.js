//fetch library for node JS
const fetch = require("node-fetch");

//Given mapping between card type => seats
const passengerNumberMapping = {
    "STANDARD": 4,
    "EXECUTIVE": 4,
    "LUXURY": 4,
    "PEOPLE_CARRIER": 6,
    "LUXURY_PEOPLE_CARRIER": 6,
    "MINIBUS": 16
}

//in the real world, may replace this with another API call
//for now, as stated in exercise, we keep this hard coded
const getDrivers = () => ["dave", "eric", "jeff"]

//abstracted function: return API call result if successfull, empty if not
//contains "valid" flag in response to check for error state for filtering
//error state defined as a non 200 return OR a timeout (> 2 seconds)
async function driverScores(from, to, driver, timeRestricted) {
  const t0 = process.hrtime();
  const response = await fetch(`https://techtest.rideways.com/${driver}?pickup=${from}&dropoff=${to}`)
  const t1 = process.hrtime(t0);
  const timed = (t1[0] * 1000) + (t1[1] / 1000000)

  if(timed > 2000 && timeRestricted) {
      return {valid: false, payload: timed}
  }

  const data = await response.json()

  return response.status === 200 ? { valid: true, payload: data }
                                 : { valid: false, payload: '' }
}

//asynchronously fire off all driver requests here
async function getAllUrls(from, to, drivers) {
    return await Promise.all(drivers.map(driver => driverScores(from, to, driver, true)));
}

//returns an object corresponding to {vehicle_type => lowest price}
//loops over all values for all drivers and stores rolling lowest in a dict  
module.exports.getMinimumPrice = function getMinimumPrice(pricesByDriver){
    let score = {}
    for(let i = 0; i < pricesByDriver.length; i++){
        let driverVehicles = pricesByDriver[i]["Data"]
        let driverID = pricesByDriver[i]["Driver"]
        for(let j = 0; j < driverVehicles.length; j++){
            const { car_type, price } = driverVehicles[j];
            if(score[car_type] === undefined){
                score[car_type] = [price, driverID] 
            } else {
                if(score[car_type][0] > price){
                    score[car_type] = [price, driverID]
                }
            }
        }
    }
    return score
}

//basic validation of lat/lon co-ordinates and passenger value
module.exports.validateArgs = function validateArgs(pickup, dropoff, passengers){
    //lat/lon validation regex, please see https://stackoverflow.com/questions/3518504/regular-expression-for-matching-latitude-longitude-coordinates
    const validLatLon = new RegExp("^-?[0-9]{1,3}(?:\.[0-9]{1,10})?$");
    if(typeof pickup !== "string" || typeof dropoff !== "string") return false;
    const validPassengers = passengers === undefined || (!isNaN(passengers))
    const latLonPickup = pickup.split(",")
    const latLonDropoff = dropoff.split(",")
    if(latLonDropoff.length !== 2 || latLonPickup.length !== 2) return false;
    return latLonPickup.every(ord => validLatLon.exec(ord)) 
           && latLonDropoff.every(ord => validLatLon.exec(ord)) 
           && validPassengers
}


//answer for Part 1.1 => gets Dave's result only
//assumes we ignore the 2 second timeout property
module.exports.daveOnly = async function daveOnly(from, to){
    let response = (await driverScores(from, to, "dave", false))["payload"]["options"]
    return response === undefined ? [] : response
}

//main function to get result to question
//gets all driver results, filters for vehicles that have capacity for number of passenegers
//then gets the minimum cost per vehicle
module.exports.callable = async function callable(from, to, passengers=1){  
    let drivers = getDrivers()
    const responses = await getAllUrls(from, to, drivers)

    const validResponses = 
        responses
        .filter(response => response['valid'])
        .map(response => ({
            'Driver': response['payload']['supplier_id'],
            'Data': response['payload']['options']
            .filter(option => passengerNumberMapping[option['car_type']] >= passengers)
          })
        )

    return this.getMinimumPrice(validResponses)
}


