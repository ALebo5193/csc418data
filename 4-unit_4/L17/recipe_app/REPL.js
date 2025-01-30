// SETUP
const mongoose = require( 'mongoose' ),
  Subscriber = require( './models/subscriber' ),
  Course = require( './models/course' );

var testCourse,
  testSubscriber;
mongoose.set('strictQuery', false);
mongoose.connect( 'mongodb://localhost/recipe_db',
{useNewUrlParser: true, useUnifiedTopology: true, family:4} );

mongoose.Promise = global.Promise;


// PROMISE CHAIN

// REMOVE ALL SUBSCRIBERS
Subscriber.deleteMany( {} )
  .then( ( items ) =>{
        console.log( `Removed ${items.deletedCount} record(s)!` ) })

  // REMOVE ALL COURSES
  .then( () => {
    return Course.deleteMany( {} );
  } )
  .then( ( items ) => {
         
 
           console.log( `Removed ${items.deletedCount} record(s)!` )} )

  // CREATE A SUBSCRIBER
  .then( () => {
    return Subscriber.create( {
      name: 'Jon',
      email: 'jon@jonwexler.com',
      zipCode: '12345'
    } );
  } )
  .then( subscriber => {
    console.log( `Created Subscriber: ${subscriber.getInfo()}` );
  } )

  // FIND A SUBSCRIBER
  .then( () => {
    return Subscriber.findOne( {
      name: 'Jon'
    } );
  } )

  // SAVE SUBSCRIBER AS testSubscriber
  .then( subscriber => {
    testSubscriber = subscriber;
    console.log( `Found one subscriber: ${subscriber.getInfo()}` );
  } )

  // CREATE A COURSE
  .then( () => {
    return Course.create( {
      title: 'Tomato Land',
      description: 'Locally farmed tomatoes only',
      zipCode: 12345,
      items: [ 'cherry', 'heirloom' ]
    } );
  } )
  // SAVE COURSE AS testCourse
  .then( course => {
    testCourse = course;
    console.log( `Created course: ${course.title}` );
  } )

  // ASSOCIATE SUBSCRIBER WITH COURSE AND SAVE
  .then( () => {
    testSubscriber.courses.push( testCourse._id );
    testSubscriber.save();
  } )

  // POPULATE SUBSCRIBER DOCUMENT WITH COURSE DATA AND LOG
  .then( () => {
    return Subscriber.populate( testSubscriber, 'courses' );
  } )
  .then( subscriber => console.log( subscriber ) )
  .then( () => {
    return Subscriber.find( { courses: mongoose.Types.ObjectId( testCourse._id ) } );
  } )
  .then( subscriber => console.log( subscriber ) )
  .catch( error => console.log( error.message ) );
