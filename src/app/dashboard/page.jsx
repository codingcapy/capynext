


import { auth } from '@/auth'
import { redirect } from "next/navigation"
import DashboardContent from "@/components/DashboardContent"

export default async function Dashboard() {

    const session = await auth();
    
    !session && redirect("/")

    return (
            <DashboardContent username={session?.user.username} friends={session?.user.friends} chats={session?.user.chats}/>
    )
}