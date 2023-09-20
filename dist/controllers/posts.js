"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFullpostController = exports.getLimitedPostsContoller = exports.getRandomPostsController = exports.getPostsByTagController = exports.getAllPostsController = exports.updatePostByIdController = exports.deletePostByIdController = exports.createPostController = void 0;
const cloudinary_1 = require("cloudinary");
const post_1 = require("../db/post");
cloudinary_1.v2.config({
    cloud_name: "dsgjlwhh2",
    api_key: "373795248616981",
    api_secret: "t3d0KdV42wYaSmopQIS58znPpec",
});
// Create a Post
const createPostController = async (req, res) => {
    try {
        const { postHeading, coverImage, miniDescription, postedById, postedByUserName, postContent, optionalImages, tags, } = req.body;
        const result = await cloudinary_1.v2.uploader.upload(coverImage);
        console.log(result);
        const post = await (0, post_1.createPost)({
            postHeading,
            coverImage: result.url,
            miniDescription,
            postedById,
            postedByUserName,
            postContent,
            optionalImages,
            tags,
        });
        res.status(201).send(post);
    }
    catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ error: "Failed to create post" });
    }
};
exports.createPostController = createPostController;
// Delete Post by ID
const deletePostByIdController = async (req, res) => {
    try {
        const postId = req.params.id;
        const deletedPost = await (0, post_1.deletePostById)(postId);
        if (!deletedPost) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.json(deletedPost);
    }
    catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ error: "Failed to delete post" });
    }
};
exports.deletePostByIdController = deletePostByIdController;
// Update Post by ID
const updatePostByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPost = await (0, post_1.updatePostById)(id, req.body);
        if (!updatedPost) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.json(updatedPost);
    }
    catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({ error: "Failed to update post" });
    }
};
exports.updatePostByIdController = updatePostByIdController;
// Get All Posts
const getAllPostsController = async (req, res) => {
    try {
        const posts = await (0, post_1.getAllPosts)();
        res.json(posts);
    }
    catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ error: "Failed to fetch posts" });
    }
};
exports.getAllPostsController = getAllPostsController;
// Get Posts by Tag
const getPostsByTagController = async (req, res) => {
    try {
        const { tag } = req.params; // Assuming you pass the tag in the route parameters
        const posts = await (0, post_1.getPostsByTag)(tag);
        res.json(posts);
    }
    catch (error) {
        console.error("Error fetching posts by tag:", error);
        res.status(500).json({ error: "Failed to fetch posts by tag" });
    }
};
exports.getPostsByTagController = getPostsByTagController;
const getRandomPostsController = async (req, res) => {
    try {
        const ct = await post_1.PostModel.countDocuments();
        const posts = await (0, post_1.getRandomPosts)(ct);
        console.log(posts);
        return res.status(200).json(posts);
    }
    catch (error) {
        console.error("Error fetching posts by tag:", error);
        res.status(500).json({ error: "Failed to fetch posts by tag" });
    }
};
exports.getRandomPostsController = getRandomPostsController;
const getLimitedPostsContoller = async (req, res) => {
    try {
        const limit = req.params.limit;
        const posts = await (0, post_1.getLimitedNoPosts)(parseInt(limit));
        return res.status(200).json(posts);
    }
    catch (error) {
        console.error("Error fetching posts by tag:", error);
        res.status(500).json({ error: "Failed to fetch posts by tag" });
    }
};
exports.getLimitedPostsContoller = getLimitedPostsContoller;
const getFullpostController = async (req, res) => {
    try {
        const id = req.params.id;
        const fullPost = await (0, post_1.getPostById)(id);
        console.log(id, fullPost);
        return res.status(200).json(fullPost);
    }
    catch (error) {
        console.error("Error fetching full post:", error);
        res.status(500).json({ error: "Failed to fetch full post" });
    }
};
exports.getFullpostController = getFullpostController;
//# sourceMappingURL=posts.js.map