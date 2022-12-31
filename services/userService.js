const userList = {
    users: []
}

const retrieveUsers = () => {
    return userList;
}

const addUser = (userDetails) => {
    userList.users.push(userDetails);
    return userDetails;
}

const updateUser = (id, userDetails) => {
    const userIndex = userList.users.findIndex((user) => user.id === id);
    userList.users[userIndex] = {
        ...userDetails
    };
    return userList.users[userIndex];
}

const removeUser = (id) => {
    const userIndex = userList.users.findIndex((user) => user.id === id);
    userList.users.splice(userIndex, 1);
}

const searchUser = (username) => {
    const searchResult = userList.users.filter((user) => user.username.includes(username));
    return {
        users: searchResult
    };
}

module.exports = {
    retrieveUsers,
    addUser,
    updateUser,
    removeUser,
    searchUser
}