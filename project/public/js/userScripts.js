// Fetch and display user details
function fetchUserDetails(userId) {
    fetch(`/api/users/${userId}`)
        .then(response => response.json())
        .then(user => {
            const userDetailsDiv = document.getElementById('userDetails');
            userDetailsDiv.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${user.name}</h5>
                        <p class="card-text"><strong>Gender:</strong> ${user.gender}</p>
                    </div>
                </div>
            `;
            // Handle edit and delete links
            document.getElementById('editUser').href = `/users/${user._id}/edit`;
            document.getElementById('deleteUserForm').action = `/users/${user._id}/delete`;
        })
        .catch(error => console.error('Error fetching user details:', error));
}

// Update user information
document.getElementById('editUserForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(this); // Gather form data
    const data = {
        name: formData.get('name'),
        gender: formData.get('gender'),
        _method: formData.get('_method')
    };

    // Sending the PUT request using Fetch API
    fetch('/api/users/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            // Add authentication header if necessary (e.g., token)
        },
        body: JSON.stringify(data) // Convert form data to JSON
    })
    .then(response => response.json()) // Parse the JSON response
    .then(data => {
        if (data.success) {
            alert('User updated successfully!');
            window.location.href = '/users'; // Redirect to users page on success
        } else {
            alert('Error updating user!');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while updating the user.');
    });
});

// Create a new user
document.getElementById('createUserForm')?.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const gender = document.getElementById('gender').value;

    fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, gender }),
    })
        .then(response => response.json())
        .then(user => {
            alert('User created successfully!');
            window.location.href = '/users';
        })
        .catch(error => console.error('Error creating user:', error));
});

// Delete user
document.getElementById('deleteUserForm')?.addEventListener('submit', function (event) {
    event.preventDefault();

    const userId = window.location.pathname.split('/')[2];

    fetch(`/api/users/${userId}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(user => {
            alert('User deleted successfully!');
            window.location.href = '/users';
        })
        .catch(error => console.error('Error deleting user:', error));
});

// Fetch all users and populate the table
function fetchUsers() {
    fetch('/api/users')
        .then(response => response.json())
        .then(userData => {
            const userTableBody = document.getElementById('userTableBody');
            userTableBody.innerHTML = '';
            userData.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.name}</td>
                    <td>${user.gender}</td>
                    <td>
                        <a href="/users/${user._id}" class="btn btn-info">View</a>
                        <a href="/users/${user._id}/edit" class="btn btn-warning">Edit</a>
                        <button class="btn btn-danger" onclick="deleteUser('${user._id}')">Delete</button>
                    </td>
                `;
                userTableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching users:', error));
}

// Delete user function for the users list
function deleteUser(userId) {
    fetch(`/api/users/${userId}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(user => {
            alert('User deleted successfully!');
            fetchUsers(); // Refresh the users list
        })
        .catch(error => console.error('Error deleting user:', error));
}

// Call fetchUsers on page load
if (document.getElementById('userTableBody')) {
    fetchUsers();
}

document.addEventListener("DOMContentLoaded", function() {
    // Attach event listeners to each delete button
    const deleteButtons = document.querySelectorAll(".btn-danger");

    deleteButtons.forEach(button => {
        button.addEventListener("click", function() {
            const userId = this.getAttribute("data-id");

            // Send DELETE request using fetch
            fetch(`/api/users/${userId}`, {
                method: "DELETE",  // HTTP method to delete the user
            })
            .then(response => {
                if (response.ok) {
                    // If successful, remove the user row from the table
                    this.closest('tr').remove();
                } else {
                    alert("Error deleting user.");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Error deleting user.");
            });
        });
    });
});