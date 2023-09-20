import express from "express";
import {
    createPostController,
    deletePostByIdController,
    getAllPostsController,
    getFullpostController,
    getLimitedPostsContoller,
    getPostsByTagController,
    getRandomPostsController,
    updatePostByIdController,
} from "../controllers/posts";

export default (router: express.Router) => {
    router.post("/posts/create", createPostController);
    router.get("/posts", getAllPostsController);
    router.delete("/posts/:id", deletePostByIdController);
    router.patch("/posts/:id", updatePostByIdController);
    router.get("/posts/:tag", getPostsByTagController);
    router.get("/random", getRandomPostsController);
    router.get("/posts/get/:limit", getLimitedPostsContoller);
    router.get("/posts/fullpost/:id", getFullpostController);
};
