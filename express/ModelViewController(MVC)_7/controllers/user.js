const User = require("../models/user");

async function handleGetAllUsers(req, res) {
  const users = await User.find({});
  return res.status(200).send(users);
}

async function handleGetUserById(req, res) {
  // const { id } = req.params;
  // const user = await User.findById(id);
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).send("User not found");
  }
  return res.status(200).send(user);
}

async function handleCreateNewUser(req, res) {
  const { firstName, lastName, email, password, jobTitle } = req.body;
  const user = new User({ firstName, lastName, email, password, jobTitle });
  if (!firstName || !email || !password || !jobTitle) {
    return res
      .status(400)
      .send("First name, email, password and job Title are required");
  }
  try {
    await user.save();
    res
      .status(201)
      .json({ message: "User created successfully", id: user._id });
  } catch (error) {
    res.status(400).send(error);
  }
}

async function handleUpdateUserById(req, res) {
  const user = await User.findByIdAndUpdate(req.params.id, {
    lastName: "Changed",
  });
  if (!user) {
    return res.status(404).send("User not found");
  }
  return res.status(200).send("User updated successfully");
}

async function handleDeleteUserById(req, res) {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return res.status(404).send("User not found");
  }
  return res.status(200).send("user deleted successfully");
}

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
