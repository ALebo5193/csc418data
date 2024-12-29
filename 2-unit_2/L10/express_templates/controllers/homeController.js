exports.respondWithName = (req, res) => {
    let paramsName = req.params.myName;
    res.render("index", { name: paramsName });
};

exports.sendReqParam = ( req, res ) => {
    let veg = req.params.vegetable;
    res.send( `This is the page for ${veg}` );
};

exports.logRequestPaths = (req, res, next) => {
    console.log(`Request Paths: {url : ${req.url}, params : ${req.params}, body : ${req.body}}`)
    next()
}