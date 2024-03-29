
/*
author: Paul Kim
date: February 22, 2024
version: 1.0
description: signup page for CapyNext
 */

import Link from "next/link";
import { createUser } from "@/components/controller";

export default function SignUpPage() {

    return (
        <form action={createUser} className="flex flex-col max-w-screen-sm mx-auto">
            <h2 className="py-10 text-2xl text-slate-700 font-medium text-center">Sign Up</h2>
            <div className="flex flex-col">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" placeholder="Username" required className="px-2 border rounded-lg border-slate-700 py-1" />
            </div>
            <div className="flex flex-col my-2">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder="Password" required className="px-2 border rounded-lg border-slate-700 py-1" />
            </div>
            <button type="submit" className="rounded-xl my-5 py-2 px-2 bg-slate-700 text-white">Sign Up</button>
            <Link href={"/"} className="underline text-center">Login</Link>
        </form>
    )
}