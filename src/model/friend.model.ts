// import mongoose, {Schema , model} from "mongoose" ;
// import { CatchError } from "../util/error";

// const friendSchema = new Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Auth'
//     },
//     friend: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Auth'
//     },
//     status: {
//         type: String,
//         enum: ['requested', 'rejected', 'accepted'],
//         default: 'requested'
//     },
//     type: {
//         type: String,
//         enum: ['sent', 'recieved'] ,
//         default: 'sent'
//     }
// }, {timestamps: true})

// friendSchema.pre('save', async function(next: CallbackWithoutResultAndOptionalError){
//     try{
//           const count = await model("Friend").countDocuments({user: this.user, friend: this.friend})
//           if(count>0)
//             return  next(new Error("Friend request already sent"))

//           next()
//     }
//     catch(err)
//     {
//       next(new Error("Failed to send friend request"))

//     }
// })

// const FriendModel = model("Friend", friendSchema)
// export default FriendModel



//fix code clause ka 
// import mongoose, { Schema, model, CallbackWithoutResultAndOptionalError, HydratedDocument } from "mongoose";
// import { CatchError } from "../util/error";

// interface IFriend {
//     user: mongoose.Types.ObjectId;
//     friend: mongoose.Types.ObjectId;
//     status: 'requested' | 'rejected' | 'accepted';
//     type: 'sent' | 'recieved';
// }

// const friendSchema = new Schema<IFriend>({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Auth'
//     },
//     friend: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Auth'
//     },
//     status: {
//         type: String,
//         enum: ['requested', 'rejected', 'accepted'],
//         default: 'requested'
//     },
//     type: {
//         type: String,
//         enum: ['sent', 'recieved'],
//         default: 'sent'
//     }
// }, { timestamps: true })

// friendSchema.pre('validate', async function() {
//     const count = await model("Friend").countDocuments({ user: this.user, friend: this.friend })
//     if (count > 0)
//         throw new Error("Friend request already sent")
// })

// const FriendModel = model<IFriend>("Friend", friendSchema)
// export default FriendModel

import mongoose, {Schema , model} from "mongoose" ;
import { CatchError } from "../util/error";

const friendSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth'
    },
    friend: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth'
    },
    status: {
        type: String,
        enum: ['requested', 'accepted'],
        default: 'requested'
    }
}, {timestamps: true})


friendSchema.pre('validate', async function(){
    try{
        const count = await model("Friend").countDocuments({user: this.user, friend: this.friend})
        if(count>0)
            throw new Error("Friend request already sent")
    }
    catch(err){
        if(err instanceof Error && err.message === "Friend request already sent")
            throw err  // original error
        
        throw new Error("Failed to send friend request")  // DB ya koi aur error
    }
})

const FriendModel = model("Friend", friendSchema)
export default FriendModel