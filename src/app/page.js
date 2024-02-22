
/*
author: Paul Kim
date: February 22, 2024
version: 1.0
description: Home page for CapyNext
 */

import Link from 'next/link';
import Post from '@/models/Post';
import Comment from '@/models/Comment';
import Reply from '@/models/Reply';
import PostVote from '@/models/PostVote';

export default async function Home() {

  const allPosts = await Post.find({});
  let post = 0;
  if (allPosts.length < 10) {
    post = allPosts.length;
  }
  else {
    post = 10;
  }
  const posts = await Post.find({ postId: { $gte: 1, $lte: post } }).limit(10);
  const pages = [];
  for (let i = 0; i < allPosts.length; ++i) {
    if (i % 10 == 0) {
      pages.push(i / 10 + 1);
    }
  }
  const comments = await Comment.find({ postId: { $gte: 1, $lte: post } });
  const replies = await Reply.find({ postId: { $gte: 1, $lte: post } });
  const postVotes = await PostVote.find({ postId: { $gte: 1, $lte: post } });

  return (
    <main className='flex-1 mx-auto py-2 px-2'>
      <h2 className="py-10 text-2xl font-medium text-center">CapyNext</h2>
      <div className="md:grid md:gap-4 md:grid-cols-3">
        {posts.map((post) =>
          <div key={post.postId} className="border border-slate-700 rounded-xl px-3 py-3">
            <Link href={`/posts/${post.postId}`} className="flex flex-col text-center">
              <p className="py-2">Posted by <strong>{post.username}</strong> on {post.date.toLocaleString()}</p>
              <p >upvotes: {postVotes.filter((postVote) => postVote.postId === post.postId).reduce((accumulator, currentValue) => accumulator + currentValue.value, 0)}</p>
              <h3 className="py-3 text-2xl text-slate-700 font-medium">{post.title}</h3>
              <p>{post.content.length > 425 ? post.content.slice(0, 425) + " ..." : post.content}</p>
              <p className="py-3">{comments.filter((comment) => comment.postId === post.postId).length + replies.filter((reply) => reply.postId === post.postId).length} {comments.filter((comment) => comment.postId === post.postId).length + replies.filter((reply) => reply.postId === post.postId).length == 1 ? "comment" : "comments"}</p>
            </Link>
          </div>)
        }
      </div>
      <div className="py-3">
        Page: {pages.map((page) => <button key={page}>{page}</button>)}
      </div>
    </main>
  )
}
