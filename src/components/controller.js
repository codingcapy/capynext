

"use server"

import { redirect } from "next/navigation"
import bcrypt from "bcrypt"
import { auth } from '@/auth'
import User from "@/models/User";
import Post from "../models/Post";

const saltRounds = 10;

export async function createUser(formData) {
    const users = await User.find({})
    const userId = users.length === 0 ? 1 : users[users.length - 1].userId + 1
    const username = formData.get("username")
    const password = formData.get("password")
    if (users.find((user) => user.username === username.toString())) {
        return
    }
    else {
        const encrypted = await bcrypt.hash(password, saltRounds)
        const user = await User.create({ username: username, password: encrypted, userId: userId })
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
    const title = formData.get('title')
    let topic = formData.get('topic')
    if (topic == ""){
        topic = "General"
    }
    const content = formData.get('content')
    const username = formData.get('username')
    const userId = formData.get('userId')
    await Post.create({ title, topic, content, username, userId, postId })
    redirect("/")
}

