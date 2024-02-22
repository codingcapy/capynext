
/*
author: Paul Kim
date: February 22, 2024
version: 1.0
description: PostVote model schema for CapyNext
 */

import mongoose from "mongoose";

const PostVoteSchema = new mongoose.Schema({
    _id: { type: Number, required: true, default: 1 },
    value: { type: Number, required: [true, 'value is required'] },
    postId: { type: Number, required: [true, 'postId is required'] },
    voterId: { type: Number, required: [true, 'voterId is required'] },
    postVoteId: { type: Number, required: [true, 'postVoteId is required'] },
})

const PostVote = mongoose.models.PostVote || mongoose.model('PostVote', PostVoteSchema);
export default PostVote;