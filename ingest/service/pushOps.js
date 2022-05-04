const url = require('url');
const axios = require('axios');


//Get Initial Settings
const getPushSettings = async() => {
    let payload = { token: process.env.PUSHTOKEN };
    const params = new url.URLSearchParams(payload);
    let res = await axios.get(`https://app-elb.pushoperations.com/api/v1/company/setting?${params}&userableType=employee`)
    .then((res) => {
        console.log(res.data.status);
        console.log('Data GET Success');
        }
    ).catch(err => {
        console.log(err);
    });
    return res;
}

module.exports = { getPushSettings };