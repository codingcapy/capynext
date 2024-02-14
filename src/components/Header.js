


import Link from "next/link";
import { auth } from '@/auth'
import Logout from "@/components/Logout"

export default async function Header() {

    const session = await auth();

    return (
        <header className="py-5 flex justify-between z-10 sticky top-0 bg-slate-800 text-white">
            <div>
                <Link href={"/"} className="px-5">CapyNext</Link>
                <Link href={"/"} className="px-5">Home</Link>
            </div>
            <div>
                <Link href={"/posts"} className="px-5">Posts</Link>
                {session && <Link href={"/posts/create"} className="px-5">Create</Link>}
            </div>
            <div>
                {!session && <Link href={"/api/auth/signin"} className="px-5">Login</Link>}
                {!session && <Link href={"/users/signup"} className="px-5">Sign up</Link>}
                {session?.user.username}
                {session && <Logout />}
            </div>
        </header>
    )
}