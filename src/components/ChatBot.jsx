import { useEffect, useRef, useState } from "react";
import {
  FaHeadset,
  FaTimes,
  FaPaperPlane,
  FaRobot,
  FaUser,
} from "react-icons/fa";

import "../styles/chatbot.css";

// ============ AUTO-REPLY DATABASE ============
const replies = {
  executive: {
    greeting: (club) =>
      `Hi! I'm ${club}'s executive assistant. How can I help you? Ask me about membership, events, or our club activities.`,
    keywords: {
      join: "To join our club: 1) Go to the club page, 2) Click 'Apply for Membership', 3) Fill the form. Our executive will review within 24 hours.",
      membership: "Membership applications are reviewed within 24 hours. You'll receive a notification once approved.",
      event: "Our upcoming events are listed on the Events page. You can register directly from there.",
      fee: "Membership is free for all IIUC students. Only event registration fees apply for paid events.",
      contact: "You can reach us via our Facebook page or email listed on the club profile.",
      meet: "We meet every Wednesday at 4 PM in the CSE Seminar Hall. All members are welcome!",
      default:
        "Thanks for reaching out! Our executive will reply to your message soon. For urgent matters, please contact us via our Facebook page.",
    },
  },

  admin: {
    greeting:
      "Hello! I'm the ClubX system administrator. How can I help you with your account or the platform?",
    keywords: {
      account: "If you're facing login issues, try clearing your browser cache or use 'Forgot Password' on the login page.",
      login: "Make sure you're using the correct role (Student/Executive/Admin). Each role has separate access.",
      register: "New student accounts can be created via Sign Up on the login page. Executive/Admin accounts are assigned by the system.",
      bug: "Thanks for reporting! Please describe the issue with screenshots — we'll investigate and fix it soon.",
      password: "To reset your password, click 'Forgot Password' on the login page. You'll receive a reset link via email.",
      data: "All your data is securely stored. We follow strict privacy and security guidelines.",
      default:
        "Your message has been received by the admin. We'll get back to you within 24 hours.",
    },
  },

  help: {
    greeting:
      "Hi! I'm the ClubX Help Center. Ask me anything about clubs, events, membership, or payments.",
    keywords: {
      club:
        "ClubX hosts 4 major clubs: IEEE Student Branch, IIUC Computer Club, IIUCPS, and IIUC Business Club. You can join any of them from the Clubs page.",
      event:
        "To register for an event: 1) Go to Events, 2) Click an event, 3) Click 'Register', 4) Fill the form, 5) Get your QR ticket.",
      payment:
        "For paid events, you can pay via bKash or Nagad. Send payment to the number shown, then enter the Transaction ID on the registration form.",
      qr:
        "After registering for an event, you'll receive a QR ticket. Show it at the venue — the executive will scan it to mark your attendance.",
      attendance:
        "Your attendance is tracked by QR code scanning at events. You can view your attendance history on your Student Dashboard.",
      membership:
        "To become a member of any club, go to the club's page and click 'Apply for Membership'. The club executive will review your application.",
      forgot:
        "If you forgot your password, click 'Forgot Password' on the login page. A reset link will be sent to your email.",
      default:
        "I'm not sure about that. Try asking about: clubs, events, membership, payment, QR codes, or attendance. Or switch to Executive/Admin chat for specific help.",
    },
  },
};

// ============ MATCH USER MESSAGE TO REPLY ============
function getReply(message, mode, clubName) {
  const text = message.toLowerCase();
  const set = replies[mode];
  if (!set) return "Sorry, I didn't understand that.";

  const kw = set.keywords;
  for (const key of Object.keys(kw)) {
    if (key === "default") continue;
    if (text.includes(key)) return kw[key];
  }
  return kw.default;
}

// ============ MAIN COMPONENT ============
export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("help"); // executive | admin | help
  const [selectedClub, setSelectedClub] = useState("IEEE Student Branch");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: replies.help.greeting,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [typing, setTyping] = useState(false);

  const messagesEndRef = useRef(null);

  // Auto scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // Change mode → reset messages
  const handleModeChange = (newMode) => {
    setMode(newMode);
    const greeting =
      newMode === "executive"
        ? replies.executive.greeting(selectedClub)
        : replies[newMode].greeting;

    setMessages([
      {
        from: "bot",
        text: greeting,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  };

  const handleClubChange = (club) => {
    setSelectedClub(club);
    setMessages([
      {
        from: "bot",
        text: replies.executive.greeting(club),
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  };

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;

    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Add user message
    setMessages((prev) => [...prev, { from: "user", text, time }]);
    setInput("");
    setTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const replyText = getReply(text, mode, selectedClub);
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: replyText,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setTyping(false);
    }, 800 + Math.random() * 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {!open && (
  <button
    className="chat-fab"
    onClick={() => setOpen(true)}
    aria-label="Open chat"
  >
    <FaHeadset />    
    
  </button>
)}

      {/* Chat window */}
      {open && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-head">
            <div className="chat-head__left">
              <div className="chat-head__avatar">
                <FaRobot />
              </div>
              <div>
                <strong>ClubX Support</strong>
                <small>● Online</small>
              </div>
            </div>
            <button
              className="chat-head__close"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <FaTimes />
            </button>
          </div>

          {/* Mode tabs */}
          <div className="chat-tabs">
            {[
              { value: "help", label: "Help Center" },
              { value: "executive", label: "Executive" },
              { value: "admin", label: "Admin" },
            ].map((t) => (
              <button
                key={t.value}
                className={`chat-tab ${mode === t.value ? "is-active" : ""}`}
                onClick={() => handleModeChange(t.value)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Club selector (only in executive mode) */}
          {mode === "executive" && (
            <div className="chat-club-select">
              <select
                value={selectedClub}
                onChange={(e) => handleClubChange(e.target.value)}
              >
                <option>IEEE Student Branch</option>
                <option>IIUC Computer Club</option>
                <option>IIUCPS</option>
                <option>IIUC Business Club</option>
              </select>
            </div>
          )}

          {/* Messages */}
          <div className="chat-body">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`chat-msg ${m.from === "user" ? "from-user" : "from-bot"}`}
              >
                <div className="chat-msg__icon">
                  {m.from === "bot" ? <FaRobot /> : <FaUser />}
                </div>
                <div className="chat-msg__bubble">
                  <p>{m.text}</p>
                  <span className="chat-msg__time">{m.time}</span>
                </div>
              </div>
            ))}

            {typing && (
              <div className="chat-msg from-bot">
                <div className="chat-msg__icon">
                  <FaRobot />
                </div>
                <div className="chat-msg__bubble chat-typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chat-input">
            <textarea
              rows={1}
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="chat-send"
              onClick={sendMessage}
              disabled={!input.trim()}
              aria-label="Send"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </>
  );
}