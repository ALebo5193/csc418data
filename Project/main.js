const express = require('express'),
    path = require('path'),
    app = express(),
    expressLayouts = require("express-ejs-layouts"),
    homeController = require('./controllers/homeController'),
    userController = require('./controllers/userController'),
errorController = require('./controllers/errorController');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(expressLayouts);
app.set("layout", "layout");
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.set( 'port', process.env.PORT || 3000 );

//routes
app.get('/', homeController.showHome);
app.get('/contact', homeController.showContact);
app.post('/submit-contact', userController.postedContactForm);
app.get('/users', homeController.showUsers);
app.post('/remove-user/:index', userController.removeUser);

//error handling
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError)

//open the server
app.listen( app.get( 'port' ), () => {
    console.log( `Server running at http://localhost:${app.get('port')}` );
});