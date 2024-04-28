const { handleError } = require("../helpers/handleError");
const ThoughtService = require("../service/thought.service");
const UserSerivce = require("../service/user.service");

module.exports = {
  // get information for all users
  async getAllUsers(req, res, next) {
    try {
      const userData = await UserSerivce.getAllUsers();
      return res.json(userData);
    } catch (err) {
      next(err);
    }
  },
  // get information for one user
  async getSingleUser(req, res, next) {
    try {
      // get thought and friend data
      // const userData = await User.findOne({_id:req.params.userId}).select('-__v');
      const userData = await UserSerivce.getSingleUser({
        _id: req.params.userId,
      });
      if (!userData) handleError("No user with that ID", 404);
      return res.json(userData);
    } catch (err) {
      next(err);
    }
  },
  // create a new user
  async createNewUser(req, res, next) {
    try {
      const userData = await UserSerivce.createNewUser(req.body);
      return res.json(userData);
    } catch (err) {
      next(err);
    }
  },
  //update the information for a user
  async updateUser(req, res, next) {
    try {
      const userData = await UserSerivce.updateUser(
        { _id: req.params.userId },
        { $set: { username: req.body.username, email: req.body.email } },
        { new: true }
      );
      if(!userData)handleError("user not found",404)
      return res.json(userData);
    } catch (err) {
      next(err);
    }
  },

  // delete a user
  async deleteUser(req, res, next) {
    try {
      const userData = await UserSerivce.deleteUser({ _id: req.params.userId });
      if (!userData) handleError("User not found", 404);
      await ThoughtService.deleteThought({ userId: req.params.userId });
      return res
        .status(200)
        .json({ message: "user deleted"});
    } catch (err) {
      next(err);
    }
  },

  //add a friend
  async addFriend(req, res, next) {
    try {
      // test if the user exist
      const isUserExist = await UserSerivce.getSingleUser({
        _id: req.params.userId,
      });
      if (!isUserExist) handleError("User not found", 404);
      // test if the friendID is a userID
      const isFirendExist = await UserSerivce.getSingleUser({ _id: req.params.friendId });
      if (!isFirendExist) handleError("friend not found", 404);
      // add friend
      const friendData = await UserSerivce.addFriend(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      return res.json(friendData);
    } catch (err) {
      next(err);
    }
  },

  async removeFriend(req, res, next) {
    try {
      const removedFriendData = await UserSerivce.removeFriend(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if(!removedFriendData)handleError("user not found",404)
      return res.json({
        message: "The friend has been removed"
      });
    } catch (err) {
      next(err);
    }
  },
};