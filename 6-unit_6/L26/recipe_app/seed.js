const mongoose = require( 'mongoose' ),
  Subscriber = require( './models/subscriber' ),
  Course = require( './models/course' );

mongoose.connect( 'mongodb://worker:27017/recipe_db' );
mongoose.connection;

var commands = []; 

// SUBSCRIBERS
var contacts = [
  {
    name: 'Jon Wexler',
    email: 'jon@jonwexler.com',
    zipCode: 10016
  },
  {
    name: 'Drew Lebo',
    email: 'DrewLebo2@gmail.com',
    zipCode: 19382
  },
  {
    name: 'Chef Eggplant',
    email: 'eggplant@recipeapp.com',
    zipCode: 20331
  } ];

Subscriber.deleteMany( {} )
  .exec()
  .then( () => {
    console.log( 'Subscriber data is empty!' );
  } );


contacts.forEach( ( c ) => {
  commands.push( Subscriber.create( {
    name: c.name,
    email: c.email
  } ) );
} );

Promise.all( commands )
  .then( r => {
    console.log( JSON.stringify( r ) );
    mongoose.connection.close();
  } )
  .catch( error => {
    console.log( `ERROR: ${error}` );
  } );
