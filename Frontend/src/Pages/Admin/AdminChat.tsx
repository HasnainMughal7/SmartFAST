import { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { MOCK_MESSAGES } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import axios from 'axios';

const AdminChat = () => {
  const { user } = useApp();
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const [fetching, setFetching] = useState(false);
  const [fetched, setFetched] = useState(false);


  const formatTime = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    const fetchMsgs = async () => {
      if (fetching || fetched) return;
      try {
        setFetching(true);
        const res = await axios.get('http://localhost:5172/api/message/all')
        if (res.data.messages) setMessages(res.data.messages);
        setFetching(false);
        setFetched(true);
      } catch (error) {
        console.error('Error fetching users:', error);
        setFetching(false);
      }
    }
    fetchMsgs();
  }, [])

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (newMessage.trim() === '' || !user) return;
    const newMsgObj = {
      userID: String(user._id),
      content: newMessage
    };
    setNewMessage('');
    try {
      const res = await axios.post('http://localhost:5172/api/message/', newMsgObj);
      if (res.status !== 201) throw Error("Failed to send message");
      window.location.reload();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex-1 flex flex-col animate-fadeIn overflow-hidden h-[600px]">

        {/* Header */}
        <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
          <h3 className="font-bold flex items-center gap-2 text-slate-800">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <MessageSquare size={18} className="text-indigo-600" />
            </div>
            Admin & Maintainer Channel
          </h3>
        </div>

        {/* Messages Area */}
        <div className="flex-1 p-6 bg-slate-50/50 overflow-y-auto space-y-6">
          {messages.map((msg) => {
            // Check if message belongs to current user (String conversion for safety)
            const isCurrentUser = String(msg.userID) === String(user?._id);

            return (
              <div key={msg.id} className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
                <div className={`flex items-end gap-2 ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>

                  {/* Avatar Circle */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm border-2 border-white
                    ${isCurrentUser ? 'bg-indigo-600' : 'bg-amber-500'}`}>
                    {msg.username.charAt(0).toUpperCase()}
                  </div>

                  {/* Message Bubble */}
                  <div className={`px-4 py-3 rounded-2xl max-w-sm shadow-sm border relative
                    ${isCurrentUser
                      ? 'bg-indigo-600 text-white rounded-br-none border-indigo-600'
                      : 'bg-white text-slate-700 rounded-bl-none border-slate-200'
                    }`}>

                    {/* Show Name only if NOT current user */}
                    {!isCurrentUser && (
                      <p className="text-[10px] text-indigo-600 font-bold mb-1 uppercase tracking-wide flex items-center gap-1">
                        {msg.username}
                        <span className="text-[9px] text-slate-400 font-normal normal-case">({msg.role})</span>
                      </p>
                    )}

                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  </div>
                </div>

                {/* Timestamp */}
                <span className={`text-[10px] text-slate-400 mt-1.5 font-medium ${isCurrentUser ? 'mr-10' : 'ml-10'}`}>
                  {formatTime(msg.createdAt)}
                </span>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t bg-white">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-sm"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button
              onClick={handleSend}
              className="bg-indigo-600 text-white px-4 rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 flex items-center justify-center active:scale-95"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminChat;