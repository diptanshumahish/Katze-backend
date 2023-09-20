"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const posts_1 = require("../controllers/posts");
exports.default = (router) => {
    router.post("/posts/create", posts_1.createPostController);
    router.get("/posts", posts_1.getAllPostsController);
    router.delete("/posts/:id", posts_1.deletePostByIdController);
    router.patch("/posts/:id", posts_1.updatePostByIdController);
    router.get("/posts/:tag", posts_1.getPostsByTagController);
    router.get("/random", posts_1.getRandomPostsController);
    router.get("/posts/get/:limit", posts_1.getLimitedPostsContoller);
    router.get("/posts/fullpost/:id", posts_1.getFullpostController);
};
//# sourceMappingURL=posts.js.map