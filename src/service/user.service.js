const { User, Thought } = require("../models");

module.exports = {
  // get information for all users
  async getAllUsers() {
    return await User.find().populate("thoughts")
    .populate("friends");
  },

  // get information for one user
  async getSingleUser(filter) {
    return await User.findOne(filter).populate("thoughts")
    .populate("friends");
  },

  // create a new user
  async createNewUser(param) {
    return await User.create(param);
  },
  //update the information for a user
  async updateUser(filter, param, option = {}) {
    return await User.findOneAndUpdate(filter, param, option);
  },

  // delete a user
  async deleteUser(filter) {
    return await User.findOneAndDelete(filter);
  },
  //delete user thought
  async deleteUserThought(filter) {
    return await Thought.deleteMany(filter);
  },

  //add a friend
  //TODO to fix bug for id testing
  async addFriend(filter, param, option) {
    return await User.findOneAndUpdate(filter, param, option);
  },

  async removeFriend(filter, param, option) {
    return await User.findOneAndUpdate(filter, param, option);
  },

};
