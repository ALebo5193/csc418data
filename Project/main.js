const express = require('express'),
    path = require('path'),
    app = express(),
    expressLayouts = require("express-ejs-layouts"),
    homeController = require('./controllers/homeController'),
    mongoose = require('mongoose'),
errorController = require('./controllers/errorController');


//app configuration
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(expressLayouts);
app.set("layout", "layout");
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.set( 'port', process.env.PORT || 3000 );

//mongo
mongoose.connect("mongodb://worker:27017/company_corp");

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

//routes
app.get('/', homeController.showHome);
app.get('/contact', homeController.showContact);
app.post('/submit-contact', homeController.postedContactForm);
app.get('/users', homeController.showUsers);
app.post('/users/:id/delete', homeController.removeUser);
app.get('/edit-user/:id', homeController.editUserForm);
app.post('/update-user/:id', homeController.updateUser);

//error handling
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError)

//open the server
app.listen( app.get( 'port' ), () => {
    console.log( `Server running at http://localhost:${app.get('port')}` );
});