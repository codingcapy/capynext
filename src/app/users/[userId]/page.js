

import ProfileComponent from "@/components/ProfileComponent";
import Post from "@/models/Post"
import Comment from "@/models/Comment"
import Reply from "@/models/Reply"
import { auth } from '@/auth';

export default async function ProfilePage() {

    const session = await auth();
    const posts = await Post.find({ userId: parseInt(session.user.userId) }).lean();
    const comments = await Comment.find({ userId: parseInt(session.user.userId) }).lean();
    const replies = await Reply.find({ userId: parseInt(session.user.userId) }).lean();

    posts.forEach((post)=>{
        post.date = new Date(post.date).toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false,
        });
    })

    comments.forEach((comment)=>{
        comment.date = new Date(comment.date).toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false,
        });
    })

    replies.forEach((reply)=>{
        reply.date = new Date(reply.date).toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false,
        });
    })

    return(
        <ProfileComponent user={session?.user} posts={posts} comments={comments} replies={replies}/>
    )
}