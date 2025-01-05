const port = 3000,
    http = require("http"),
    httpStatus = require("http-status-codes"),
    app = http.createServer();
    const getJSONString = obj => {
        return JSON.stringify(obj, null, 2);
    };
    
    // 5.4-5.5
    app.on("request", (req, res) => {
        var body = [];
        req.on("data", (bodyData) => {
            body.push(bodyData)
        });
        req.on("end", () => {
            body = Buffer.concat(body).toString();
            console.log(`Request Body Contents: ${body}`)
        });

        console.log(`Method: ${getJSONString(req.method)}`);
        console.log(`URL: ${getJSONString(req.url)}`)
        console.log(`Headers: ${getJSONString(req.headers)}`);

        res.writeHead(httpStatus.OK, {
            "Content-Type": "text/html"
        });

        let responseMessage = "<h1>This will show on the screen.</h1>"
        res.end(responseMessage)
    });

    /*
    //5.1-5.3
    app.on("request", (req, res) => {
        res.writeHead(httpStatus.OK, {
            "Content-Type": "text/html"
        });
        console.log(`request method: ${getJSONString(req.method)}`);
        console.log(`request url: ${getJSONString(req.url)}`);
        console.log(`request headers: ${getJSONString(req.headers)}`);
        let responseMessage = "<h1>This will show on the screen.</h1>";
        res.end(responseMessage);
    });
    */

    app.listen(port);
    console.log(`The server has started and is listening on port number: 
        ${port}`);