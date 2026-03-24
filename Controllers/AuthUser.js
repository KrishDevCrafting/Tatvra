const User = require("../Models/User");

const user = await User.createUser({
    email,
    password
})