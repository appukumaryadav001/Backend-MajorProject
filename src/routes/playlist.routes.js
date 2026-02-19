 import { Router } from "express";

 import {
    createPlaylist,
    getUserPlaylist,
    getPlaylistById,
    addVideoPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
 } from "../controllers/playlist.controller.js";
 
 import { verifyJWT } from "../middlewares/auth.middleware.js";
 const router = Router();

 router.use(verifyJWT);

 router
    .route("/")
    .post(createPlaylist);

router
    .route("/user/:userId")
    .get(getUserPlaylist);  
 
 
router
     .route("/add/:videoId/:playlistId")
     .patch(addVideoPlaylist);
    
router
     .route("/remove/:videoId/:playlistId")
     .patch(removeVideoFromPlaylist);
   
 router
    .route("/:playlistId")
    .get(getPlaylistById)
    .delete(deletePlaylist)
    .patch(updatePlaylist);  

export default router;     