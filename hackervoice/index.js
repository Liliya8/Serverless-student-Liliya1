module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var password = req.query.password
    var your_response = "Access denied."
    if (password == "letmein") {
        your_response = "Access granted."
    }
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: your_response
    };
}