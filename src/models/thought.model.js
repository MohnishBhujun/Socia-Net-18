const {Schema, model,Types} = require('mongoose');
const Helpers = require('../helpers/common');

// reaction schema
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        required: true,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280

    },
    username: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now,
        get:function(val){
            console.log(val)
            return Helpers.formatTime(val);
        }
    }
},{_id:false})

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    username:{
        type: String,
        required: true
    },
    reactions: [reactionSchema],
    createdAt:{
        type: Date,
        default: Date.now,
        get:function(val){
            console.log(val)
            return Helpers.formatTime(val);
        }
    }
},{
    toJSON: {
        virtuals: true,
    },
    virtuals:{
        reactionCount:{
            get() { return this.reactions.length} 
        },
    },
    id:false
})

thoughtSchema.pre('findOneAndDelete',async function(next) {
    try {
        const id=this.getFilter()._id
        await model('user').updateMany(
            { thoughts: id }, 
            { $pull: { thoughts:id } }
        );
        next();
    } catch (error) {
        next(error);
    }
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;