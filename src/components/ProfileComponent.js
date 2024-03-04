

"use client"

import { useState } from "react"
import { updateUser } from "@/components/controller"
import Link from "next/link"

export default function ProfileComponent(props) {

    const [editMode, setEditMode] = useState(false)
    const [message, setMessage] = useState("");

    function toggleEditMode() {
        setEditMode(!editMode)
    }

    return (
        <main className='flex-1 mx-auto py-2 px-2'>
            <h2 className="py-10 text-2xl text-slate-700 font-medium">Your Profile</h2>
            <p>Username: {props.user.username}</p>
            {editMode
                ? <form action={updateUser} className="flex flex-col">
                    <input type="password" id="password" name="password" placeholder="New Password" required className="px-2 border rounded-lg border-slate-700 py-1" />
                    <input type="text" name='userId' id='userId' defaultValue={props.user.userId} className="hidden" />
                    <button type="submit" className="rounded-xl my-5 py-2 px-2 bg-slate-700 text-white" >Change password</button>
                    <button className="" onClick={toggleEditMode}>Cancel</button>
                </form>
                :
                <button className="rounded-xl my-5 py-2 px-2 bg-slate-700 text-white" onClick={toggleEditMode}>Change password</button>}
            <p>{message}</p>
            <h2 className="py-5 text-2xl text-slate-700 font-medium">Your Posts</h2>
            {props.posts.length === 0 ? <p>You have not posted anything yet!</p> : props.posts.map((post) => <div key={post.postId} className="py-3">
                <Link href={`/posts/${post.postId.toString()}`} className="">
                    <p>Posted by <strong>{post.username}</strong> on {post.date}</p>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                </Link>
            </div>)}
            <h2 className="py-5 text-2xl text-slate-700 font-medium">Your Comments</h2>
            {props.comments.length === 0 ? <p>You have not added any comments yet!</p> : props.comments.map((comment) => <div key={comment.commentId} className="my-3">
                <Link href={`/posts/${comment.postId.toString()}`} className="">
                    <p><strong>{comment.username}</strong> {comment.date}</p>
                    <p>{comment.content}</p>
                </Link>
            </div>)}
            <h2 className="py-5 text-2xl text-slate-700 font-medium">Your Replies</h2>
            {props.replies.length === 0 ? <p>You have not added any replies yet!</p> : props.replies.map((reply) => <div key={reply.replyId} className="my-3">
                <Link href={`/posts/${reply.postId.toString()}`} className="">
                    <p><strong>{reply.username}</strong> {reply.date}</p>
                    <p>{reply.content}</p>
                </Link>
            </div>)}
        </main>
    )
}