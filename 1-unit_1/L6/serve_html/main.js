const port = 3000,
http = require("http"),
httpStatusCodes = require("http-status-codes"),
router = require("./router"),
fs = require("fs"),
plainTextContentType = {
    "Content-Type" : "text/plain"
},
htmlContentType = {
    "Content-Type" : "text/html"
},
customReadFile = (file, res) => {
    fs.readFile(`./${file}`, (errors, data) => {
        if (errors){
            console.log("Error reading the file...");
        }
        res.end(data)
    });
};

router.get("/", (req, res) => {
    res.writeHead(httpStatusCodes.OK, htmlContentType);
    customReadFile("views/index.html", res)
});

router.get("/index.html", (req, res) => {
    res.writeHead(httpStatusCodes.OK, htmlContentType);
    customReadFile("views/index.html", res);
});

router.get("/index", (req, res) => {
    res.writeHead(httpStatusCodes.OK, htmlContentType);
    customReadFile("views/index.html", res);
});

router.get("/contact.html", (req, res) => {
    res.writeHead(httpStatusCodes.OK, htmlContentType);
    customReadFile("views/contact.html", res);
});

router.get("/contact", (req, res) => {
    res.writeHead(httpStatusCodes.OK, htmlContentType);
    customReadFile("views/contact.html", res);
});

router.post("/", (req, res) => {
    res.writeHead(httpStatusCodes.OK, plainTextContentType);
    res.end("POSTED");
});

http.createServer(router.handle).listen(3000);
console.log(`The server is listening on port number: ${port}`);

// 6.x-6.6
/*
const port = 3000,
    http = require("http"),
    httpStatus = require("http-status-codes"),
    fs = require("fs");
*/    
//6.4
/*
const sendErrorResponse = res => {
    res.writeHead(httpStatus.NOT_FOUND, {
        "Content-Type": "text/html"
    });
    res.write("<h1>File Not Found!</h1>");
    res.end();
};

const customReadFile = (file_path, res) => {
    if (fs.existsSync(file_path)){
        fs.readFile(file_path, (error, data) => {
            if (error) {
                console.log(error);
                sendErrorResponse(res);
                return;
            }
            res.write(data);
            res.end();
        });
    } else{
        sendErrorResponse(res);
    }
};

http.createServer((req, res) => {
    let url = req.url
    if(url.indexOf(".html") !== -1){
        res.writeHead(httpStatus.OK, {
            "Content-Type" : "text/html"
        });
        customReadFile(`./views${url}`, res);
    } else if (url.indexOf(".js") !== -1){
        res.writeHead(httpStatus.OK, {
            "Content-Type" : "text/javascript"
        });
        customReadFile(`./public/js${url}`, res);
    } else if (url.indexOf(".css") !== -1){
        res.writeHead(httpStatus.OK, {
            "Content-Type" : "text/css"
        });
        customReadFile(`./public/css${url}`, res);
    }
}).listen(port);
console.log(`The server has started and is listening on port number: ${port}`);
*/

//6.3
/*
const getViewUrl = (url) => {
    return `views${url}.html`
};

http.createServer((req, res) => {
    let viewUrl = getViewUrl(req.url);
    fs.readFile(viewUrl, (error, data) => {
        if (error){
            res.writeHead(httpStatus.NOT_FOUND);
            res.write("<h1>FILE NOT FOUND</h1>");
        } else{
            res.writeHead(httpStatus.OK, {"Content-Type":"text/html"});
            res.write(data);
        }
        res.end();
    });
}).listen(port);
console.log(`The server has started and is listening on port number: ${port}.`);
*/

// 6.2
/*
const routeMap = {
    "/" : "views/index.html",
    "/contact" : "views/contact.html"
}

http
    .createServer((req, res) => {
        res.writeHead(httpStatus.OK, {
            "Content-Type" : "text/html"
        });
        if (routeMap[req.url]){
            fs.readFile(routeMap[req.url], (error, data) => {
                res.write(data);
                res.end();
            });
        }
        else{
            res.end("<h1>Sorry, not found.</h1>");
        }
    }).listen(port);
    console.log(`The server has started and is listening on port number: ${port}`);
*/