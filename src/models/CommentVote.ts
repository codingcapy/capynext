/*
author: Paul Kim
date: February 22, 2024
version: 1.0
description: CommentVote model schema for CapyNext
 */

import mongoose from "mongoose";

const CommentVoteSchema = new mongoose.Schema({
    _id: { type: Number, required: true, default: 1 },
    value: { type: Number, required: [true, 'value is required'] },
    postId: { type: Number, required: [true, 'postId is required'] },
    commentId: { type: Number, required: [true, 'commentId is required'] },
    voterId: { type: Number, required: [true, 'voterId is required'] },
    commentVoteId: { type: Number, required: [true, 'commentVoteId is required'] },
})

const CommentVote = mongoose.models.CommentVote || mongoose.model('CommentVote', CommentVoteSchema);
export default CommentVote;