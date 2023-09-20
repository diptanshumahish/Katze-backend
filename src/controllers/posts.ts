import express from "express";
import { v2 as cloudinary } from "cloudinary";
import {
    createPost,
    deletePostById,
    updatePostById,
    getAllPosts,
    getPostsByTag,
    getRandomPosts,
    PostModel,
    getLimitedNoPosts,
    getPostById,
} from "../db/post";

cloudinary.config({
    cloud_name: "dsgjlwhh2",
    api_key: "373795248616981",
    api_secret: "t3d0KdV42wYaSmopQIS58znPpec",
});

// Create a Post
export const createPostController = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const {
            postHeading,
            coverImage,
            miniDescription,
            postedById,
            postedByUserName,
            postContent,
            optionalImages,
            tags,
        } = req.body;

        const result = await cloudinary.uploader.upload(coverImage);
        console.log(result);
        const post = await createPost({
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
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ error: "Failed to create post" });
    }
};

// Delete Post by ID
export const deletePostByIdController = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const postId = req.params.id;
        const deletedPost = await deletePostById(postId);
        if (!deletedPost) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.json(deletedPost);
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ error: "Failed to delete post" });
    }
};

// Update Post by ID
export const updatePostByIdController = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { id } = req.params;
        const updatedPost = await updatePostById(id, req.body);
        if (!updatedPost) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.json(updatedPost);
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({ error: "Failed to update post" });
    }
};

// Get All Posts
export const getAllPostsController = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const posts = await getAllPosts();
        res.json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ error: "Failed to fetch posts" });
    }
};

// Get Posts by Tag
export const getPostsByTagController = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { tag } = req.params; // Assuming you pass the tag in the route parameters
        const posts = await getPostsByTag(tag);
        res.json(posts);
    } catch (error) {
        console.error("Error fetching posts by tag:", error);
        res.status(500).json({ error: "Failed to fetch posts by tag" });
    }
};

export const getRandomPostsController = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const ct = await PostModel.countDocuments();
        const posts = await getRandomPosts(ct);
        console.log(posts);
        return res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching posts by tag:", error);
        res.status(500).json({ error: "Failed to fetch posts by tag" });
    }
};

export const getLimitedPostsContoller = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const limit = req.params.limit;

        const posts = await getLimitedNoPosts(parseInt(limit));

        return res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching posts by tag:", error);
        res.status(500).json({ error: "Failed to fetch posts by tag" });
    }
};

export const getFullpostController = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const id = req.params.id;
        const fullPost = await getPostById(id);
        console.log(id, fullPost);
        return res.status(200).json(fullPost);
    } catch (error) {
        console.error("Error fetching full post:", error);
        res.status(500).json({ error: "Failed to fetch full post" });
    }
};
