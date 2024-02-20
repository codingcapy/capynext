
/*
author: Paul Kim
date: December 15, 2023
version: 1.0
description: reply schema for CocoDogo
 */

import mongoose from "mongoose";

const ReplySchema = new mongoose.Schema({
    content: { type: String, required: [true, 'content is required'], trim: true, maxlength: [40000, 'content char limit is 40000'] },
    date: { type: Date, default: Date.now },
    edited: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
    username: { type: String, required: true },
    userId: { type: Number, required: true },
    postId: { type: Number, required: true },
    commentId: { type: Number, required: true },
    replyId: { type: Number, required: true }
})

const Reply =  mongoose.models.Reply || mongoose.model('Reply', ReplySchema)
export default Reply;