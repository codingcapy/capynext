

import { auth } from '@/auth'

import Link from 'next/link'

export default async function Home() {

  const session = await auth();

  return (
    <main className='flex-1 mx-auto py-2 px-2'>
      <div className='flex flex-col text-center'>
        <h2 className="py-10 text-2xl font-medium text-center">CapyNext</h2>
        {!session && <div className='flex flex-col text-center'>
          <Link href={"/api/auth/signin"} className="rounded-xl my-5 py-2 px-2 bg-slate-700 text-white text-center mx-auto">Login</Link>
          or
          <Link href={"/users/signup"} className='underline'>Sign up</Link>
        </div>}
      </div>
    </main>
  )
}
