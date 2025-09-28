// src/components/OneToOneChat.jsx
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import "./onetoonepage.css";

export default function OneToOneChat({ showNotification, roomNameSetter, currentRoomSetter }) {
  const [waiting, setWaiting] = useState(true);
  const [partner, setPartner] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typingUsers, setTypingUsers] = useState(new Set());
  const [queuePosition, setQueuePosition] = useState(0);
  const [peopleWaiting, setPeopleWaiting] = useState(0);
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  const dots = ["", ".", "..", "..."];
  const [dotIndex, setDotIndex] = useState(0);

  // Auto-scroll
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Initialize socket
  useEffect(() => {
    const s = io({ transports: ["websocket", "polling"] });
    setSocket(s);

    s.on("connect", () => showNotification("Connected!", "success"));

    s.on("matched", (data) => {
      setPartner(data.partnerName);
      setWaiting(false);
      roomNameSetter && roomNameSetter(`1v1 with ${data.partnerName}`);
      currentRoomSetter && currentRoomSetter(data.roomId);
      showNotification(`Matched with ${data.partnerName}`, "success");
      setMessages([]);
    });

    s.on("chat message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    s.on("typing", (name) => {
      setTypingUsers((prev) => new Set(prev.add(name)));
    });

    s.on("stopTyping", (name) => {
      setTypingUsers((prev) => {
        const copy = new Set(prev);
        copy.delete(name);
        return copy;
      });
    });

    s.on("queueUpdate", (data) => {
      setQueuePosition(data.position);
      setPeopleWaiting(data.waiting);
    });

    s.on("partnerDisconnected", (data) => {
      showNotification(`${data.partnerName} disconnected. Rejoining queue...`, "info");
      setWaiting(true);
      setPartner(null);
      setMessages([]);
      s.emit("join1v1");
    });

    s.emit("join1v1");

    return () => s.disconnect();
  }, []);

  // Waiting dots animation
  useEffect(() => {
    if (!waiting) return;
    const interval = setInterval(() => {
      setDotIndex((prev) => (prev + 1) % dots.length);
    }, 500);
    return () => clearInterval(interval);
  }, [waiting]);

  const handleSend = () => {
    if (!input.trim() || !socket) return;
    const msgObj = { nickname: "You", msg: input, timestamp: Date.now() };
    socket.emit("chat message", input);
    setMessages((prev) => [...prev, msgObj]);
    setInput("");
    socket.emit("stopTyping");
  };

  const handleTyping = (e) => {
    setInput(e.target.value);
    if (socket) socket.emit("typing");
    setTimeout(() => socket && socket.emit("stopTyping"), 2000);
  };

  const handleSkip = () => {
    if (socket) {
      socket.emit("skip");
      setWaiting(true);
      setPartner(null);
      setMessages([]);
    }
  };

  return (
    <div className="one-to-one-chat">
      {waiting ? (
        <div className="waiting-screen">
          <div className="avatar-circle">
            <i className="fas fa-users fa-3x"></i>
          </div>
          <h2>Finding your chat partner{dots[dotIndex]}</h2>
          <p>Connecting you with someone new...</p>
          <div className="queue-info">
            <span>Queue Position: {queuePosition}</span>
            <span>People Waiting: {peopleWaiting}</span>
          </div>
        </div>
      ) : (
        <div className="chat-screen">
          <div className="chat-header">
            <h2>{`Chatting with ${partner}`}</h2>
            <span>{typingUsers.size > 0 ? `${Array.from(typingUsers).join(", ")} is typing...` : ""}</span>
          </div>
          <div className="messages-container">
            {messages.map((m, i) => (
              <div key={i} className={`message-item ${m.nickname === "You" ? "self" : "other"}`}>
                <strong>{m.nickname}:</strong> {m.msg}
              </div>
            ))}
            <div ref={messagesEndRef}></div>
          </div>
          <div className="input-container">
            <input
              value={input}
              onChange={handleTyping}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
            />
            <button onClick={handleSend}>Send</button>
            {/* Skip button visible only when connected */}
            <button onClick={handleSkip} className="skip-btn">Skip</button>
          </div>
        </div>
      )}
    </div>
  );
}
