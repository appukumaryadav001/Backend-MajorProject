import mongoose from "mongoose";
import {Video} from "../models/video.model.js";
import {Subscription} from "../models/subscription.model.js";
import {Like} from "../models/like.model.js";
import {ApiError} from "../utils/apiError.js";
import {ApiResponse} from "../utils/apiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";


const getChannelStats = asyncHandler (async (req,res)=>{
     //TODO : Get the channel stats like total video views, total subscribers, total videos, total likes etc.

      
     const totalVideos = await Video.countDocuments({owner:req.user._id});

     const totalSubscribers = await Subscription.countDocuments({channel:req.user._id});

     const videoVeiws = await Video.aggregate([
          {
               $match:{owner:req.user._id}
          },
          {
               $group:{
                    _id:null,
                    totalVideoVeiws:{$sum:"$views"}

                }
          }
     ]);
     const totalVideoViews = videoVeiws[0]?.totalVideoVeiws || 0;
     
     const videos = await Video.find({owner:req.user._id});
     const videoId = videos.map(v=>v._id);
     const totalVideoLikes = await Like.countDocuments({
          video:{$in:videoId}
     });

     return res
     .status(200)
     .json(new ApiResponse(
          200,
          {
          totalVideoViews,
          totalSubscribers,
          totalVideos,
          totalVideoLikes
     },
     "all stats fatched successfully"
));                                                                                                                                      
});

const getChannelVideos = asyncHandler (async (req,res)=>{
     //TODO : get all the videos uploaded by the channel

     const videos = await Video.find({owner:req.user._id});

     return res
     .status(200)
     .json(new ApiResponse(200,videos,"get all videos fetched"));
});

export {
     getChannelStats,
     getChannelVideos

}
