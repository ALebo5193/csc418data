'use strict';

const express = require( 'express' ),
  layouts = require( 'express-ejs-layouts' ),
  app = express(),
  homeController = require( './controllers/homeController' ),
  errorController = require( './controllers/errorController' ),
  bodyParser = require( 'body-parser' );
  console.log("pass 1");
const
  MongoDB = require( 'mongodb' ).MongoClient;
  console.log("pass 2");
const
  dbURL = 'mongodb://worker:27017/';
  console.log("pass 3");
const
  dbName = 'recipe_db';
  console.log("pass 4");  
 
MongoDB.connect( dbURL, 
  { useNewUrlParser: true, 
    useUnifiedTopology: true,
    family: 4
  },
  ( error, client ) => {
  if ( error ) throw error;
  let db = client.db( dbName );
  console.log(`pass 5- connect to ${dbName}`);
  db.collection( 'contacts' )
    .find()
    .toArray( ( error, data ) => {
      if ( error ) throw error;
      console.log( data );
    } );
  console.log("pass 6- db.collect contacts")
  db.collection( 'contacts' )
    .insertOne( {
      name: 'Freddie Mercury',
      email: 'fred@queen.com'
    }, ( error, db ) => {
      if ( error ) throw error;
      console.log( 'insertOne Done!' );
    } );
} );
console.log("pass 6 ");
app.set( 'port', process.env.PORT || 3000 );

app.set( 'view engine', 'ejs' );
app.use( layouts );
app.use( express.static( 'public' ) );

app.use( bodyParser.urlencoded( {
  extended: false
} ) );
app.use( bodyParser.json() );

console.log("pass 7");
app.get( '/', ( req, res ) => {
  res.render( 'index' );
} );

app.get( '/courses', homeController.showCourses );
app.get( '/contact', homeController.showSignUp );
app.post( '/contact', homeController.postedContactForm );

console.log("pass 8")
app.use( errorController.pageNotFoundError );
app.use( errorController.internalServerError );

app.listen( app.get( 'port' ), () => {
  console.log( `Server running at http://localhost:${app.get('port')}` );
} );
