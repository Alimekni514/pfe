
import { useState } from "react";
import {
  MultiChatSocket,
  MultiChatWindow,
  useMultiChatLogic,
} from "react-chat-engine-advanced";
//server
const projectId = "66163a76-47b0-4036-b183-3ddb56492bea";
// const user=JSON.parse(localStorage.getItem("CHAT_user"));
// const {username,secret}=user;
function ChatPage() {
    const chatprops = useMultiChatLogic(projectId, username, secret);
  return (
    <div style={{ height: "100vh", width: "100vw" ,display:"flex",alignItems:"center",flexDirection:"column",justifyContent:"space-between"}}>
    <h3 className="terfess">&#x1d160;	Chat-App&#x1d160;	</h3>
    <MultiChatSocket {...chatprops} />
    <MultiChatWindow {...chatprops} style={{ height: "100vh" }} />
</div>
  )
}

export default ChatPage
