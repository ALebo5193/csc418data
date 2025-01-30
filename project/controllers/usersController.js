const User = require('../models/User');

module.exports = {
  // Fetch all users
  getAllUsers: (req, res) => {
    User.find()
      .then(users => {
        res.status(200).json(users);  // Return users as JSON
      })
      .catch(error => {
        res.status(500).json({ message: `Error fetching users: ${error.message}` });
      });
  },

  // Create a user
  createUser: async (req, res) => {
    const userParams = req.body;
    try{
      await User.create(userParams)
      res.redirect('/users');
    }
    catch{
      (error) => {
        res.status(400).json({ message: `Error creating user: ${error.message}` });
      }
    };
  },

  // Get a specific user
  getUser: (req, res) => {
    const userId = req.params.id;
    User.findById(userId)
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);  // Return the user data
      })
      .catch(error => {
        res.status(500).json({ message: `Error fetching user: ${error.message}` });
      });
  },

  // Update a user
  updateUser: async (req, res) => {
    try {
        // req.body contains the form data
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.redirect(`/users/${updatedUser._id}`);
    } catch (err) {
        res.status(400).send(err);
    }
  },

  // Delete a user
  deleteUser: async (req, res) => {
    try {
        const userId = req.params.id;
        await User.findByIdAndDelete(userId);
        res.redirect('/users');
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting user.");
    }
  },

  // Functions for serving the view

  // Fetch all users
  getAllUsersView: async (req, res) => {
    try {
      const users = await User.find();
      res.render('users/index', { users }); 
    } catch (err) {
      console.error(err);
      res.status(500).send("Error fetching users.");
    }
  },

  // Get a specific user
  getUserView: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.render('users/show', { user });  // views/users/show.ejs
    } catch (err) {
      console.error(err);
      res.status(500).send("Error fetching user.");
    }
  },

  // Render the 'edit' view for a specific user
  editUserView: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.render('users/edit', { user });  // views/users/edit.ejs
    } catch (err) {
      console.error(err);
      res.status(500).send("Error fetching user for edit.");
    }
  },

  // Render the 'new' user creation form
  newUserView: (req, res) => {
    res.render('users/new'); // views/users/new.ejs
  }
};
