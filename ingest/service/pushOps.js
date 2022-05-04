const url = require('url');
const axios = require('axios');
const redis = require('../../storage/Redis');






//Get Initial Settings
const getPushSettings = async() => {
    let payload = { token: process.env.PUSHTOKEN };
    const params = new url.URLSearchParams(payload);
    let res = await axios.get(`https://app-elb.pushoperations.com/api/v1/company/setting?${params}&userableType=employee`)
    .then((res) => {
        console.log(`Hello ${res.data.data[0].firstname} ${res.data.data[0].lastname} UserID:${res.data.data[0].userableId} CompanyID:${res.data.data[0].companyId}`);
        redis.client.set('PushToken', res.data.token);
        redis.client.set('PushCompanyId', res.data.data[0].companyId);
        redis.client.set('PushCompanyName', res.data.data[0].company);
        redis.client.set('PushUserableId', res.data.data[0].userableId);
        redis.client.set('PushUserId', res.data.data[0].userId);
        }
    ).catch(err => {
        console.log(err);
    });
    return res;
}



const getSelfSchedule = async() => {
    let payload = { companyId: await redis.client.get('PushCompanyId'), employeeId: await redis.client.get('PushUserableId'), token: await redis.client.get('PushToken') };
    const params = new url.URLSearchParams(payload);
    let res = await axios.get(`https://app-elb.pushoperations.com/api/v1/ios/getMySchedules?${params}`)
    .then((res) => {
        const obj = res.data.mySchedules;
        const entries = Object.entries(obj);

        entries.forEach(([key, value]) => {
            redis.client.set(`Schedule:${value.business_date}`, JSON.stringify(value));
            console.log(`Start: ${value.scheduled_start_str} - End: ${value.scheduled_end_str} Hours: ${value.regular_hours}`);
        })

        }).catch(err => {
            console.log(err);
        });
}


const getClockStatus = async(res, req) => {
    let payload = { start: '2022-03-02', end: '2040-01-01', token: await redis.client.get('PushToken') };
    const params = new url.URLSearchParams(payload);

    const respond = await axios.get(`https://app-elb.pushoperations.com/api/v2/clocks/employee/${await redis.client.get('PushUserableId')}?${params}`).then((res) => {

        const obj = res.data.data;
        const entries = Object.entries(obj);

        entries.forEach(([key, value]) => {
            redis.client.set(`Workday:${value.businessDate}`, JSON.stringify(value));
            console.log(`${key} - ${value.id}`);
            return data;
        })

    }).catch(err => {
        console.log(err);
    });
}


const cleanup = async() => {
    var present=new Date();
    var past=new Date(present);
    past.setDate(past.getDate() - 10);
    const oldDate = past.toISOString().split('T')[0];

    console.log(oldDate);
}



const test = async() => {
    console.log(await getClockStatus());
}

test();
module.exports = { getPushSettings, getSelfSchedule };