// // src/chatbot/Chatbot.jsx
// import React, { useState } from 'react';
// import './chatbot.css';
// import { FaRobot } from 'react-icons/fa'; // install react-icons if not installed

// const Chatbot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');

//   const toggleChat = () => setIsOpen(prev => !prev);

//   const sendMessage = async () => {
//     if (!input.trim()) return;
//     const userMessage = { sender: 'user', text: input };
//     setMessages(prev => [...prev, userMessage]);
//     setInput('');

//     try {
//       const response = await fetch('http://localhost:5000/chat', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ message: input }),
//       });
//       const data = await response.json();
//       const botMessage = { sender: 'bot', text: data.reply };
//       setMessages(prev => [...prev, botMessage]);
//     } catch (error) {
//       setMessages(prev => [...prev, { sender: 'bot', text: 'Error connecting to AI.' }]);
//     }
//   };

//   return (
//     <>
//       <button className="chatbot-toggle" onClick={toggleChat}>
//         <FaRobot size={24} />
//       </button>

//       {isOpen && (
//         <div className="chatbot-container">
//           <div className="chatbot-header">
//             🤖 Chat with Shoppio AI
//             <span className="close-btn" onClick={toggleChat}>×</span>
//           </div>
//           <div className="chatbot-messages">
//             {messages.map((msg, i) => (
//               <div key={i} className={`message ${msg.sender}`}>{msg.text}</div>
//             ))}
//           </div>
//           <div className="chatbot-input">
//             <input
//               type="text"
//               value={input}
//               onChange={e => setInput(e.target.value)}
//               placeholder="Ask me anything..."
//               onKeyDown={e => e.key === 'Enter' && sendMessage()}
//             />
//             <button onClick={sendMessage}>Send</button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Chatbot;
