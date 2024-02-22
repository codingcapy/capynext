
/*
author: Paul Kim
date: February 22, 2024
version: 1.0
description: ReplyComponent for CapyNext
 */

"use client";

import { useState, useEffect } from "react";
import { TbArrowBigUp, TbArrowBigDown, TbArrowBigUpFilled, TbArrowBigDownFilled } from 'react-icons/tb';
import { createReply } from "./controller";

export default function ReplyComponent(props) {

    const [replyMode, setReplyMode] = useState(false);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        setLoading(true); // Set loading to true when component mounts
        setLoading(false); // Set loading to false when replies are received
    }, [props.replies]);

    function toggleReplyMode() {
        setReplyMode(!replyMode);
    }

    return (
        <div className="ml-5 pl-2 my-3 border border-cyan-400 border-t-0 border-l-2 border-r-0 border-b-0">
            <p className="py-2"><strong>{props.username}</strong> {props.date} {props.edited && '(edited)'}</p>
            <p className="py-2">{props.content}</p>
            <p className="">Upvotes: <button className="px-1"><TbArrowBigUp size={20} /></button><button className="px-1"><TbArrowBigDown size={20} /></button>{props.user && <button onClick={toggleReplyMode} className="px-3 font-bold">Reply</button>}</p>
            {replyMode && <div>
                <form action={createReply} >
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
                ) : ""}
            </div>
        </div>
    )
}