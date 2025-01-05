const User = require("../models/user");

exports.showHome = function (req, res) {
    res.render('index');
};


exports.showContact = ( req, res ) => {
    res.render( 'contact' );
};

exports.editUserForm = async (req, res) => {
    const { id } = req.params; // Destructure id from the URL
    try {
        const user = await User.findById(id); // Fetch user from MongoDB
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.render('edit-user', { user }); // Render the edit-user view with the user data
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving user');
    }
};

//Create
exports.postedContactForm = async ( req, res ) => {
    const {name, gender} = req.body;
    try{
        const newUser = await User.create({name, gender});
        console.log(`User added: ${JSON.stringify(newUser)}`);
        res.redirect('/users');
    } catch (err){
        console.error(err);
        res.status(500).send('Error saving user')
    }
};

//Read
exports.showUsers =  async ( req, res ) => {
    try{
        const users = await User.find();
        res.render('users', { users });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving users');
    }
};

//Update
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, gender } = req.body;
    try {
        const user = await User.findByIdAndUpdate(id, { name, gender }, { new: true });
        console.log(`User updated: ${JSON.stringify(user)}`);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.redirect('/users');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating user');
    }
};

//Delete
exports.removeUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (deletedUser) {
            console.log(`User removed: ${JSON.stringify(deletedUser)}`);
        } else {
            console.log(`No user found with ID: ${id}`);
        }
        res.redirect('/users');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting user');
    }
};