

"use client"

import { useState } from "react"
import { TbArrowBigUp, TbArrowBigDown, TbArrowBigUpFilled, TbArrowBigDownFilled } from 'react-icons/tb'
import { createReply } from "./controller"

export default function CommentComponent(props) {

    const [replyMode, setReplyMode] = useState(false)

    function toggleReplyMode() {
        setReplyMode(!replyMode)
    }

    return (
        <div className="my-3">
            <p className="py-2"><strong>{props.username}</strong> {props.date} {props.edited && '(edited)'}</p>
            <p className="py-2">{props.content} {props.deleted ? "" : props.username === props.user?.username && <button className="font-bold">Edit</button>}</p>
            <p>Upvotes: <button className="px-1"><TbArrowBigUp size={20} /></button><button className="px-1"><TbArrowBigDown size={20} /></button>
            {props.user && <button onClick={toggleReplyMode} className="px-3 font-bold">Reply</button>}</p>
            {replyMode && <div>
                <form action={createReply}>
                    <input type="text" name="content" id="content" className="px-2 py-1 border rounded-lg border-slate-700" required />
                    <input type="text" name='postId' id='postId' defaultValue={props.postId} className="hidden" />
                    <input type="text" name='commentId' id='commentId' defaultValue={props.id} className="hidden" />
                    <input type="text" name='userId' id='userId' defaultValue={props.user.userId} className="hidden" />
                    <input type="text" name='username' id='username' defaultValue={props.user.username} className="hidden" />
                    <p><button type="submit" className="px-3 font-bold">Reply</button>
                        <button className="px-3 font-bold" onClick={toggleReplyMode}>Cancel</button></p>
                </form>
            </div>}
            <div>
                {props.replies.map((reply)=>{reply.content})}
            </div>
        </div>
    )
}