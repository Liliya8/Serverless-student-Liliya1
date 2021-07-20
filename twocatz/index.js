const fetch = require('node-fetch')

//function generate_name() {
// var names = ["Shreya", "Emily", "Fifi", "Beau", "Evelyn", "Julia", "Daniel", "Fardeen"];

//var random_number = Math.floor(names.length * Math.random());
// var random_name = names[random_number];
//return random_name;
//}

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');


    // let name1 = generate_name();
    // let name2 = generate_name();
    let name1 = req.query.name1
    let name2 = req.query.name2
    let name3 = req.query.name3
    let name4 = req.query.name4

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


    //let resp2 = await fetch(endpoint, {
    //   method: "GET"
    //});

    //let data2 = await resp2.arrayBuffer();
    //let base64data2 = Buffer.from(data2).toString('base64');
    context.res = {
        body: {
            cat1: cat1,
            cat2: cat2,
            cat3: cat3,
            cat4: cat4,
        }
    };

}
//update
//https://cataas.com/cat/cute/says/Serverless