const routeResponseMap = {
    "/info" :"<h1>Welcome to the info page pookie :3</h1>" ,
    "/contact" : "<h1>Welcome to the contact page pookie ^w^</h1>",
    "/about" : "<h1>Welcome to the about page pookie x3</h1>",
    "/hello" : "<h1>Welcome to the hello page pookie >W< </h1>",
    "/error" : "<h1>Welcome to the error page pookie >:3</h1>"
};

const port = 3000,
    http = require("http"),
    httpStatus = require("http-status-codes"),
    app = http.createServer((req, res) => {
        res.writeHead(httpStatus.OK, {
            "Content-Type": "text/html"
        });
        if(routeResponseMap[req.url]){
            //res.end(routeResponseMap[req.url]);
            setTimeout(() => res.end(routeResponseMap[req.url]), 2000); // manually delayed response
        }
        else{
            res.end("<h1>Welcome!</h1>");
        }
    });

app.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);