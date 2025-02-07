'use strict';

const express = require( 'express' ),
  layouts = require( 'express-ejs-layouts' ),
  app = express(),
  homeController = require( './controllers/homeController' ),
  errorController = require( './controllers/errorController' ),
  bodyParser = require( 'body-parser' ),
  Subscriber = require('./models/subscriber'),
  mongoose = require("mongoose");

// Mongoose Handling
mongoose.connect(
  "mongodb://worker:27017/recipe_db"
);
const db = mongoose.connection;
db.once('open', () => console.log('open successful'));

async function findJon(){
  const query = Subscriber.findOne({'name': 'Jon Wexler'});
  query.select('name email');
  const jon = await query.exec();
  console.log(`${jon.name} can be emailed at ${jon.email}`)
}
findJon();



// App Handling
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

app.get( '/courses', homeController.showCourses );
app.get( '/contact', homeController.showSignUp );
app.post( '/contact', homeController.postedContactForm );

app.use( errorController.pageNotFoundError );
app.use( errorController.internalServerError );

app.listen( app.get( 'port' ), () => {
  console.log( `Server running at http://localhost:${app.get('port')}` );
} );
