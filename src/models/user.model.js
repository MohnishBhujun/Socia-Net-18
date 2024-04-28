const {Schema, model} = require('mongoose');

//user schema
const userSchema = new Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
            trim:true
        },
        email:{
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must use a valid email address']
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: "thought"

        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'user',
        }]
    },
    {
        virtuals:{
            friendCount:{
                get() { 
                    return this.friends.length; 
            }
            }
        },
        toJSON:{
            virtuals:true,
        },
        id:false
    }
)

userSchema.pre('findOneAndDelete', async function(next) {
    try {
        const id=this.getFilter()._id
        const user=await this.model.findById(id)
        if(user)await model('thought').deleteMany({ _id: { $in: user.thoughts } });
        next();
    } catch (error) {
        next(error);
    }
});
const User = model('user', userSchema);

module.exports = User;