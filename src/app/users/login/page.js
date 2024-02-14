
import Link from "next/link"

export default function LoginPage() {
    return (
        <form className="flex flex-col">
            <h2 className="py-10 text-2xl text-slate-700 font-medium text-center">Login</h2>
            <div className="flex flex-col">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" placeholder="Username" required className="px-2 border rounded-lg border-slate-700 py-1" />
            </div>
            <div className="flex flex-col my-2">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder="Password" required className="px-2 border rounded-lg border-slate-700 py-1" />
            </div>
            <button className="rounded-xl my-5 py-2 px-2 bg-slate-700 text-white">Login</button>
            <Link href={"/users/signup"} className="text-center">Sign Up</Link>
        </form>
    )
}