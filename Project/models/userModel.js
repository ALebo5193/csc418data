// In-memory storage to populate our users page
const usersData = [
    { name: 'Alice', gender: 'female' },
    { name: 'Bob', gender: 'male' },
    { name: 'Charlie', gender: 'other' }
];

module.exports = {
    getUsers: () => usersData,
    addUser: (name, gender) => {
        usersData.push({name, gender})
    }
}