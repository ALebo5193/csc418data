const mongoose = require('mongoose'),
  Subscriber = require('./models/subscriber'),
  Course = require('./models/course');

mongoose.set('strictQuery', true); // Suppress strictQuery warning
mongoose.connect('mongodb://worker:27017/recipe_db');
mongoose.Promise = global.Promise;

let testCourse, testSubscriber;

// REMOVE ALL SUBSCRIBERS
Subscriber.deleteMany({})
  .then((result) => console.log(`Removed ${result.deletedCount} subscribers!`))

  // REMOVE ALL COURSES
  .then(() => {
    return Course.deleteMany({});
  })
  .then((result) => console.log(`Removed ${result.deletedCount} courses!`))

  // CREATE A SUBSCRIBER
  .then(() => {
    return Subscriber.create({
      name: 'Jon',
      email: 'jon@jonwexler.com',
      zipCode: '12345',
    });
  })
  .then((subscriber) => {
    console.log(`Created Subscriber: ${subscriber.getInfo()}`);
    return Subscriber.findOne({ name: 'Jon' });
  })
  .then((subscriber) => {
    testSubscriber = subscriber;
    console.log(`Found one subscriber: ${subscriber.getInfo()}`);
    return Course.create({
      title: 'Tomato Land',
      description: 'Locally farmed tomatoes only',
      zipCode: 12345,
      items: ['cherry', 'heirloom'],
    });
  })
  .then((course) => {
    testCourse = course;
    console.log(`Created course: ${course.title}`);
    testSubscriber.courses.push(testCourse);
    return testSubscriber.save();
  })
  .then(() => {
    return Subscriber.populate(testSubscriber, 'courses');
  })
  .then((subscriber) => {
    console.log(subscriber);
    return Subscriber.find({
      courses: testCourse._id,
    });
  })
  .then((subscribers) => console.log(subscribers))
  .catch((error) => console.log(error.message))