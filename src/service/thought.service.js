const { User, Thought } = require('../models');

module.exports = {
    // get all thoughts
    async getAllThoughts(){
            return await Thought.find();
    },
    // get signle thought
    async getSingleThought(filter){
        return await Thought.findOne(filter);
    },
    // create a thought
    async createThought(param){
        return await Thought.create(param);
    },
    //add thought to user
    async addThoughtToUser(filter,param,option){
        return await User.findOneAndUpdate(filter,param,option)
    },
    // update a thought by id
    async updateThought(filter,param,option){
        return await Thought.findOneAndUpdate(filter,param,option); 
    },
    // delete a thought by id
    async deleteThought(filter){
        return await Thought.findOneAndDelete(filter);
    },
    // create a reaction
    async createRaction(filter,param,option){
        return await Thought.findOneAndUpdate(filter,param,option);
    },

    // delete a reaction
    async deleteRaction(filter,param,option){
        return await Thought.findOneAndUpdate(filter,param,option);
    }


}