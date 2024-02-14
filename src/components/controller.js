

"use server"

import { redirect } from "next/navigation"
import bcrypt from "bcrypt"
import { auth } from '@/auth'
import User from "@/models/User";
import Chat from "@/models/Chat"
import Message from "@/models/Message";
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
    const content = formData.get('content')
    const username = formData.get('username')
    const userId = formData.get('userId')
    await Post.create({ title, content, username, userId, postId })
    redirect("/")
}

export async function addFriend(formData) {
    const inputUser = formData.get('currentuser')
    //console.log(inputUser)
    const user = await User.findOne({ username: inputUser })
    //console.log(user)
    const inputFriend = formData.get('frienduser')
    //console.log(inputFriend)
    const friend = await User.findOne({ username: inputFriend })
    //console.log((friend))
    if (!friend) return
    if (friend.username in user.friends) return
    await User.updateOne({ username: inputUser }, { $push: { friends: friend.username } })
    await User.updateOne({ username: inputFriend }, { $push: { friends: user.username } })
    redirect("/")
}

export async function createChat(formData) {
    const chats = await Chat.find({})
    const chatId = chats.length === 0 ? 1 : chats[chats.length - 1].chatId + 1
    const title = formData.get('title')
    const user = formData.get('user')
    const friend = formData.get('friend')
    await Chat.create({ title, chatId })
    await Chat.updateOne({ chatId: chatId }, { $push: { users: user } })
    await Chat.updateOne({ chatId: chatId }, { $push: { users: friend } })
    const chat = await Chat.findOne({ chatId: chatId })
    await User.updateOne({ username: user }, { $push: { chats: chat } })
    await User.updateOne({ username: friend }, { $push: { chats: chat } })
    redirect("/")
}

export async function addFriendToChat(formData) {
    const chatId = formData.get('chatid')
    const friend = formData.get('friend')
    await Chat.updateOne({ chatId: chatId }, { $push: { users: friend } })
}

export async function blockUser(formData) {
    const inputUser = formData.get('currentuser')
    const user = await User.findOne({ username: inputUser })
    const inputFriend = formData.get('frienduser')
    await User.updateOne({ username: inputUser }, { $pull: { friends: inputFriend } })
    await User.updateOne({ username: inputUser }, { $push: { blocked: inputFriend } })
}

export async function createMessage(formData) {
    const inputContent = formData.get('content')
    const user = formData.get('user')
    const chatId = formData.get('chatid')
    const messages = await Message.find({})
    const messageId = messages.length === 0 ? 1 : messages[messages.length - 1].messageId + 1
    await Message.create({ content: inputContent, username: user, messageId })
    const message = await Message.findOne({ messageId: messageId })
    const chat = await Chat.findOne({ chatId: parseInt(chatId) })
    try { await Chat.updateOne({ chatId: parseInt(chatId) }, { $push: { messages: message } }) }
    catch (err) { console.log(err) }
}