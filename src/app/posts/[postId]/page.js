
/*
author: Paul Kim
date: February 22, 2024
version: 1.0
description: post details page for CapyNext
 */

import { auth } from '@/auth';
import Post from '@/models/Post';
import Comment from '@/models/Comment';
import PostVote from '@/models/PostVote';
import Reply from '@/models/Reply';
import CommentComponent from '@/components/CommentComponent';
import PostComponent from '@/components/PostComponent';
import { TbArrowBigUp, TbArrowBigDown, TbArrowBigUpFilled, TbArrowBigDownFilled } from 'react-icons/tb';
import { createComment, createPost } from '@/components/controller';

export default async function PostDetailsPage({ params }) {

    const session = await auth();
    const post = await Post.findOne({ postId: parseInt(params.postId) }).lean();
    const comments = await Comment.find({ postId: parseInt(params.postId) }).lean();
    const postVotes = await PostVote.find({ postId: parseInt(params.postId) }).lean();
    const replies = await Reply.find({ postId: parseInt(params.postId) }).lean();

    return (
        <main className='flex-1 mx-auto py-2 px-2'>
            <PostComponent post={post} session={session} comments={comments} replies={replies} postVotes={postVotes} />
        </main>
    )

}