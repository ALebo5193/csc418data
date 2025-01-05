'use strict';

const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");

// Connect to the MongoDB database
mongoose.connect("mongodb://worker:27017/confetti_cuisine")
    .then(() => console.log("Connected to MongoDB!"))
    .catch(err => console.error("Connection error:", err));

const contacts = [
    {
        name: "Jon Wexler",
        email: "jon@jonwexler.com",
        zipCode: 10016
    },
    {
        name: "Drew Lebo",
        email: "drewlebo2@gmail.com",
        zipCode: 19382
    },
    {
        name: "Chef Eggplant",
        email: "eggplant@recipeapp.com",
        zipCode: 20331
    }
];

// Clear the Subscriber collection and populate it with new data
(async () => {
    try {
        // Delete all subscribers
        await Subscriber.deleteMany({});
        console.log("Subscriber data is empty!");

        // Create new subscribers
        const result = await Subscriber.insertMany(contacts);
        console.log("Subscribers added:", result);

    } catch (error) {
        console.error("ERROR:", error);
    } finally {
        // Close the connection
        mongoose.connection.close(() => {
            console.log("MongoDB connection closed.");
        });
    }
})();
