const User = require('./user')

const getUserById = (id) => {
  const user = User.findById(id).exec()
  return user
}

const getAllUsers = () => {
  const users = User.find({}).exec()
  return users
}

const createUser = (userDetails) => {
  const user = User.create(userDetails)
  return user
}
const removeUserById = (id) => {
  const user = User.findByIdAndDelete(id).exec()
  return user
}

const updateUserById = (id, update) => {
  const user = User.findByIdAndUpdate(id, update, { new: true }).exec()
  return user
}

module.exports = {
  getUserById,
  getAllUsers,
  createUser,
  removeUserById,
  updateUserById
}
