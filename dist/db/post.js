"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomPosts = exports.updatePostById = exports.deletePostById = exports.createPost = exports.getPostsByTag = exports.getPostById = exports.getLimitedNoPosts = exports.getAllPosts = exports.PostModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// export const CommentSchema = new mongoose.Schema({
//     userName: { type: String, required: true },
//     commentBody: { type: String, required: true },
//     commentedAt: { type: String, required: true },
//     imageLink: { type: String, required: true },
// });
const PostSchema = new mongoose_1.default.Schema({
    postHeading: { type: String, required: true },
    coverImage: { type: String },
    miniDescription: { type: String, required: true },
    postedById: { type: String, required: true },
    postedByUserName: { type: String, required: true },
    postContent: { type: String, required: true },
    optionalImages: { type: (Array) },
    tags: { type: (Array), required: true },
    comments: {
        type: (Array),
    },
});
exports.PostModel = mongoose_1.default.model("Posts", PostSchema);
const getAllPosts = () => exports.PostModel.find();
exports.getAllPosts = getAllPosts;
//get first {number} of posts
const getLimitedNoPosts = (count) => exports.PostModel.find().limit(count);
exports.getLimitedNoPosts = getLimitedNoPosts;
const getPostById = (id) => exports.PostModel.findOne({ _id: id });
exports.getPostById = getPostById;
const getPostsByTag = (tag) => exports.PostModel.find({ tags: { $in: [tag] } });
exports.getPostsByTag = getPostsByTag;
const createPost = (values) => new exports.PostModel(values).save().then((post) => post.toObject());
exports.createPost = createPost;
const deletePostById = (id) => exports.PostModel.findOneAndDelete({ _id: id });
exports.deletePostById = deletePostById;
const updatePostById = (id, values) => exports.PostModel.findByIdAndUpdate(id, values);
exports.updatePostById = updatePostById;
const getRandomPosts = async (count) => {
    console.log(count);
    await exports.PostModel.aggregate([{ $sample: { size: 1 } }]);
};
exports.getRandomPosts = getRandomPosts;
//# sourceMappingURL=post.js.map