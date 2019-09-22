
# BookingGo challenge 2019

## Setup

To run the the solution, please ensure that you have:

- NodeJS (i used v10.16.3)

Then, install dependancies by:

- Cloning this repo
- Run "npm i" in your command line, which will install node-express and node-fetch

## Problem Assumptions and Scoping

- Passenger parameter: Given a passenger count, I have filtered all vehicles with lower capacity than passengers. I have however not made any assumptions about a maximum vehicle capacity for a lower number of passengers: for example, I have considered "Minibus" to still be a valid option for 1 passenger. What happens if they have a lot of bags from vacation and want a minibus?
- Tests for some of the fundemental routines in the solution are provided in tests.js. I didn't want to overengineer, and so I didn't use a mocking framework for API calls/ to mock the fetch function, and instead focussed on testing the main routines that consume API input, so that you may get an idea of how I test my solutions.
- I assumed part 2 would provide a wrapper for the main section of part 1, regarding returning the lowest cost options and corresponding driver for each vehicle type, and would not need a specific endpoint and routine for Dave such as the console application (since this is already given by the endpoints in the exercise).

## Code locations

- Part 1, or Bullet point one, aka, Dave's raw data, will be found in solution.js under method "daveOnly". Additionally as requested, sorting by price and console output happens in console.js
- Part 2, or bullet points 2 and 3, are found in solution.js under method "callable", where both aggregation across multiple drivers takes place, as well as filtering on passenger number takes place

## Running Part 1

- Use format "node console {command line args}"
- Command line arguments are assumed as: {lat,lon} {lat,lon} {Optional: task-option} {Optional: number of passengers}
- There are two task-options to run on command line: Dave only (use task-option: 0), or minimal cost per vehicle type from all drivers (use task-option: 1)
- To specifiy number of passengers, you must specify a task-option (only task-option: 1 is valid with passenger number anyway)
- An example command would be: "node console 51.470020,-0.454295 51.00000,1.0000 0" which makes an API call for all of Dave's services
- Another example would be: "node console 51.470020,-0.454295 51.00000,1.0000 1 4" which gets all vehicles valid for 4 passengers at lowest cost
- Leaving out both task-option and passenger will print out both tasks, with default passengers = 1 

## Running Part 2

- enter "node server"
- You should see a message that says "Solution app listening on port 3000!"
- visit http://localhost:3000/transport?pickup={l1,l2}&dropoff={l1,l2}&pass={passengers} [passengers is optional and defaults to 1]
- e.g. try http://localhost:3000/transport?pickup=3.234234,4.234234&dropoff=3.32423,3.34234
- You will see a JSON response corresponding to the lowest cost transport options associated to a driver (at default, passeneger = 1) 
- Response format is in JSON: {success: <boolean>, data: {vehicle:[price, driver]}}
- Query the object held in "data" with a vehicle type, which will return the price, and the associated driver as [price, driver ID]

## Tests

- The implementation contains a test file for the main functions in the solution
- To run the tests, enter "node tests.js"
- Output should be 15 of 15 tests passing
- This mocks two main functions: one that consumes API input from all drivers, and returns a set of the minimum cost vehicles, and the argument validation
