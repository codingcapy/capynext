
/*
author: Paul Kim
date: February 22, 2024
version: 1.0
description: ReplyComponent for CapyNext
 */

"use client";

import { useEffect, useState } from "react";
import { createComment, createPostVote, deletePost, updatePost } from "./controller";
import { TbArrowBigUp, TbArrowBigDown, TbArrowBigUpFilled, TbArrowBigDownFilled } from 'react-icons/tb';
import CommentComponent from '@/components/CommentComponent';
import Link from "next/link";


export default function PostComponent(props) {

    const [editMode, setEditMode] = useState(false);
    const [editedTitle, setEditedTitle] = useState(props.post.title);
    const [editedTopic, setEditedTopic] = useState(props.post.topic);
    const [editedContent, setEditedContent] = useState(props.post.content);
    const [commentContent, setCommentContent] = useState("")

    function toggleEditMode() {
        setEditMode(!editMode);
    }

    function formatDate(date) {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false,
        };
        return new Date(date).toLocaleString('en-US', options);
    }

    useEffect(() => {
        setEditMode(false)
    }, [props.post])

    useEffect(() => {
        setCommentContent("")
    }, [props.comments])

    return (
        <div className="py-10 px-10 shadow-xl">
            {editMode
                ? <form action={updatePost} className="flex flex-col">
                    <h2>Edit Post</h2>
                    <div className="flex flex-col">
                        <label htmlFor="title">Title</label>
                        <input type="text" name='title' id='title' placeholder="Title" value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)} required className="px-2 border rounded-lg border-slate-700 py-1" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="topic">Topic</label>
                        <input type="text" name='topic' id='topic' placeholder="Topic" value={editedTopic}
                            onChange={(e) => setEditedTopic(e.target.value)} required className="px-2 border rounded-lg border-slate-700 py-1" />
                    </div>
                    <div className="flex flex-col my-2">
                        <label htmlFor="content">Content</label>
                        <textarea type="text" name='content' id='content' placeholder='Content' value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)} required rows="10" cols="50" className="px-2 border rounded-lg border-slate-700 py-1" />
                    </div>
                    <input type="text" name='postId' id='postId' defaultValue={props.post.postId} required className="hidden" />
                    <button type="submit" className="rounded-xl my-5 py-2 px-2 bg-slate-700 text-white">Update</button>
                    <button onClick={toggleEditMode} className="">Cancel</button>
                </form>
                : <div>
                    <p>Posted by <strong>{props.post.username}</strong> on {formatDate(props.post.date)} {props.post.edited && "(edited)"}</p>
                    <h2 className="py-5 text-2xl text-slate-700 font-medium text-center">{props.post.title}</h2>
                    {props.session?.user?.username !== props.post.username
                        ? props.postVotes.find((postVote) => postVote.voterId === props.session.user?.userId) !== undefined && props.postVotes.find((postVote) => postVote.voterId === props.session.user?.userId).value > 0
                            ? props.session?.user && <form action={createPostVote}>
                                <input id="postId" name="postId" defaultValue={props.post.postId} className="hidden" />
                                <input id="voterId" name="voterId" defaultValue={props.session?.user.userId} className="hidden" />
                                <input id="value" name="value" defaultValue={0} className="hidden" />
                                <button type="submit" className=""><TbArrowBigUpFilled size={25} /></button>
                            </form>
                            : props.session?.user && <form action={createPostVote}><input id="postId" name="postId" defaultValue={props.post.postId} className="hidden" />
                                <input id="voterId" name="voterId" defaultValue={props.session?.user.userId} className="hidden" />
                                <input id="value" name="value" defaultValue={1} className="hidden" />
                                <button type="submit"><TbArrowBigUp size={25} /></button>
                            </form>
                        : <div><TbArrowBigUp size={25} /></div>}
                    {!props.session?.user && <Link href={"/api/auth/signin"}><TbArrowBigUp size={25} /></Link>}
                    <p className="px-2"> {props.postVotes.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0)}</p>
                    {props.session?.user?.username !== props.post.username
                        ? props.postVotes.find((postVote) => postVote.voterId === props.session.user?.userId) !== undefined && props.postVotes.find((postVote) => postVote.voterId === props.session.user?.userId).value < 0
                            ? props.session?.user && <form action={createPostVote}>
                                <input id="postId" name="postId" defaultValue={props.post.postId} className="hidden" />
                                <input id="voterId" name="voterId" defaultValue={props.session?.user.userId} className="hidden" />
                                <input id="value" name="value" defaultValue={0} className="hidden" />
                                <button type="submit" className=""><TbArrowBigDownFilled size={25} /></button>
                            </form>
                            : props.session?.user && <form action={createPostVote}>
                                <input id="postId" name="postId" defaultValue={props.post.postId} className="hidden" />
                                <input id="voterId" name="voterId" defaultValue={props.session?.user.userId} className="hidden" />
                                <input id="value" name="value" defaultValue={-1} className="hidden" />
                                <button type="submit"><TbArrowBigDown size={25} /></button>
                            </form>
                        : <div className=""><TbArrowBigDown size={25} /></div>}
                    {!props.session?.user && <Link href={"/api/auth/signin"}><TbArrowBigDown size={25} /></Link>}
                    <p className="py-3">{props.post.content}</p>
                    {props.post.deleted ? "" : props.session?.user?.username === props.post.username && <button onClick={toggleEditMode} className="px-3 py-3 font-bold">Edit</button>}
                    {props.post.deleted ? "" : props.session?.user?.username === props.post.username && <form action={deletePost}><input type="text" name='postId' id='postId' defaultValue={props.post.postId} required className="hidden" /><button type="submit" className="px-3 font-bold">Delete</button></form>}
                    <h3 className="py-5 text-2xl text-slate-700 font-medium">Comments</h3>
                    {!props.session && <p>Please log in to add comments!</p>}
                    {props.session && <form action={createComment}>
                        <label htmlFor="content">Add comment</label>
                        <div className="flex flex-col">
                            <textarea type="text" name="content" id="content" placeholder="What are your thoughts?" required value={commentContent} onChange={(e) => setCommentContent(e.target.value)} rows="5" cols="15" className="px-2 border rounded-lg border-slate-700 py-1" />
                            <button type="submit" className="rounded-xl my-5 py-2 px-2 bg-slate-700 text-white">Comment</button>
                            <input type="text" name='username' id='username' defaultValue={props.session?.user.username} className="hidden" />
                            <input type="text" name='userId' id='userId' defaultValue={props.session?.user.userId} className="hidden" />
                            <input type="text" name='postId' id='postId' defaultValue={props.post.postId} className="hidden" />
                        </div>
                    </form>}
                    {props.comments.map((comment) => <CommentComponent key={comment.commentId} commentId={comment.commentId} username={comment.username} user={props.session?.user} content={comment.content} date={formatDate(comment.date)} edited={comment.edited} deleted={comment.deleted} postId={comment.postId} replies={props.replies.filter((reply) => reply.commentId === comment.commentId)} comments={props.comments} />)}
                </div>}
        </div>
    )
}