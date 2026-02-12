import mongoose, {isValidObjectId} from "mongoose";
import { Playlist } from "../models/playlist.model.js";
import {Video} from "../models/video.model.js"
import {ApiError} from "../utils/apiError";
import {ApiResponse} from "../utils/apiResponse";
import {asyncHandler} from "../utils/asyncHandler";

const creatPlaylist = asyncHandler(async (req,res)=>{
    const {name , description} = req.body;

    //TODO : create playlist

     if(!req.user){
      throw new ApiError(401,"Unauthorized")
    }
    if(!name|| !description){
        throw new ApiError(400,"name aur description is required");
    }
   
    const playlist = await Playlist.create({
        name,
        description,
        owner:req.user?._id,
        videos:[]
    });

    return res
    .status(200)
    .json(new ApiResponse(200,playlist,"playlist create successfully"))
});

const getUserPlaylist = asyncHandler(async (req,res)=>{
    const {userId} = req.params;
    if(!isValidObjectId(userId)){
        throw new ApiError(400,"Invalid user id");
    }

    const playlist = await Playlist.find({
        owner:userId});

        if(!playlist || playlist.length === 0){
    throw new ApiError(404,"No playlist found");
}

    return res
    .status(200)
    .json(new ApiResponse(200,playlist,"playlist fetched successfully"))
});

const getPlaylistById = asyncHandler (async (req, res)=>{
    const {playlistId} = req.params;
    //TODO : get playlist by id

    if(!isValidObjectId(playlistId)){
        throw new ApiError(400,"Invalid playlist id");
    }

    const playlist = await Playlist.findById(playlistId);
    if(!playlist){
        throw new ApiError(404,"playlist not found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,playlist,"playlist fetched successfully"));
});

const addVideoPlaylist = asyncHandler(async (req,res)=>{
    const {playlistId,videoId} = req.params;
    if(!isValidObjectId(playlistId)){
        throw new ApiError(400,"Invalid playlist Id");
    }
    if(!isValidObjectId(videoId)){
        throw new ApiError(400,"Invalid video Id");
    }

    const playlist = await Playlist.findById(playlistId);
    if(!playlist){
        throw new ApiError(404,"playlist not found");
    }

    if(playlist.owner.toString()!==req.user._id.toString()){
        throw new ApiError(403,"You are not owner of this playlist");
    }

    const video = await Video.findById(videoId);

    if(!video){
        throw new ApiError(404,"video not found");
    }
    if(!video.isPublished){
        throw new ApiError(403,"video is not published");
    }

    if(playlist.videos.includes(videoId)){
        throw new ApiError(400,"Video already in playlist");
    }
    playlist.videos.push(videoId);

   await playlist.save({validateBeforeSave:false});
    
   return res
   .status(200)
   .json(new ApiResponse(200,playlist,"video added to playlist  successfully"))
});

const removeVideoFromPlaylist = asyncHandler(async (req,res)=>{
    const {playlistId, videoId} = req.params;

    //TODO : remove video from playlist

    if(!isValidObjectId(playlistId)){
        throw new ApiError(400,"Invalid playlist id");
    }

    if(!isValidObjectId(videoId)){
        throw new ApiError(400,"Invalid video id");
    }

   const playlist = await Playlist.findById(playlistId);
   if(!playlist){
    throw new ApiError(404,"playlist not found");
   };

   if(playlist.owner.toString()!==req.user._id.toString()){
    throw new ApiError(403,"You are not owner of this playlist");
   }

   const videoExist = playlist.videos.some((v)=> v.toString() ===videoId);
   if(!videoExist){
    throw new ApiError(404,"video not in playlist");
   }

   const updatePlaylist = await Playlist.findByIdAndUpdate(
              playlistId,
              {
                $pull:{videos:videoId}
              },
              {
                new:true
              }
        
   );
   

   return res
   .status(200)
   .json(new ApiResponse(200,updatePlaylist,"deleted video from playlist successfully"));


});

const deletePlaylist = asyncHandler(async (req,res)=>{
    const {playlistId} = req.params;

    //TODO : delete playlist 
   if(!isValidObjectId(playlistId)){
    throw new ApiError(400,"Invalid playlist id");
   }
   const playlist = await Playlist.findById(playlistId);

   if(!playlist){
    throw new ApiError(404,"playlist not found");
   }

   if(playlist.owner.toString()!==req.user._id.toString()){
      throw new ApiError(403,"You are not owner of this playlist")
   }
   const deletedPlaylist = await Playlist.findByIdAndDelete(playlistId);
   return res
   .status(200)
   .json(new ApiResponse(200,deletedPlaylist,"playlist deleted successfully"));

});
const updatePlaylist = asyncHandler( async (req, res)=>{
    const {playlistId} = req.params;
    const {name,description} = req.body;
    //TODO : update playlist 

    if(!isValidObjectId(playlistId)){
        throw new ApiError(400,"Invalid playlist Id");
    }
    
     const updateData = {};
     if(name && name.trim()){
        updateData.name = name;
     }
     if(description && description.trim()){
        updateData.description = description;
     }

     if(Object.keys(updateData).length===0){
        throw new ApiError(400,"Nothing to update");
     }

     const updatedPlaylist = await Playlist.findByIdAndUpdate(
        {
                _id:playlistId,
                owner:req.user._id 
            },
            {
                $set:updateData
            },
            {
                new:true
            }
        );

        if(!updatedPlaylist){
               throw new ApiError(404,"playlist not found or not owner");
        }
     return res
     .status(200)
     .json(new ApiResponse(200,updatedPlaylist,"playlist updated successpully"));


})

export {
    creatPlaylist,
    getUserPlaylist,
    getPlaylistById,
    addVideoPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}