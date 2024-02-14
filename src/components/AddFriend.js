
import Link from "next/link"
import { addFriend } from "./controller"


export default function AddFriend(props) {

    return (
        <div className="px-5 flex-2 border-2 min-w-full h-screen overflow-y-auto ">
            <form action={addFriend} className="flex flex-col">
                <h2 className="py-10 text-2xl text-slate-700 font-medium text-center">Add Friend</h2>
                <div className="flex flex-col">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="frienduser" id="frienduser" placeholder="Username" required className="px-2 border rounded-lg border-slate-700 py-1" />
                </div>
                <div className="hidden">
                    <input type="text" name="currentuser" defaultValue={props.currentUser} id="currentuser"/>
                </div>
                <button className="rounded-xl my-5 py-2 px-2 bg-slate-700 text-white">Add</button>
            </form>
        </div>
    )
}