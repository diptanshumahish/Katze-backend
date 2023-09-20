import mongoose from "mongoose";

// export const CommentSchema = new mongoose.Schema({
//     userName: { type: String, required: true },
//     commentBody: { type: String, required: true },
//     commentedAt: { type: String, required: true },
//     imageLink: { type: String, required: true },
// });

const PostSchema = new mongoose.Schema({
    postHeading: { type: String, required: true },
    coverImage: { type: String },
    miniDescription: { type: String, required: true },
    postedById: { type: String, required: true },
    postedByUserName: { type: String, required: true },
    postContent: { type: String, required: true },
    optionalImages: { type: Array<String> },
    tags: { type: Array<String>, required: true },
    comments: {
        type: Array<{
            userName: { type: String; required: true };
            commentBody: { type: String; required: true };
            commentedAt: { type: String; required: true };
            imageLink: { type: String; required: true };
        }>,
    },
});

export const PostModel = mongoose.model("Posts", PostSchema);

export const getAllPosts = () => PostModel.find();

//get first {number} of posts
export const getLimitedNoPosts = (count: number) =>
    PostModel.find().limit(count);

export const getPostById = (id: string) => PostModel.findOne({ _id: id });

export const getPostsByTag = (tag: string) =>
    PostModel.find({ tags: { $in: [tag] } });

export const createPost = (values: Record<string, any>) =>
    new PostModel(values).save().then((post) => post.toObject());
export const deletePostById = (id: string) =>
    PostModel.findOneAndDelete({ _id: id });

export const updatePostById = (id: string, values: Record<string, any>) =>
    PostModel.findByIdAndUpdate(id, values);

export const getRandomPosts = async (count: number) => {
    console.log(count);
    await PostModel.aggregate([{ $sample: { size: 1 } }]);
};
