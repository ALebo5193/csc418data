const userModel = require("../models/userModel");

//Routes
exports.showHome = function (req, res) {
    res.render('index');
};

exports.showUsers =  function ( req, res ) {
    const usersData = userModel.getUsers()
    res.render( 'users', {users: usersData} );
};

exports.showContact = ( req, res ) => {
    res.render( 'contact' );
};