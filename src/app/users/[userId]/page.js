

import ProfileComponent from "@/components/ProfileComponent";
import Post from "@/models/Post"
import Comment from "@/models/Comment"
import Reply from "@/models/Reply"
import { auth } from '@/auth';

export default async function ProfilePage() {

    const session = await auth();
    const posts = await Post.find({ postId: parseInt(session.user.userId) }).lean();
    const comments = await Comment.find({ postId: parseInt(session.user.userId) }).lean();
    const replies = await Reply.find({ postId: parseInt(session.user.userId) }).lean();

    return(
        <ProfileComponent user={session?.user} posts={posts} comments={comments} replies={replies}/>
    )
}