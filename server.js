
const solution = require('./solution');
const express = require('express')

//set up node express server
const app = express()
const port = 3000

//simple index message
app.get('/', (req, res) => {
    res.send("Please hit the /transport route with: Pickup, Dropoff, Number of passengers[Optional]")
})

//simple endpoint to call solution function
//call API with provided user parameters
app.get('/transport', async (req, res) => {
    let pickup = req.query.pickup 
    let dropoff = req.query.dropoff
    let passengers = req.query.pass === undefined ? 1 : req.query.pass

    if(solution.validateArgs(pickup, dropoff, passengers)){
        let ret = await solution.callable(pickup, dropoff, passengers)
        res.send({success: true, data: ret})
    } else {
        res.send({success: false, data: "Malformed request parameters: please check request data and try again"})
    }
})

app.listen(port, () => console.log(`Solution app listening on port ${port}!`))