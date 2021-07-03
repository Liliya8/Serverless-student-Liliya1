const querystring = require('querystring');
const fetch = require('node-fetch'); // use this to make requests 

module.exports = async function (context, req) {
    context.log('reqBody:', reqBody);
    const reqBody = req.body;

    const queryObject = queryString.parse(req.Body);
    context.log('queryObject:', queryObject);
    context.log(queryObject.MediaUrl0);
    let resp = await fetch(queryObject.MediaUrl0, {
        method: 'GET',
    });
    let data = await resp.arrayBuffer();
    context.log(data);

    let result = await analyzeImage(data);
    context.log(result);

    let age = parseInt(result[0].faceAttriutes.age);
    context.log(age);
    let generation = '';

    if (age > 5 && age < 25) {
        generation = 'Genz';
    } else if (age > 24 && age < 41) {
        generation = 'GenY';
    } else if (age > 40 && age < 57) {
        generation = 'GenX';
    } else if (age > 56 && age < 76) {
        generation = 'BabyBoomers';
    } else {
        generation = 'unknown';
    }
    context.log(generation);
    context.res = {
        //status:200, /* Defaults to 200 */
        body: generation
    };
}
async function analyzeImage(image) {
    //subscription key and endpoint
    //const suscriptKey=process.env.SUBSCRIPTION_KEY;
    //const theUrl=process.env.SONGREC_ENDPOINT+'face/v1.0/detect';
    const subscriptKey = process.env.SUBSCRIPTIONKEY;
    const theUrl = process.env.ENDPOINT + 'face/v1.0/detect';

    let theParameters = new URLSearchParams({
        'returnFaceId': 'true',
        'returnFaceAttributes': 'age'
    });

    let resp = await fetch(theUrl + '?' + theParameters.toString(), {
        method: 'POST',
        body: image,
        headers: {
            'Content-Type': 'application/octet-stream',
            'Ocp-Apim-Subscription-Key': subscriptKey
        }
    });

    let data = await resp.json();
    return data;


}