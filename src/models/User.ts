
/*
author: Paul Kim
date: February 22, 2024
version: 1.0
description: User model schema for CapyNext
 */

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    _id: { type: Number, required: true, default: 1 },
    username: { type: String, required: [true, 'username is required'], trim: true, maxlength: [80, 'username char limit is 80'] },
    password: { type: String, required: [true, 'password is required'], maxlength: [80, 'password char limit is 80'] },
    date: { type: Date, required: true, default: Date.now },
    active: { type: Boolean, required: true, default: true },
    userId: { type: Number, required: [true, 'userId is required'] }
})

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;