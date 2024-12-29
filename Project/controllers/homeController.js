// In-memory storage to populate our users page
const usersData = [
    { name: 'Alice', gender: 'female' },
    { name: 'Bob', gender: 'male' },
    { name: 'Charlie', gender: 'other' }
];

//Routes
exports.showHome = function (req, res) {
    const currentDate = new Date();
    res.render('index', {
        currentTime: currentDate.toLocaleString()
    });
};

exports.showUsers =  function ( req, res ) {
    res.render( 'users', {users: usersData} );
};

exports.showContact = ( req, res ) => {
    res.render( 'contact' );
};

exports.postedContactForm = ( req, res ) => {
    const {name, gender} = req.body;
    usersData.push({name, gender}); //save the submitted data
    console.log(`Adding ${usersData.at(usersData.indexOf(name)).name} to the list`)
    res.redirect('/users'); //Redirect to show the users
};

exports.removeUser = (req, res) => {
    const userIndex = parseInt(req.params.index); // Get user index from URL

    // Check if the index is valid
    if (userIndex >= 0 && userIndex < usersData.length) {
        console.log(`Removing ${usersData.at(userIndex).name} from the list`)
        usersData.splice(userIndex, 1); // Remove the user from the array
    }

    // After removing, render the users page again with the updated list
    res.redirect('/users');
};