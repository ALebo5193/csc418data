const mongoose = require("mongoose"),
Subscriber = require("./models/subscriber");
mongoose.connect("mongodb://worker:27017/recipe_db");

mongoose.connection;

var contacts = [
    {
        name:"Jon Wexler",
        email:"jon@jonwexler.com",
        zipCode: 10016
    },
    {
        name:"Drew Lebo",
        email:"drewlebo2@gmail.com",
        zipCode:19382
    },
    {
        name: "Chef Eggplant",
        email:"eggplant@recipeapp.com",
        zipCode:20331
    }
];

Subscriber.deleteMany().exec()
    .then(() => {
        console.log("Subscriber data is empty!");
    });

var commands = [];

contacts.forEach((c) => {
    commands.push(Subscriber.create({
        name: c.name,
        email: c.email
    }));
});

Promise.all(commands)
    .then(r => {
        console.log(JSON.stringify(r));
        mongoose.connection.close()
}).catch(error =>{
    console.log(`ERROR: ${error}`);
});