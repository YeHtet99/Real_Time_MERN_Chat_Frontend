import ChatUserLists from "./ChatUserLists";
import Right from "./Rightpart/Right";
import Navbar from "./Navbar";
import useConversation from "../statemanage/useConversation";



function ChatContainer() {

  const { selectedConversation} = useConversation();


  return (
      <>
        <div className="h-screen">
            {
                selectedConversation ?
                <>
                <Navbar/>
                <Right />
                </>
                :
                <>
                <Navbar/>
                <ChatUserLists/>
                </>
            }
        </div> 
      </>
  );
}

export default ChatContainer;
