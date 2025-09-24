import React, { useState } from "react";
import BackNavigation from '../components/BackNavigation';

const ChatApp = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: "bot", text: "👋 Hi there! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = { id: Date.now(), sender: "user", text: input };
    setMessages([...messages, newMessage]);
    setInput("");

    // Placeholder bot reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: "bot", text: "🤖 This is a sample reply." },
      ]);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <BackNavigation title="Back" />
      
      {/* Full-width Navbar */}
      <div className="bg-green-600 text-white py-4 px-6 text-xl font-bold shadow">
        AI Assistant 💬
      </div>

      {/* Chat Container (centered card) */}
      <div className="flex-1 flex justify-center items-center p-6">
        <div className="w-full max-w-md h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl max-w-[75%] text-sm shadow ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-900 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-4 bg-white border-t flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={handleSend}
              className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition"
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
