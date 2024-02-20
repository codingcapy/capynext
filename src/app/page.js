

import { auth } from '@/auth'
import Link from 'next/link'
import Post from '@/models/Post'
import Comment from '@/models/Comment'
import Reply from '@/models/Reply'
import PostVote from '@/models/PostVote'

export default async function Home() {

  const session = await auth();

  const allPosts = await Post.find({})
  let post = 0
  if (allPosts.length < 10) {
    post = allPosts.length
  }
  else {
    post = 10
  }
  const posts = await Post.find({ postId: { $gte: 1, $lte: post } }).limit(10)
  console.log(posts)
  const pages = []
  for (let i = 0; i < allPosts.length; ++i) {
    if (i % 10 == 0) {
      pages.push(i / 10 + 1)
    }
  }
  const comments = await Comment.find({ postId: { $gte: 1, $lte: post } })
  const replies = await Reply.find({ postId: { $gte: 1, $lte: post } })
  const postVotes = await PostVote.find({ postId: { $gte: 1, $lte: post } })

  return (
    <main className='flex-1 mx-auto py-2 px-2'>
      <div className='flex flex-col text-center'>
        <h2 className="py-10 text-2xl font-medium text-center">CapyNext</h2>
        {!session && <div className='flex flex-col text-center'>
          <Link href={"/api/auth/signin"} className="rounded-xl my-5 py-2 px-2 bg-slate-700 text-white text-center mx-auto">Login</Link>
          or
          <Link href={"/users/signup"} className='underline'>Sign up</Link>
        </div>}
        {posts.map((post)=><p>{post.title}</p>)}
        {pages.map((page)=><p>{page}</p>)}
      </div>
    </main>
  )
}
