import React, { useEffect, useRef, useState } from "react";
import createSocketConnection from "../utils/socket.js";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants.jsx";

const ChatPage = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [message, setMessage] = useState("");
  const [msgs, setMsgs] = useState([]);
  const[isOnline, SetisOnline] = useState(false);
  const userId = user?._id;
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  async function fetch_messages() {
    try {
      const chat = await axios.get(BASE_URL + "/chat/" + id, {
        withCredentials: true,
      });
      const chatmessages = chat.data.messages.map((itm) => {
        const { senderId, text, createdAt } = itm;
        return {
          firstName: senderId.firstName,
          lastName: senderId.lastName,
          text,
          createdAt,
        };
      });
      setMsgs(chatmessages);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    fetch_messages();
  }, []);

  useEffect(() => {
    if (!userId) return;

    socketRef.current = createSocketConnection();
    socketRef.current.emit("joinchat", { userId, id });

    socketRef.current.on("messageReceived", ({ firstName, lastName, text }) => {
      setMsgs((prev) => [
        ...prev,
        { firstName, lastName, text, createdAt: new Date() },
      ]);
    });
    socketRef.current.on("UserOnline" ,(data)=>{
      if(data.userId === id){
        SetisOnline(true);
      }
    })
    socketRef.current.on("UserOffline" ,(data)=>{
      if(data.userId === id){
        SetisOnline(false);
      }
    })
    socketRef.current.emit("checkUserStatus", { userId: id });

  socketRef.current.on("userStatus", ({ userId: checkId, online }) => {
    if (checkId === id){
      SetisOnline(online);
    }
  });

    return () => {
      socketRef.current.disconnect();
    };
  }, [userId, id]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  function sendMessage() {
    if (!message.trim() || !socketRef.current) return;

    socketRef.current.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      toUserId: id,
      text: message,
    });

    setMessage("");
  }

    function formatDate(dateStr) {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
    return date.toLocaleDateString([], { day: "numeric", month: "short", year: "numeric" });
  }

  return (
    <div className="px-2">
      <div className="w-full md:w-2/3 lg:w-1/2 h-[80vh] flex flex-col m-auto my-5 border rounded-lg shadow-lg bg-white">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gray-100 rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
              👤
            </div>
            <h1 className="text-lg font-semibold text-gray-700">Chat</h1>
          </div>
          {isOnline ?<span className="text-xs text-green-600">● Online</span>:
          <span className="text-xs text-gray-600">● Offline</span>}
          {/* <span className="text-xs text-green-600">● Online</span> */}
        </div>

        {/* Messages */}
        <div className="flex-1 p-3 md:p-5 overflow-y-auto bg-gray-50">
          {msgs &&
            msgs.length > 0 &&
            msgs.map((itm, idx) => {
              const isSender = user.firstName === itm.firstName;
              const prevMsg = msgs[idx - 1];
              const showDate =
                !prevMsg ||
                new Date(prevMsg.createdAt).toDateString() !==
                  new Date(itm.createdAt).toDateString();

              return (
                <div key={idx}>
                  {/* Date separator */}
                  {showDate && (
                    <div className="flex justify-center my-2">
                      <span className="bg-gray-300 text-gray-700 text-xs px-3 py-1 rounded-full shadow-sm">
                        {formatDate(itm.createdAt)}
                      </span>
                    </div>
                  )}

                  {/* Message bubble */}
                  <div
                    className={`flex flex-col mb-4 ${
                      isSender ? "items-end" : "items-start"
                    }`}
                  >
                    {!isSender && (
                      <span className="text-xs text-gray-500 mb-1 ml-2">
                        {itm.firstName} {itm.lastName}
                      </span>
                    )}
                    <div
                      className={`relative px-4 py-2 rounded-2xl shadow-sm max-w-[75%] ${
                        isSender
                          ? "bg-blue-500 text-white rounded-br-none"
                          : "bg-gray-200 text-gray-800 rounded-bl-none"
                      }`}
                    >
                      <p className="pr-10">{itm.text}</p>
                      <span className="absolute bottom-1 right-2 text-[10px] opacity-70">
                        {new Date(itm.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Section */}
        <div className="p-3 border-t bg-white flex gap-3 items-center rounded-b-lg">
          <input
            className="flex-1 p-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className="btn btn-secondary rounded-full px-6"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
