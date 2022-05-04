const Redis = require('ioredis');
const RedisHostname = process.env.REDIS_HOST;
const RedisPort = process.env.REDIS_PORT;
const RedisPassword = process.env.REDIS_PASSWORD;
const RedisURL = process.env.REDIS_URL;

let client = new Redis(RedisURL);


module.exports = { client };