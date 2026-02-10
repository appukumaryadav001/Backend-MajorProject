
import mongoose, {isValidObjectId} from "mongoose";
import {User} from "../models/user.model.js";
import { Subscription } from "../models/subscription.model.js";
import {ApiError} from "../utils/apiError.js";
import {ApiResponse} from "../utils/apiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler (async (req, res)=>{
    const {channelId} = req.params;
    // TODO : toggle subscription
    
    if(!isValidObjectId(channelId)){
        throw new ApiError(400,"Invalid channel Id")
    }
    
    if(channelId===req.user?._id.toString()){
        throw new ApiError (400,"You can't subscribe your own cahnnel")
    }

    const existingSub = await Subscription.findOne({subscriber:req.user._id,
        channel:channelId
    });

    if(existingSub){
        await Subscription.deleteOne({_id:existingSub._id})

        return res
        .status(200)
        .json(new ApiResponse(200,null,"Unsubscribed successfully"))
    }

    await Subscription.create({
        subscriber:req.user._id,
        channel:channelId
    })

    return res
    .status(200)
    .json(new ApiResponse(200,null,"subscribedd successfully"))

    
});

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler( async (req,res)=>{
    const {channelId} = req.params;
    if(!isValidObjectId(channelId)){
        throw new ApiError(400,"Invalid channal Id");

    }

    const channel = await User.findById(channelId);
    if(!channel){
        throw new ApiError(404,"channel not found");
    }
    const subscribers = await Subscription.find({
        channel:channelId,
    }).populate("subscriber","fullName username avatar");


    return res
    .status(200)
    .json(new ApiResponse(200, subscribers,"subscribers fetched successfully"))

});

//controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req,res)=>{
    const {subscriberId}= req.params;

    if(!isValidObjectId(subscriberId)){
        throw new ApiError(400,"Invalid channel id");
    }

    const user = await User.findById(subscriberId);

    if(!user){
        throw new ApiError(404,"Subscriber not found")
    }

    const channels = await Subscription.find({
        subscriber:subscriberId,
    }).populate("channel","username avatar");

    return res
    .status(200)
    .json(new ApiResponse(200,channels,"Channels fetched successfully"));
})


export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}