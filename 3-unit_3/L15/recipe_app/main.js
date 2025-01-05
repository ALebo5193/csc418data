'use strict';

const express = require( 'express' ),
  layouts = require( 'express-ejs-layouts' ),
  app = express(),
  subscribersController = require('./controllers/subscribersController'),
  homeController = require( './controllers/homeController' ),
  errorController = require( './controllers/errorController' ),

  bodyParser = require( 'body-parser' ),
  mongoose = require( 'mongoose' );

mongoose.Promise = global.Promise;
mongoose.connect( 'mongodb://worker:27017/recipe_db');
var db = mongoose.connection;

db.once( 'open', () => {
  console.log( 'Successfully connected to MongoDB using Mongoose!' );
} );

app.set( 'port', process.env.PORT || 3000 );

app.set( 'view engine', 'ejs' );
app.use( layouts );
app.use( express.static( 'public' ) );

app.use( bodyParser.urlencoded( {
  extended: false
} ) );
app.use( bodyParser.json() );

app.get( '/', ( req, res ) => {
  res.render( 'index' );
} );

app.get("/subscribers", subscribersController.getAllSubscribers, (req, res, next) => {
  console.log(req.data);
  res.send(req.data);
});

app.get( '/courses', homeController.showCourses );
app.get( '/contact', subscribersController.getSubscriptionPage);
app.post( '/subscribe', subscribersController.saveSubscriber);
app.post( '/contact', homeController.postedContactForm );
app.get( '/subscribers', subscribersController.getAllSubscribers,
(req, res, next) => {
  console.log(req.data);
  res.send(req.data);
});

app.use( errorController.pageNotFoundError );
app.use( errorController.internalServerError );

app.listen( app.get( 'port' ), () => {
  console.log( `Server running at http://localhost:${app.get('port')}` );
} );
