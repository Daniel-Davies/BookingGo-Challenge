const solution = require('./solution');

//quick method to check object equality
//could also use a library such as Enzyme or Lodash
function objComp(a, b) {
    return JSON.stringify(a) === JSON.stringify(b)
}

let passedTests = 0

//************************** */
//test getMinimumPrice
//************************** */

//test one- all on one driver
let res = '{ "car_type": "STANDARD", "price": 822975 },{ "car_type": "EXECUTIVE", "price": 161941 },{ "car_type": "LUXURY", "price": 464248 }'
let testTemplate = JSON.parse(`[{ "Driver":"DAVE", "Data": [${res}]}, { "Driver":"ERIC", "Data": []}, { "Driver":"JEFF", "Data": []}]`);
let expectedTestOne = { STANDARD: [ 822975, 'DAVE' ],EXECUTIVE: [ 161941, 'DAVE' ],LUXURY: [ 464248, 'DAVE' ] }

if(objComp(solution.getMinimumPrice(testTemplate), expectedTestOne)) passedTests++;

//test two- all from different drivers
let res1 = '{ "car_type": "STANDARD", "price": 822975 }'
let res2 = '{ "car_type": "LUXURY", "price": 43254 }'
let res3 = '{ "car_type": "EXECUTIVE", "price": 9593 }'

testTemplate = JSON.parse(`[{ "Driver":"DAVE", "Data": [${res1}]}, { "Driver":"ERIC", "Data": [${res2}]}, { "Driver":"JEFF", "Data": [${res3}]}]`);
let expectedTestTwo = { STANDARD: [ 822975, 'DAVE' ],LUXURY: [ 43254, 'ERIC' ], EXECUTIVE: [ 9593, 'JEFF' ] }

if(objComp(solution.getMinimumPrice(testTemplate), expectedTestTwo)) passedTests++;

//test three- all empty
testTemplate = JSON.parse(`[{ "Driver":"DAVE", "Data": []}, { "Driver":"ERIC", "Data": []}, { "Driver":"JEFF", "Data": []}]`);
let expectedTestThree = { }
if(objComp(solution.getMinimumPrice(testTemplate), expectedTestThree)) passedTests++;

//test four- clashing rides
let res4 = '{ "car_type": "STANDARD", "price": 822975 }, { "car_type": "LUXURY", "price": 2 }'
let res5 = '{ "car_type": "LUXURY", "price": 43254 }, { "car_type": "STANDARD", "price": 1 }'
let res6 = '{ "car_type": "EXECUTIVE", "price": 9593 }, { "car_type": "STANDARD", "price": 348737387487 }'

testTemplate = JSON.parse(`[{ "Driver":"DAVE", "Data": [${res4}]}, { "Driver":"ERIC", "Data": [${res5}]}, { "Driver":"JEFF", "Data": [${res6}]}]`);
let expectedTestFour = { STANDARD: [ 1, 'ERIC' ], LUXURY: [ 2, 'DAVE' ], EXECUTIVE: [ 9593, 'JEFF' ] }

if(objComp(solution.getMinimumPrice(testTemplate), expectedTestFour)) passedTests++;

//test five- emoty object [failure case for drivers]
if(objComp(solution.getMinimumPrice([]), {})) passedTests++;


//************************** */
//testing validateArgs
//************************** */
if(solution.validateArgs("51.470020,-0.454295", "51.00000,1.0000")) passedTests++;
if(solution.validateArgs("51.470020,-0.454295", "51.00000,1.0000", 3)) passedTests++;
if(solution.validateArgs("51.470020,-0.454295", "51.00000,1.0000", "3")) passedTests++;
if(!solution.validateArgs("51.470020,-0.454295", "51.00000,1.0000", "one")) passedTests++;
if(!solution.validateArgs("5143.470020,-0454295", "5123.00000,10000")) passedTests++;
if(!solution.validateArgs("51.00000,1.0000")) passedTests++;
if(!solution.validateArgs("51.470020", "1.0000")) passedTests++;
if(!solution.validateArgs(51.470020,-0.454295, 51.00000,1.0000)) passedTests++;
if(!solution.validateArgs("51.470020,-0.454295,-0.454295", "51.00000,1.0000, 1.0000")) passedTests++;
if(!solution.validateArgs("51.470020,--0.454295", "51.00000,1.000")) passedTests++;

console.log("Passed " + passedTests + " tests of 15")