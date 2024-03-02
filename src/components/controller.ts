
/*
author: Paul Kim
date: February 22, 2024
version: 1.0
description: controller component for CapyNext
 */

"use server"

import { redirect } from "next/navigation"
import bcrypt from "bcrypt"
import { auth } from '@/auth'
import User from "@/models/User";
import Post from "../models/Post";
import Comment from "../models/Comment";
import Reply from "../models/Reply"
import PostVote from "../models/PostVote"

const saltRounds = 10;

export async function createUser(formData) {
    const users = await User.find({})
    const userId = users.length === 0 ? 1 : users[users.length - 1].userId + 1
    const _id = users.length === 0 ? 1 : users[users.length - 1].userId + 1
    const username = formData.get("username")
    const password = formData.get("password")
    if (users.find((user) => user.username === username.toString())) {
        return
    }
    else {
        const encrypted = await bcrypt.hash(password, saltRounds)
        const user = await User.create({ _id, username: username, password: encrypted, userId: userId })
        redirect("/api/auth/signin")
    }
}

export async function validateSession() {
    const session = await auth();
    !session && redirect("/")
    return session
}

export async function createPost(formData) {
    const posts = await Post.find({})
    const postId = posts.length === 0 ? 1 : posts[posts.length - 1].postId + 1
    const _id = posts.length === 0 ? 1 : posts[posts.length - 1].postId + 1
    const title = formData.get('title')
    let topic = formData.get('topic')
    if (topic == "") {
        topic = "General"
    }
    const content = formData.get('content')
    const username = formData.get('username')
    const userId = formData.get('userId')
    await Post.create({ _id, title, topic, content, username, userId, postId })
    redirect("/")
}

export async function getPosts() {
    try {
        const allPosts = await Post.find({})
        let post = 0
        if (allPosts.length < 10) {
            post = allPosts.length
        }
        else {
            post = 10
        }
        const posts = await Post.find({ postId: { $gte: 1, $lte: post } }).limit(10)
        const pages: number[] = []
        for (let i = 0; i < allPosts.length; ++i) {
            if (i % 10 == 0) {
                pages.push(i / 10 + 1)
            }
        }
        const comments = await Comment.find({ postId: { $gte: 1, $lte: post } })
        const replies = await Reply.find({ postId: { $gte: 1, $lte: post } })
        const postVotes = await PostVote.find({ postId: { $gte: 1, $lte: post } })
    }
    catch (err) {
        console.log(err)
    }
}

export async function updatePost(formData) {
    const postId = formData.get('postId')
    const title = formData.get('title')
    const topic = formData.get('topic')
    const content = formData.get('content')
    const edited = true;
    const deleted = false;
    await Post.findOneAndUpdate(
        { postId: postId },
        { title, topic, content, edited, deleted },
        { new: true }
    );
    redirect(`/posts/${postId}`)
}

export async function deletePost(formData) {
    const postId = formData.get('postId')
    const content = "[This post was deleted]"
    const edited = false;
    const deleted = true;
    await Post.findOneAndUpdate(
        { postId: postId },
        { content, edited, deleted },
        { new: true }
    );
    redirect(`/posts/${postId}`)
}

export async function createComment(formData) {
    const comments = await Comment.find({})
    const commentId = comments.length === 0 ? 1 : comments[comments.length - 1].commentId + 1;
    const _id = comments.length === 0 ? 1 : comments[comments.length - 1].commentId + 1;
    const content = formData.get('content')
    const username = formData.get('username')
    const userId = formData.get('userId')
    const postId = formData.get('postId')
    await Comment.create({ _id, content, username, commentId, userId, postId: parseInt(postId) })
    redirect(`/posts/${postId}`)
}

export async function updateComment(formData) {
    const postId = formData.get('postId')
    const commentId = formData.get('commentId')
    const content = formData.get('content')
    const edited = true;
    const deleted = false;
    await Comment.findOneAndUpdate(
        { commentId: parseInt(commentId) },
        { content, edited, deleted },
        { new: true }
    );
    redirect(`/posts/${postId}`)
}

export async function deleteComment(formData) {
    const postId = formData.get('postId')
    const commentId = formData.get('commentId')
    const content = "[This post was deleted]"
    const edited = false;
    const deleted = true;
    await Comment.findOneAndUpdate(
        { commentId: parseInt(commentId) },
        { content, edited, deleted },
        { new: true }
    );
    redirect(`/posts/${postId}`)
}

export async function createReply(formData) {
    const replies = await Reply.find({})
    const replyId = replies.length === 0 ? 1 : replies[replies.length - 1].replyId + 1;
    const _id = replies.length === 0 ? 1 : replies[replies.length - 1].replyId + 1;
    const content = formData.get('content')
    const username = formData.get('username')
    const userId = formData.get('userId')
    const postId = formData.get('postId')
    const commentId = formData.get('commentId')
    await Reply.create({ _id, content, username, userId: parseInt(userId), postId: parseInt(postId), commentId: parseInt(commentId), replyId })
    redirect(`/posts/${postId}`)
}

export async function updateReply(formData) {
    const postId = formData.get('postId')
    const replyId = formData.get('replyId')
    const content = formData.get('content')
    const edited = true;
    const deleted = false;
    await Reply.findOneAndUpdate(
        { replyId: parseInt(replyId) },
        { content, edited, deleted },
        { new: true }
    );
    redirect(`/posts/${postId}`)
}

export async function deleteReply(formData) {
    const postId = formData.get('postId')
    const replyId = formData.get('replyId')
    const content = "[This post was deleted]"
    const edited = false;
    const deleted = true;
    await Reply.findOneAndUpdate(
        { replyId: parseInt(replyId) },
        { content, edited, deleted },
        { new: true }
    );
    redirect(`/posts/${postId}`)
}

export async function createPostVote(formData) {
    const postVotes = await PostVote.find({})
    const postVoteId = postVotes.length === 0 ? 1 : postVotes[postVotes.length - 1].postVoteId + 1
    const _id = postVotes.length === 0 ? 1 : postVotes[postVotes.length - 1].postVoteId + 1
    const value = formData.get('value')
    const postId = formData.get('postId')
    const voterId = formData.get('voterId')
    const postVote = await PostVote.find({ voterId: voterId })
    if (postVote.length > 0) {
        await PostVote.findOneAndUpdate({ voterId: voterId }, { value })
        redirect(`/posts/${postId}`)
    }
    else {

        await PostVote.create({ _id, value, postId, voterId, postVoteId })
        redirect(`/posts/${postId}`)
    }
}