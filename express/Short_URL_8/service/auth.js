//stateful session management

// const sessionIdToUserMap = new Map();   now no need to maintain state
// function setUser(id, user){
//     sessionIdToUserMap.set(id, user);
// }

// function getUser(id){
//     return sessionIdToUserMap.get(id);
// }




//stateless session management
const jwt = require('jsonwebtoken');
const secretKey = "secretKey1234"; // Use a strong secret key in production

function setUser( user){
    const payload = {
        _id: user._id,
        email: user.email,
        role: user.role,
    };
    return jwt.sign(payload,secretKey);
}

function getUser(token){
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {
        return null; // Token is invalid or expired
    }
}

module.exports = {
    setUser,
    getUser,
};