const express = require( 'express' ),
    layouts = require( 'express-ejs-layouts' ),
    app = express(),
    homeController = require( './controllers/homeController' ),
errorController = require( './controllers/errorController' );

app.set( 'port', process.env.PORT || 3000 );
app.set( 'view engine', 'ejs' );

app.use( layouts );
app.use( homeController.logRequestPaths );

app.get( '/items/:vegetable', homeController.sendReqParam );
app.get( '/name/:myName', homeController.respondWithName );

app.use( errorController.logErrors );
app.use( errorController.respondNoResourceFound );
app.use( errorController.respondInternalError );
app.use(express.static("public"));

app.listen( app.get( 'port' ), () => {
    console.log( `Server running on port: ${ app.get( 'port' ) }` );
} );