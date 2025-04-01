import Image from "next/image";
import Header from "../components/Header";
import { useState } from "react";

export default function MessagingPage() {
  // Dummy conversation list for the left sidebar.
  const dummyConversations = [
    {
      id: 1,
      name: "LinkedIn",
      avatar: "/linkedin.png", // Replace with your asset or image URL.
      lastMessage:
        "Reactivate your Premium subscription now and get 50% off 2 months...",
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      name: "Dr. Apostolos Ampountolas",
      avatar: "/drapostolos.png",
      lastMessage: "Looking forward to our meeting tomorrow.",
      timestamp: "Yesterday",
    },
    {
      id: 3,
      name: "John Doe",
      avatar: "/johndoe.png",
      lastMessage: "Can we schedule a call?",
      timestamp: "1 day ago",
    },
  ];

  // Dummy messages for the selected conversation.
  const dummyMessages = [
    {
      id: 1,
      sender: "LinkedIn",
      content:
        "Hi there, Aditya! Reactivate your Premium subscription now and get 50% off 2 months of LinkedIn Premium.",
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      sender: "Aditya",
      content: "A discounted rate? Sure!",
      timestamp: "10:31 AM",
    },
  ];

  const [selectedConversation, setSelectedConversation] = useState(
    dummyConversations[0]
  );
  const [messages, setMessages] = useState(dummyMessages);
  const [newMessage, setNewMessage] = useState("");

  // Handler to simulate sending a new message.
  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const newMsg = {
        id: messages.length + 1,
        sender: "Aditya", // Hard-coded current user name.
        content: newMessage,
        timestamp: "Now",
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black">
      <Header />
      <div className="max-w-7xl mx-auto p-4">
        {/* Grid layout: three panels using 12 columns on medium screens */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Left Sidebar (Conversations) */}
          <div className="md:col-span-3 bg-white dark:bg-[#1D2226] rounded-md shadow overflow-auto">
            <h2 className="text-xl font-bold p-4 text-gray-900 dark:text-white">
              Messages
            </h2>
            <div>
              {dummyConversations.map((conv) => (
                <div
                  key={conv.id}
                  className={`flex items-center p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer ${
                    selectedConversation.id === conv.id
                      ? "bg-gray-200 dark:bg-gray-700"
                      : ""
                  }`}
                  onClick={() => {
                    setSelectedConversation(conv);
                    // In a real app, fetch the messages for the selected conversation
                    // Here, we just keep the dummy messages.
                    setMessages(dummyMessages);
                  }}
                >
                  <Image
                    src={conv.avatar}
                    alt={conv.name}
                    width={128}
                    height={128}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-4 flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {conv.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {conv.lastMessage}
                    </p>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {conv.timestamp}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Middle Panel (Conversation Details) */}
          <div className="md:col-span-6 bg-white dark:bg-[#1D2226] rounded-md shadow flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {selectedConversation.name}
              </h2>
            </div>
            <div className="flex-grow p-4 overflow-auto space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "Aditya" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg ${
                      msg.sender === "Aditya"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
                    }`}
                  >
                    <p>{msg.content}</p>
                    <span className="text-xs block text-right text-gray-500 dark:text-gray-400">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-grow p-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
                >
                  Send
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar (Extra Panels) */}
          <div className="md:col-span-3 bg-white dark:bg-[#1D2226] rounded-md shadow p-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Page Inboxes
            </h2>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                LinkedIn Premium
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Upgrade to LinkedIn Premium to see who viewed your profile and
                get access to more insights.
              </p>
              <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
