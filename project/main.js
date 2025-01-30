const express = require('express'),
    path = require('path'),
    app = express(),
    expressLayouts = require("express-ejs-layouts"),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser')
    router = require('./routes/index'),
    methodOverride = require("method-override");

//mongo
mongoose.connect("mongodb://worker:27017/company_corp");
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

//app configuration
app.set( 'port', process.env.PORT || 3000 );
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(expressLayouts);
app.set("layout", "layout");
app.set('views', path.join(__dirname, 'views'))


app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.use('/', router);

//open the server
app.listen( app.get( 'port' ), () => {
    console.log( `Server running at http://localhost:${app.get('port')}` );
});