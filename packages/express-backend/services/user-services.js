import User from "../models/user.js";

function getUsers() {
  return User.find();
}

function findUserByName(name) {
  return User.find({ name: name });
}

function findUserByJob(job) {
  return User.find({ job: job });
}

// Implementation for the assignment - find by name AND job
function findUserByNameAndJob(name, job) {
  return User.find({ name: name, job: job });
}

function addUser(user) {
  const userToAdd = new User(user);
  return userToAdd.save();
}

function findUserById(id) {
  return User.findById(id);
}

// Implementation for the assignment - delete by ID
function deleteUserById(id) {
  return User.findByIdAndDelete(id);
}

export default {
  getUsers,
  findUserByName,
  findUserByJob,
  findUserByNameAndJob,
  addUser,
  findUserById,
  deleteUserById
};
