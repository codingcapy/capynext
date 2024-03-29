
/*
author: Paul Kim
date: February 22, 2024
version: 1.0
description: Post model schema for CapyNext
 */

import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    _id: { type: Number, required: true, default: 1 },
    title: { type: String, required: [true, 'title is required'], trim: true, maxlength: [300, 'title char limit is 300'] },
    content: { type: String, required: [true, 'content is required'], trim: true, maxlength: [40000, 'content char limit is 40000'] },
    date: { type: Date, required: true, default: Date.now },
    edited: { type: Boolean, required: true, default: false },
    deleted: { type: Boolean, required: true, default: false },
    topic: { type: String, required: true, default: "General", trim: true },
    username: { type: String, required: true },
    userId: { type: Number, required: true },
    postId: { type: Number, required: true }
})

const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);
export default Post;