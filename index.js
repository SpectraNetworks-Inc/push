require('dotenv').config();
//Deps
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const url = require('url');
const redisClient = require('./storage/Redis');


//Config Assignment
const ServerPort = process.env.PORT || 3000;
const PUSHKEY = process.env.PUSHTOKEN;


//App Assign
const app = express();
app.use(bodyParser.json());
app.use(cors());

//Routes
const routesV1 = require('./routes/v1');
app.use('/v1', routesV1);
//Core Service Start
app.get('/', (req, res) => {
    res.send('Dev')
  })



app.listen(ServerPort, () => {
    console.log(`App ${ServerPort}`)
  })

module.exports = {
    app,
    PUSHKEY
};