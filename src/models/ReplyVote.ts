
/*
author: Paul Kim
date: March 1, 2024
version: 1.0
description: reply vote schema for CapyNext
 */

import mongoose from "mongoose";

const ReplyVoteSchema = new mongoose.Schema({
    _id: { type: Number, required: true, default: 1 },
    value: { type: Number, required: [true, 'value is required'] },
    postId: { type: Number, required: [true, 'postId is required'] },
    commentId: { type: Number, required: [true, 'commentId is required'] },
    replyId: { type: Number, required: [true, 'replyId is required'] },
    voterId: { type: Number, required: [true, 'voterId is required'] },
    replyVoteId: { type: Number, required: [true, 'replyVoteId is required'] },
})

const ReplyVote = mongoose.models.ReplyVote ||mongoose.model('ReplyVote', ReplyVoteSchema);
export default ReplyVote;