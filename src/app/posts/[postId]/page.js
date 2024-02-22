
import { auth } from '@/auth'
import Post from '@/models/Post'
import Comment from '@/models/Comment'
import PostVote from '@/models/PostVote'
import Reply from '@/models/Reply'
import CommentComponent from '@/components/CommentComponent'
import { TbArrowBigUp, TbArrowBigDown, TbArrowBigUpFilled, TbArrowBigDownFilled } from 'react-icons/tb'
import { createComment, createPost } from '@/components/controller';

export default async function PostDetailsPage({ params }) {

    const session = await auth();
    const post = await Post.findOne({ postId: parseInt(params.postId) }).lean()
    const comments = await Comment.find({ postId: parseInt(params.postId) }).lean()
    const postVotes = await PostVote.find({ postId: parseInt(params.postId) }).lean()
    const replies = await Reply.find({ postId: parseInt(params.postId) }).lean()

    return (
        <main className='flex-1 mx-auto py-2 px-2'>
            <div className="py-10 px-10 shadow-xl">
                <div>
                    <p>Posted by <strong>{post.username}</strong> on {post.date.toLocaleString()} {post.edited && "(edited)"}</p>
                    <h2 className="py-5 text-2xl text-slate-700 font-medium text-center">{post.title}</h2>
                    <div><TbArrowBigUp size={25} /></div>
                    <p className="px-2"> {postVotes.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0)}</p>
                    <div className=""><TbArrowBigDown size={25} /></div>
                    <p className="py-3">{post.content}</p>
                    <h3 className="py-5 text-2xl text-slate-700 font-medium">Comments</h3>
                    {!session && <p>Please log in to add comments!</p>}
                    {session && <form action={createComment}>
                        <label htmlFor="content">Add comment</label>
                        <div className="flex flex-col">
                            <textarea type="text" name="content" id="content" placeholder="What are your thoughts?" required rows="5" cols="15" className="px-2 border rounded-lg border-slate-700 py-1" />
                            <button type="submit" className="rounded-xl my-5 py-2 px-2 bg-slate-700 text-white">Comment</button>
                            <input type="text" name='username' id='username' defaultValue={session?.user.username} className="hidden" />
                            <input type="text" name='userId' id='userId' defaultValue={session?.user.userId} className="hidden" />
                            <input type="text" name='postId' id='postId' defaultValue={post.postId} className="hidden" />
                        </div>
                    </form>}
                    {comments.map((comment) => <CommentComponent key={comment.commentId} id={comment.commentId} username={comment.username} user={session?.user} content={comment.content} date={comment.date.toLocaleString()} edited={comment.edited} deleted={comment.deleted} postId={comment.postId} replies={replies.filter((reply) => reply.commentId === comment.commentId)}  />)}
                </div>
            </div>
        </main>
    )

}