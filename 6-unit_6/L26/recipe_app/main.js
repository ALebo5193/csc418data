'use strict';

const express = require( 'express' ),
  layouts = require( 'express-ejs-layouts' ),
  app = express(),
  router = require('./routes/index'),

  bodyParser = require( 'body-parser' ),
  mongoose = require( 'mongoose' ),
  methodOverride = require( 'method-override' );

mongoose.Promise = global.Promise;


mongoose.connect( 'mongodb://worker:27017/recipe_db');
const db = mongoose.connection;

db.once( 'open', () => {
  console.log( 'Successfully connected to MongoDB using Mongoose!' );
} );

app.set( 'port', process.env.PORT || 3000 );
app.set( 'view engine', 'ejs' );

app.use( layouts );

app.use( methodOverride( '_method', {
  methods: [ 'POST', 'GET' ]
} ) );

app.use( express.static( 'public' ) );

app.use( bodyParser.urlencoded( {
  extended: false
} ) );
app.use( bodyParser.json() );

app.use( '/', router );

app.listen( app.get( 'port' ), () => {
  console.log( `Server running at http://localhost:${app.get('port')}` );
} );
