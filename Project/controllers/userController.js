const userModel = require("../models/userModel");

exports.postedContactForm = ( req, res ) => {
    const {name, gender} = req.body,
    usersData = userModel.getUsers();
    usersData.push({name, gender}); //save the submitted data
    console.log(`Adding ${usersData.at(usersData.indexOf(name)).name} to the list`)
    res.redirect('/users'); //Redirect to show the users
};

exports.removeUser = (req, res) => {
    const userIndex = parseInt(req.params.index), // Get user index from URL
    usersData = userModel.getUsers();

    // Check if the index is valid
    if (userIndex >= 0 && userIndex < usersData.length) {
        console.log(`Removing ${usersData.at(userIndex).name} from the list`)
        usersData.splice(userIndex, 1); // Remove the user from the array
    }

    // After removing, render the users page again with the updated list
    res.redirect('/users');
};