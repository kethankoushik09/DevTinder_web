import React, { useEffect, useState } from "react";
import createSocketConnection from "../utils/socket.js";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ChatPage = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [message,SetMesaage] = useState("");
  const [msgs,Setmsgs] =useState([]);
  const userId = user?._id;

  useEffect(() => {
    if(!userId){
      return;
    }
    const socket = createSocketConnection();
    socket.emit("joinchat", { userId, id });

    socket.on("messageReceived",({firstName,text})=>{
      console.log(firstName+"  "+text);
      Setmsgs((prev) => [...prev,{firstName,text}]);
      console.log("kk"+msgs);
      
    })

    return ()=>{
      socket.disconnect();
    }
  }, [userId,id]);


  function sendMessage(){
    const socket = createSocketConnection();
    socket.emit("sendMessage",{firstName : user.firstName, userId, id ,text:message})
    SetMesaage("");

  }

  return (
    <div>
      {/* <h1>chatpage</h1> */}
      {/* <h2>{id}</h2> */}
      <div className="w-1/2 border border-gray-600 h-[70vh] flex flex-col m-auto my-5">
        <h1 className="text-2xl text-gray-400 border-b border-gray-100 p-2">
          chat
        </h1>
        <div className="flex-1  p-5">
          {msgs && msgs.length>0 && msgs.map((itm,idx) =>(
             <div className="chat chat-start" key={idx}>
            <div className="chat-header">
              {itm.firstName}
              <time className="text-xs opacity-50">2 hours ago</time>
            </div>
            <div className="chat-bubble">{itm.text}</div>
            <div className="chat-footer opacity-50">Seen</div>
          </div> 

          ))}
          
        </div>
        <div className="flex gap-3 p-5 items-center">
          <input
            className="flex-1 p-2 border border-gray-500"
            placeholder="message..."
            value={message}
            onChange={(e)=> SetMesaage(e.target.value)}
          />
          <button className="btn btn-secondary" onClick={sendMessage}>send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
