
/*
author: Paul Kim
date: February 22, 2024
version: 1.0
description: CommentComponent for CapyNext
 */

"use client";

import { useState, useEffect } from "react";
import { TbArrowBigUp, TbArrowBigDown, TbArrowBigUpFilled, TbArrowBigDownFilled } from 'react-icons/tb';
import { createCommentVote, createReply, deleteComment, updateComment } from "./controller";
import ReplyComponent from './ReplyComponent';
import Link from "next/link";

export default function CommentComponent(props) {

    const [commentEditMode, setCommentEditMode] = useState(false)
    const [replyMode, setReplyMode] = useState(false);
    const [editedContent, setEditedContent] = useState(props.content);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        setLoading(true); // Set loading to true when component mounts
        setLoading(false); // Set loading to false when replies are received
    }, [props.replies]);

    function toggleCommentEditMode() {
        setCommentEditMode(!commentEditMode)
    }

    function toggleReplyMode() {
        setReplyMode(!replyMode);
    }

    useEffect(() => {
        setCommentEditMode(false)
    }, [props.content])

    useEffect(() => {
        setReplyMode(false)
    }, [props.comments])

    return (
        <div className="my-3">
            <p className="py-2"><strong>{props.username}</strong> {props.date} {props.edited && '(edited)'}</p>
            {commentEditMode
                ? <form action={updateComment}>
                    <input type="text" name='postId' id='postId' defaultValue={props.postId} className="hidden" />
                    <input type="text" name='commentId' id='commentId' defaultValue={props.commentId} className="hidden" />
                    <input type="text" name="content" id="content" value={editedContent} onChange={(e) => setEditedContent(e.target.value)} className="px-2 py-1 border rounded-lg border-slate-700" required />
                    <p><button type="submit" className="font-bold">Update</button>
                        <button onClick={toggleCommentEditMode} className="px-3 font-bold">Cancel</button></p>
                </form>
                : <div className="py-2 flex">{props.content} {props.deleted ? "" : props.username === props.user?.username && <button onClick={toggleCommentEditMode} className="pl-2 font-bold">Edit</button>}
                    {props.deleted ? "" : props.username === props.user?.username && <form action={deleteComment}>
                        <input type="text" name='postId' id='postId' defaultValue={props.postId} className="hidden" />
                        <input type="text" name='commentId' id='commentId' defaultValue={props.commentId} className="hidden" /><button type="submit" className="px-3 font-bold">Delete</button></form>}</div>
            }
            <div className="flex">Upvotes: {props.commentVotes.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0)}
                {props.user?.username !== props.username
                    ? props.commentVotes.find((commentVote) => commentVote.voterId === props.user?.userId) !== undefined && props.commentVotes.find((commentVote) => commentVote.voterId === props.user?.userId).value > 0
                        ? props.user && <form action={createCommentVote}>
                            <input id="postId" name="postId" defaultValue={props.postId} className="hidden" />
                            <input id="commentId" name="commentId" defaultValue={props.commentId} className="hidden" />
                            <input id="voterId" name="voterId" defaultValue={props.user?.userId} className="hidden" />
                            <input id="value" name="value" defaultValue={0} className="hidden" />
                            <button className="px-1"><TbArrowBigUpFilled size={20} /></button>
                        </form>
                        : props.user && <form action={createCommentVote}>
                            <input id="postId" name="postId" defaultValue={props.postId} className="hidden" />
                            <input id="commentId" name="commentId" defaultValue={props.commentId} className="hidden" />
                            <input id="voterId" name="voterId" defaultValue={props.user?.userId} className="hidden" />
                            <input id="value" name="value" defaultValue={1} className="hidden" />
                            <button className="px-1"><TbArrowBigUp size={20} /></button>
                        </form>
                    : ""}
                {props.user?.username !== props.username
                    ? props.commentVotes.find((commentVote) => commentVote.voterId === props.user?.userId) !== undefined && props.commentVotes.find((commentVote) => commentVote.voterId === props.user?.userId).value < 0
                        ? props.user && <form action={createCommentVote}>
                            <input id="postId" name="postId" defaultValue={props.postId} className="hidden" />
                            <input id="commentId" name="commentId" defaultValue={props.commentId} className="hidden" />
                            <input id="voterId" name="voterId" defaultValue={props.user?.userId} className="hidden" />
                            <input id="value" name="value" defaultValue={0} className="hidden" />
                            <button type="submit" className="px-1"><TbArrowBigDownFilled size={20} /></button>
                        </form>
                        : props.user && <form action={createCommentVote}>
                            <input id="postId" name="postId" defaultValue={props.postId} className="hidden" />
                            <input id="commentId" name="commentId" defaultValue={props.commentId} className="hidden" />
                            <input id="voterId" name="voterId" defaultValue={props.user?.userId} className="hidden" />
                            <input id="value" name="value" defaultValue={-1} className="hidden" />
                            <button type="submit" className="px-1"><TbArrowBigDown size={20} /></button>
                        </form>
                    : ""}
                {props.user && <button onClick={toggleReplyMode} className="px-3 font-bold">Reply</button>}</div>
            {replyMode && <div>
                <form action={createReply}>
                    <input type="text" name="content" id="content" className="px-2 py-1 border rounded-lg border-slate-700" required />
                    <input type="text" name='postId' id='postId' defaultValue={props.postId} className="hidden" />
                    <input type="text" name='commentId' id='commentId' defaultValue={props.commentId} className="hidden" />
                    <input type="text" name='userId' id='userId' defaultValue={props.user.userId} className="hidden" />
                    <input type="text" name='username' id='username' defaultValue={props.user.username} className="hidden" />
                    <p><button type="submit" className="px-3 font-bold">Reply</button>
                        <button className="px-3 font-bold" onClick={toggleReplyMode}>Cancel</button></p>
                </form>
            </div>}
            <div>
                {loading ? (
                    <p>Loading replies...</p>
                ) : (
                    props.replies.map((reply) => <ReplyComponent 
                    key={reply.replyId} 
                    replyId={reply.replyId} 
                    content={reply.content} 
                    date={reply.date.toLocaleString()} 
                    edited={reply.edited} 
                    deleted={reply.deleted} 
                    postId={reply.postId} 
                    commentId={props.commentId} 
                    username={reply.username} 
                    user={props.user} 
                    replies={props.replies.filter((reply) => reply.commentId === props.commentId)} />)
                )}
            </div>
        </div>
    );
}
