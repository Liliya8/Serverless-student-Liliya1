const querystring = require('querystring');
const fetch = require('node-fetch'); // use this to make requests 

module.exports = async function (context, req) {
    const reqBody = req.body;
    context.log('reqBody:', reqBody);

    const queryObject = querystring.parse(req.body);
    context.log('queryObject:', queryObject);
    context.log(queryObject.MediaUrl0);
    let resp = await fetch(queryObject.MediaUrl0, {
        method: 'GET',
    });
    let data = await resp.arrayBuffer();
    context.log(data);

    let result = await analyzeImage(data);
    context.log(result);

    let age = parseInt(result[0].faceAttributes.age);
    context.log(age);
    let generation = '';

    const songs = {
        "GenZ": "https://open.spotify.com/track/0SIAFU49FFHwR3QnT5Jx0k?si=1c12067c9f2b4fbf",
        "GenY": "https://open.spotify.com/track/1Je1IMUlBXcx1Fz0WE7oPT?si=a04bbdf6ec4948b9",
        "GenX": "https://open.spotify.com/track/4Zau4QvgyxWiWQ5KQrwL43?si=790d9e3ef2ed408d",
        "BabyBoomers": "https://open.spotify.com/track/4gphxUgq0JSFv2BCLhNDiE?si=1abb329f2dc24f50",
        "Unknown": "https://open.spotify.com/track/5ygDXis42ncn6kYG14lEVG?si=84b49b41d09d4d11"
    }

    if (age > 5 && age < 25) {
        generation = 'GenZ';
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

    const url = songs[generation]

    const message = `We guessed you're part of this generation: ${generation}! Happy listening! ${url}`

    context.res = {
        //status:200, /* Defaults to 200 */
        body: message
    };
}
async function analyzeImage(image) {
    //subscription key and endpoint
    //const suscriptKey=process.env.SUBSCRIPTION_KEY;
    //const theUrl=process.env.SONGREC_ENDPOINT+'face/v1.0/detect';
    const subscriptKey = process.env.FACEAPI_ENDPOINTT;
    const theUrl = process.env.FACEAPI_ENDPOINTT + 'face/v1.0/detect';

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