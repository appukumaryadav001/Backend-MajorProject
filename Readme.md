# backend series
-[Model link](https://app.eraser.io/workspace/Ytpqz1VogxGy1jIDkzj?origin=share)

# PlayTube Backend API

PlayTube is a YouTube-inspired backend application built using Node.js, Express, and MongoDB.  
It provides RESTful APIs for user authentication, video management, playlists, subscriptions, likes, comments, and channel statistics.

 Note: This is a backend-only project. No frontend is included.

---

##  Features

-  User Registration & Login (JWT Authentication)
-  Access & Refresh Token System
-  User Profile Management
-  Video Upload & Management
-  Playlist Management
-  Like / Unlike Videos
-  Comment System
-  Subscribe / Unsubscribe Channel
-  Channel Stats API
-  Protected Routes using Middleware
-  Centralized Error Handling
-  Custom ApiResponse & ApiError Classes
-  AsyncHandler for cleaner async code
-  Cloudinary Integration for file uploads

---

##  Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Bcrypt
- Multer
- Cloudinary
- Nodemon

---

##  Project Structure

src/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── utils/
├── app.js
└── index.js

---

## ⚙️ Installation & Setup

###  Clone Repository

```
git clone https://github.com/appukumaryadav001/playTube-Backend-MajorProject
```

###  Install Dependencies

```
npm install
```





###  Run Server

```
npm run dev
```

---

##  Authentication Flow

1. User registers with email & password
2. Password is hashed using bcrypt
3. Access & Refresh tokens are generated
4. Protected routes use verifyJWT middleware
5. Refresh token used to generate new access token

---

##  Sample API Endpoints

###  User Routes
- POST `/api/v1/users/register`
- POST `/api/v1/users/login` 
- POST `/api/v1/users/logout`
- POST `/api/v1/users/refresh-token`
- POST `/api/v1/users/change-password`
- GET  `/api/v1/users/current-user`
- PATCH `/api/v1/users/update-account`
- PATCH `/api/v1/users/avatar`
- PATCH `/api/v1/users/cover-image`
- GET `/api/v1/users/channel/:username`
- GET `/api/v1/watch-history`

###  Video Routes
- GET `/api/v1/videos`
- POST `/api/v1/videos`
- GET `/api/v1/videos/:videoId`
- DELETE `/api/v1/videos/:videoId`
- PATCH `/api/v1/videos/:videoId`
- PATCH `/api/v1/videos/toggle/publish/:videoId`

###  Playlist Routes
- POST `/api/v1/playlists`
- GET `/api/v1/playlists/user/:userId`
- PATCH `/api/v1/playlists/add/:videoId/:playlistId`
- PATCH `/api/v1/playlists/remove/:videoId/:playlistId`
- GET `/api/v1/playlists/:playlistId`
- PATCH `/api/v1/playlists/:playlistId`
- DELETE `/api/v1/playlists/:playlistId`

###  Subscription Routes
- POST `/api/v1/subscriptions/channel/:channelId`
- GET `/api/v1/subscriptions/channel/:channelId`
- GET `/api/v1/subscriptions/subscriber/:subscriberId`


### Comment Routes
- GET `/api/v1/comments/:videoId`
- POST `/api/v1/comments/:videoId`
- PATCH `/api/v1/comments/comment/:commentId`
- DELETE `/api/v1/comments/comment/:commentId`

### Tweet Routes
- POST `/api/v1/tweets/`
- GET `/api/v1/tweets/user/userId`
- PATCH `/api/v1/tweets/:tweetId`
- DELETE `/api/v1/tweets/:tweetId`

###  Like Routes
- POST `/api/v1/likes/toggle/video/:videoId`
- POST `/api/v1/likes/toggle/comment/:commentId`
- POST `/api/v1/likes/toggle/tweet/:tweetId`
- GET `/api/v1/likes/videos`

###  Dashboard Routes
- GET `/api/v1/dashboard/stats`
- GET `/api/v1/dashboard/videos`


### Healthcheck Routes
- GET `/api/v1/healthcheck`

 ---

 
##  Architecture Highlights

- Clean MVC Pattern
- Modular Folder Structure
- Reusable Async Handler
- Secure JWT Authentication
- Centralized Error Handling
- RESTful API Design
- Scalable Project Structure



##  Author

Appu Kumar Yadav  
Backend Developer (Node.js & MongoDB)

---
