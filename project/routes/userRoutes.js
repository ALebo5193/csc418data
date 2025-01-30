const router = require('express').Router();
const usersController = require('../controllers/usersController');

// View Routes (render HTML)
router.get('/', usersController.getAllUsersView); // View all users
router.get('/new', usersController.newUserView); // New user form
router.get('/:id', usersController.getUserView);  // View a specific user
router.get('/:id/edit', usersController.editUserView); // Edit user form

module.exports = router;
