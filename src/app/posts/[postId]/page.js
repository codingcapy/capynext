
import { auth } from '@/auth'
import Post from '@/models/Post'

export default async function PostDetailsPage({ params }) {

    const post = await Post.findOne({ postId: parseInt(params.postId) })

    return (
        <main className='flex-1 mx-auto py-2 px-2'>
            <div className="py-10 px-10 shadow-xl">
                <div>
                    <p>Posted by <strong>{post.username}</strong> on {post.date.toLocaleString()} {post.edited && "(edited)"}</p>
                    <h2 className="py-5 text-2xl text-slate-700 font-medium text-center">{post.title}</h2>
                    
                    {post.title}
                </div>
            </div>
        </main>
    )

}