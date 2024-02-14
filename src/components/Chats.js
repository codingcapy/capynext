


export default function Chats(props) {


    return (
        <div className="px-5 flex-2 border-2 min-w-72 h-screen overflow-y-auto ">
            <div className=" py-5 text-xl sticky top-0 bg-white">Chats</div>
            <div>
                <div onClick={props.clickedChat} className="cursor-pointer">Chat 1</div>
                {props.chats && props.chats.map((chat)=><div key={chat.chatId} onClick={()=>props.clickedChat(chat)} className="cursor-pointer">
                    {chat.title}
                    </div>)}
            </div>
        </div>
    )
}