import { useEffect, useRef, useState } from "react";
import {
  FaHeadset,
  FaTimes,
  FaPaperPlane,
  FaRobot,
  FaUser,
} from "react-icons/fa";
import { apiUrl } from "../lib/api";
import "../styles/chatbot.css";

const greeting = {
  help: "Hi! Send a message to the ClubX Help Center. Sign in as a student to start a saved support conversation.",
  admin: "Contact the ClubX administrator. Sign in as a student to send a saved support message.",
  executive: "Choose a club and message its executive team. Sign in as a student to start a conversation.",
};

function messageTime(date) {
  return date ? new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "";
}

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem("clubx_user") || "null");
  } catch {
    return null;
  }
}

function mapMessages(thread, user) {
  return (thread?.messages || []).map((message) => ({
    id: message._id || `${message.senderId}-${message.createdAt}`,
    from: message.senderRole === "student" && message.senderId === user?.id ? "user" : "bot",
    name: message.senderName,
    text: message.text,
    time: messageTime(message.createdAt),
  }));
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("help");
  const [selectedClub, setSelectedClub] = useState("");
  const [clubs, setClubs] = useState([]);
  const [user, setUser] = useState(getStoredUser);
  const [threads, setThreads] = useState([]);
  const [activeThread, setActiveThread] = useState(null);
  const activeThreadRef = useRef(null);
  const [messages, setMessages] = useState([{ id: "welcome", from: "bot", text: greeting.help }]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);
  const updateActiveThread = (thread) => {
    activeThreadRef.current = thread;
    setActiveThread(thread);
  };

  useEffect(() => {
    fetch(apiUrl("clubs"))
      .then(async (response) => {
        if (!response.ok) throw new Error("Could not load clubs for support.");
        const data = await response.json();
        if (!Array.isArray(data)) throw new Error("Club API returned invalid data.");
        setClubs(data);
        setSelectedClub(data[0]?._id || "");
      })
      .catch((loadError) => console.error("Could not load support club list:", loadError));
  }, []);

  useEffect(() => {
    if (!open || user?.role !== "student") return;
    let active = true;
    const refresh = () => fetch(apiUrl("support"), {
      headers: { Authorization: `Bearer ${localStorage.getItem("clubx_token") || ""}` },
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Could not load your support conversations.");
        if (!Array.isArray(data)) throw new Error("Support API returned invalid data.");
        if (!active) return;
        setThreads(data);
        const selectedThread = activeThreadRef.current;
        const currentThread = data.find((thread) => thread._id === selectedThread?._id);
        if (currentThread) {
          activeThreadRef.current = currentThread;
          setActiveThread(currentThread);
          if (currentThread.updatedAt !== selectedThread.updatedAt) {
            setMessages(mapMessages(currentThread, user));
          }
        } else {
          const recipient = mode === "executive" ? "executive" : "admin";
          const existing = data.find((thread) =>
            thread.recipient === recipient &&
            (recipient !== "executive" || thread.clubId === selectedClub)
          );
          if (existing && !selectedThread) {
            activeThreadRef.current = existing;
            setActiveThread(existing);
            setMessages(mapMessages(existing, user));
          }
        }
      })
      .catch((loadError) => {
        if (active) setError(loadError.message);
      });
    refresh();
    const intervalId = window.setInterval(refresh, 5000);
    return () => {
      active = false;
      window.clearInterval(intervalId);
    };
  }, [open, user, mode, selectedClub]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  const handleModeChange = (nextMode) => {
    setMode(nextMode);
    updateActiveThread(null);
    setMessages([{ id: "welcome", from: "bot", text: greeting[nextMode] }]);
    setError("");
    const recipient = nextMode === "executive" ? "executive" : "admin";
    const existing = threads.find((thread) =>
      thread.recipient === recipient &&
      (recipient !== "executive" || thread.clubId === selectedClub)
    );
    if (existing) {
      updateActiveThread(existing);
      setMessages(mapMessages(existing, user));
    }
  };

  const handleClubChange = (clubId) => {
    setSelectedClub(clubId);
    updateActiveThread(null);
    setMessages([{ id: "welcome", from: "bot", text: greeting.executive }]);
    const existing = threads.find((thread) => thread.recipient === "executive" && thread.clubId === clubId);
    if (existing) {
      updateActiveThread(existing);
      setMessages(mapMessages(existing, user));
    }
  };

  const selectThread = (threadId) => {
    const thread = threads.find((item) => item._id === threadId);
    if (!thread) return;
    updateActiveThread(thread);
    setMode(thread.recipient === "executive" ? "executive" : "help");
    if (thread.clubId) setSelectedClub(thread.clubId);
    setMessages(mapMessages(thread, user));
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || sending) return;
    const currentUser = getStoredUser();
    setUser(currentUser);
    if (!currentUser || currentUser.role !== "student") {
      setError("Please sign in with a student account to send a support message.");
      return;
    }
    if (mode === "executive" && !selectedClub) {
      setError("Choose a club before contacting its executives.");
      return;
    }
    setSending(true);
    setError("");
    try {
      const isNewThread = !activeThread;
      const response = await fetch(
        apiUrl(isNewThread ? "support" : `support/${activeThread._id}/messages`),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("clubx_token") || ""}`,
          },
          body: JSON.stringify(isNewThread
            ? {
              text,
              recipient: mode === "executive" ? "executive" : "admin",
              clubId: mode === "executive" ? selectedClub : undefined,
            }
            : { text }),
        },
      );
      const thread = await response.json();
      if (!response.ok) throw new Error(thread.message || "Could not send your message.");
      updateActiveThread(thread);
      setThreads((current) => [thread, ...current.filter((item) => item._id !== thread._id)]);
      setMessages(mapMessages(thread, currentUser));
      setInput("");
    } catch (sendError) {
      setError(sendError.message);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {!open && (
        <button className="chat-fab" onClick={() => { setUser(getStoredUser()); setOpen(true); }} aria-label="Open chat">
          <FaHeadset />
        </button>
      )}
      {open && (
        <div className="chat-window">
          <div className="chat-head">
            <div className="chat-head__left">
              <div className="chat-head__avatar"><FaRobot /></div>
              <div><strong>ClubX Support</strong><small>Support conversations are saved</small></div>
            </div>
            <button className="chat-head__close" onClick={() => setOpen(false)} aria-label="Close"><FaTimes /></button>
          </div>
          <div className="chat-tabs">
            {[
              { value: "help", label: "Help Center" },
              { value: "executive", label: "Executive" },
              { value: "admin", label: "Admin" },
            ].map((tab) => (
              <button
                key={tab.value}
                className={`chat-tab ${mode === tab.value ? "is-active" : ""}`}
                onClick={() => handleModeChange(tab.value)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {mode === "executive" && (
            <div className="chat-club-select">
              <select value={selectedClub} onChange={(event) => handleClubChange(event.target.value)}>
                <option value="">Select a club</option>
                {clubs.map((club) => <option key={club._id} value={club._id}>{club.name}</option>)}
              </select>
            </div>
          )}
          {threads.length > 0 && user?.role === "student" && (
            <div className="chat-club-select">
              <select value={activeThread?._id || ""} onChange={(event) => selectThread(event.target.value)}>
                <option value="">Start a new conversation</option>
                {threads.map((thread) => (
                  <option key={thread._id} value={thread._id}>
                    {thread.recipient === "executive" ? thread.clubName : "Help Center"}: {thread.subject}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="chat-body">
            {messages.map((message) => (
              <div key={message.id} className={`chat-msg ${message.from === "user" ? "from-user" : "from-bot"}`}>
                <div className="chat-msg__icon">{message.from === "user" ? <FaUser /> : <FaRobot />}</div>
                <div className="chat-msg__bubble">
                  {message.name && <strong>{message.name}</strong>}
                  <p>{message.text}</p>
                  {message.time && <span className="chat-msg__time">{message.time}</span>}
                </div>
              </div>
            ))}
            {sending && <p role="status">Sending...</p>}
            <div ref={messagesEndRef} />
          </div>
          {error && <p className="chat-error" role="alert">{error}</p>}
          <div className="chat-input">
            <textarea
              rows={1}
              placeholder="Type your message..."
              value={input}
              maxLength={2000}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="chat-send" onClick={sendMessage} disabled={!input.trim() || sending} aria-label="Send">
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
