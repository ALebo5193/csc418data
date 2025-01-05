'use strict';
const express = require( 'express' ),
  layouts = require( 'express-ejs-layouts' ),
  app = express(),
  homeController = require( './controllers/homeController' ),
  errorController = require( './controllers/errorController' ),
  subscribersController = require('./controllers/subscribersController'),
  mongoose = require("mongoose"),
  bodyParser = require( 'body-parser' );

//Mongoose
mongoose.connect("mongodb://worker:27017/confetti_cuisine");

var db = mongoose.connection;
mongoose.Promise = global.Promise;
db.once( 'open', () => {
  console.log( 'Successfully connected to MongoDB using Mongoose!' );
} );

//App Config
app.set( 'port', process.env.PORT || 3000 );

app.set( 'view engine', 'ejs' );
app.use( layouts );
app.use( express.static( 'public' ) );

app.use( bodyParser.urlencoded( {
  extended: false
} ) );
app.use( bodyParser.json() );

//Routes
app.get( '/', ( req, res ) => {
  res.render( 'index' );
} );

app.get( '/courses', homeController.showCourses );
app.get('/subscribers', subscribersController.getAllSubscribers);
app.get('/contact', subscribersController.getSubscriptionPage);
app.post('/subscribe', subscribersController.saveSubscriber);

//Error Handling
app.use( errorController.pageNotFoundError );
app.use( errorController.internalServerError );

app.listen( app.get( 'port' ), () => {
  console.log( `Server running at http://localhost:${app.get('port')}` );
} );
