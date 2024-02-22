
/*
author: Paul Kim
date: February 22, 2024
version: 1.0
description: ReplyComponent for CapyNext
 */

"use client";

import { useState } from "react";
import { createComment } from "./controller";
import { TbArrowBigUp, TbArrowBigDown, TbArrowBigUpFilled, TbArrowBigDownFilled } from 'react-icons/tb';
import CommentComponent from '@/components/CommentComponent';


export default function PostComponent(props) {

    const [editMode, setEditMode] = useState(false);
    const [editedTitle, setEditedTitle] = useState(props.post.title);
    const [editedContent, setEditedContent] = useState(props.post.content);

    function toggleEditMode() {
        setEditMode(!editMode);
    }

    return (
        <div className="py-10 px-10 shadow-xl">
            {editMode
                ? <form className="flex flex-col">
                    <h2>Edit Post</h2>
                    <div className="flex flex-col">
                        <label htmlFor="title">Title</label>
                        <input type="text" name='title' id='title' placeholder="Title" value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)} required className="px-2 border rounded-lg border-slate-700 py-1" />
                    </div>
                    <div className="flex flex-col my-2">
                        <label htmlFor="content">Content</label>
                        <textarea type="text" name='content' id='content' placeholder='Content' value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)} required rows="10" cols="50" className="px-2 border rounded-lg border-slate-700 py-1" />
                    </div>
                    <button type="submit" className="rounded-xl my-5 py-2 px-2 bg-slate-700 text-white">Update</button>
                    <button onClick={toggleEditMode} className="">Cancel</button>
                </form>
                : <div>
                    <p>Posted by <strong>{props.post.username}</strong> on {props.post.date.toLocaleString()} {props.post.edited && "(edited)"}</p>
                    <h2 className="py-5 text-2xl text-slate-700 font-medium text-center">{props.post.title}</h2>
                    <div><TbArrowBigUp size={25} /></div>
                    <p className="px-2"> {props.postVotes.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0)}</p>
                    <div className=""><TbArrowBigDown size={25} /></div>
                    <p className="py-3">{props.post.content}</p>
                    {props.post.deleted ? "" : props.session?.user?.username === props.post.username && <button onClick={toggleEditMode} className="px-3 py-3 font-bold">Edit</button>}
                    <h3 className="py-5 text-2xl text-slate-700 font-medium">Comments</h3>
                    {!props.session && <p>Please log in to add comments!</p>}
                    {props.session && <form action={createComment}>
                        <label htmlFor="content">Add comment</label>
                        <div className="flex flex-col">
                            <textarea type="text" name="content" id="content" placeholder="What are your thoughts?" required rows="5" cols="15" className="px-2 border rounded-lg border-slate-700 py-1" />
                            <button type="submit" className="rounded-xl my-5 py-2 px-2 bg-slate-700 text-white">Comment</button>
                            <input type="text" name='username' id='username' defaultValue={props.session?.user.username} className="hidden" />
                            <input type="text" name='userId' id='userId' defaultValue={props.session?.user.userId} className="hidden" />
                            <input type="text" name='postId' id='postId' defaultValue={props.post.postId} className="hidden" />
                        </div>
                    </form>}
                    {props.comments.map((comment) => <CommentComponent key={comment.commentId} id={comment.commentId} username={comment.username} user={props.session?.user} content={comment.content} date={comment.date.toLocaleString()} edited={comment.edited} deleted={comment.deleted} postId={comment.postId} replies={props.replies.filter((reply) => reply.commentId === comment.commentId)} />)}
                </div>}
        </div>
    )
}