const fetch = require('node-fetch')

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let { name1, name2, name3, name4 } = req.query;

    async function getCat(name) {

        let endpoint = "https://cataas.com/cat/cute/says/" + name;
        let resp = await fetch(endpoint, {
            method: 'GET'
        });

        let data = await resp.arrayBuffer();
        let base64data = Buffer.from(data).toString('base64');
        return base64data;
    }

    let cat1 = await getCat(name1)
    let cat2 = await getCat(name2)
    let cat3 = await getCat(name3)
    let cat4 = await getCat(name4)

    let body = JSON.stringify({
        name1: cat1,
        name2: cat2,
        name3: cat3,
        name4: cat4,
    })

    body = JSON.parse(body)

    context.res = {
        body
    };

}
//update
//https://cataas.com/cat/cute/says/Serverless