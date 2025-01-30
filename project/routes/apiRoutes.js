const router = require("express").Router(),
    usersController = require("../controllers/usersController");

// Fetch all users
router.get("/users", usersController.getAllUsers);

// Create a new user
router.post("/users", usersController.createUser);

// Get a specific user by ID
router.get("/users/:id", usersController.getUser);

// Update a user by ID
router.put("/users/:id", usersController.updateUser);

// Delete a user by ID
router.delete("/users/:id", usersController.deleteUser);

module.exports = router;
