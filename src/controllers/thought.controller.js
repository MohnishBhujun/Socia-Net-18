const { handleError } = require("../helpers/handleError");
const ThoughtService = require("../service/thought.service");
const UserService = require("../service/user.service");

module.exports = {
  // get all thoughts
  async getAllThoughts(req, res, next) {
    try {
      const allThoughtsData = await ThoughtService.getAllThoughts();
      return res.status(200).json(allThoughtsData);
    } catch (err) {
      next(err);
    }
  },
  // get signle thought
  async getSingleThought(req, res, next) {
    try {
      const singleThoughtData = await ThoughtService.getSingleThought({
        _id: req.params.thoughtId,
      })
      return res.status(200).json(singleThoughtData);
    } catch (err) {
      next(err);
    }
  },
  // create a thought
  async createThought(req, res, next) {
    try {
      const isUser = await UserService.getSingleUser({ _id: req.body.userId });
      if (!isUser)handleError("No user with that ID",404)
      const newThoughtData = await ThoughtService.createThought(req.body);
      await UserService.updateUser(
        { _id: req.body.userId },
        { $addToSet: { thoughts: newThoughtData._id } },
        { new: true }
      );
      return res.status(200).json(newThoughtData);
    } catch (err) {
      next(err);
    }
  },

  // update a thought by id
  async updateThought(req, res, next) {
    try {
      const updatedThoughtData = await ThoughtService.updateThought(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { new: true }
      );
    if(!updatedThoughtData)handleError("thought not found",404)
      return res
        .status(200)
        .json(updatedThoughtData );
    } catch (err) {
      next(err);
    }
  },

  // delete a thought by id
  async deleteThought(req, res, next) {
    try {
    const thought=await ThoughtService.deleteThought({
        _id: req.params.thoughtId,
      });
      if(!thought)handleError("thought not found",404)
      return res
        .status(200)
        .json({ message: "Thought deleted"});
    } catch (err){
      next(err);
    }
  },

  // create a reaction
  async createRaction(req, res, next) {
    try {
      const newRactionData = await ThoughtService.createRaction(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { new: true }
      );
      return res.status(200).json(newRactionData);
    } catch (err){
      next(err);
    }
  },

  // delete a reaction
  async deleteRaction(req, res, next) {
    try {
      const deletedRactionData = await ThoughtService.deleteRaction(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { new: true }
      );
      if(!deletedRactionData)handleError('reaction not found',404)
      return res.status(200).json({ message: "reaction deleted" });
    } catch (err){
      next(err);
    }
  },
};
