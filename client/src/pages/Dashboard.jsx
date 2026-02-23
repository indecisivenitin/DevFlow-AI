import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Plus, LogOut, Sun, Moon, PanelLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const bottomRef = useRef(null);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dark, setDark] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);

  const [messages, setMessages] = useState([]);

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch sessions from backend
  useEffect(() => {
    const initSessions = async () => {
      const res = await fetch("http://localhost:5000/api/sessions", {
        credentials: "include",
      });

      const data = await res.json();

      if (data.length === 0) {
        // Create first session automatically
        const createRes = await fetch("http://localhost:5000/api/sessions", {
          method: "POST",
          credentials: "include",
        });

        const newSession = await createRes.json();

        setSessions([newSession]);
        setActiveSessionId(newSession._id);
        setMessages([]);
      } else {
        setSessions(data);
        setActiveSessionId(data[0]._id);
        setMessages(data[0].messages || []);
      }
    };

    initSessions();
  }, []);


  const createNewSession = async () => {
    const res = await fetch("http://localhost:5000/api/sessions", {
      method: "POST",
      credentials: "include",
    });

    const newSession = await res.json();
    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newSession._id);
    setMessages([]);
  };

  const loadSession = (session) => {
    setActiveSessionId(session._id);
    setMessages(session.messages || []);
  };

  const sendMessage = async () => {
    console.log("Send clicked");
    console.log("Input:", input);
    console.log("Session:", activeSessionId);
    if (!input.trim()) return;

    if (!activeSessionId) {
      alert("Session not ready yet");
      return;
    }

    const userMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // Save user message to DB
    await fetch(`http://localhost:5000/api/sessions/${activeSessionId}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });

    try {
      const response = await fetch("http://localhost:5000/api/ai/stream", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.content,
          sessionId: activeSessionId,
        }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let assistantMessage = { role: "assistant", content: "" };

      setMessages(prev => [...prev, assistantMessage]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);

        assistantMessage.content += chunk;

        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { ...assistantMessage };
          return updated;
        });
      }

      // Save full assistant message to DB
      await fetch(`http://localhost:5000/api/sessions/${activeSessionId}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: assistantMessage }),
      });

    } catch (error) {
      console.error("Streaming error:", error);
    }

    setLoading(false);
  };

  const handleLogout = async () => {
    await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    navigate("/"); // Redirect to landing page
  };

  return (
    <div className={dark ? "dark" : ""}>
      <div className="h-screen flex bg-gradient-to-br from-gray-950 via-indigo-950 to-black text-white">

        {/* Sidebar */}
        <div className={`${sidebarOpen ? "w-64" : "w-20"} transition-all duration-300 backdrop-blur-xl bg-white/5 border-r border-white/10 flex flex-col`}>

          <div className="p-4 flex justify-between items-center border-b border-white/10">
            {sidebarOpen && (
              <span className="font-semibold text-lg bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                DevFlow
              </span>
            )}
            <button onClick={() => setSidebarOpen(!sidebarOpen)}>
              <PanelLeft size={18} />
            </button>
          </div>

          <div className="p-4 space-y-3 overflow-y-auto">
            <button
              onClick={createNewSession}
              className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-white/10 transition"
            >
              <Plus size={18} />
              {sidebarOpen && "New Session"}
            </button>

            {/* Session History */}
            {sidebarOpen && sessions.map(session => (
              <button
                key={session._id}
                onClick={() => loadSession(session)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${activeSessionId === session._id
                  ? "bg-indigo-500/30"
                  : "hover:bg-white/10"
                  }`}
              >
                {session.title || "Untitled Session"}
              </button>
            ))}
          </div>

          <div className="mt-auto p-4 space-y-4 border-t border-white/10">
            <button
              onClick={() => setDark(!dark)}
              className="flex items-center gap-3 hover:text-indigo-400 transition"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
              {sidebarOpen && "Theme"}
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 text-red-400 hover:text-red-300 transition"
            >
              <LogOut size={18} />
              {sidebarOpen && "Logout"}
            </button>
          </div>
        </div>

        {/* Main */}
        <div className="flex-1 flex flex-col">

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto px-8 py-8 space-y-6">
            <div className="max-w-4xl mx-auto space-y-6">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`${msg.role === "user"
                    ? "ml-auto bg-gradient-to-r from-indigo-500 to-purple-600"
                    : "bg-white/10 border border-white/10"
                    } p-4 rounded-2xl max-w-2xl`}
                >
                  {msg.content}
                </motion.div>
              ))}

              {loading && (
                <div className="space-y-3 animate-pulse max-w-2xl">
                  <div className="h-4 bg-white/10 rounded w-3/4"></div>
                  <div className="h-4 bg-white/10 rounded w-1/2"></div>
                </div>
              )}

              <div ref={bottomRef}></div>
            </div>
          </div>

          {/* Input Section */}
          <div className="border-t border-white/10 backdrop-blur-xl bg-white/5 py-6">
            <div className="max-w-4xl mx-auto px-6">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask DevFlow something..."
                rows={3}
                className="w-full bg-white/10 border border-white/20 p-4 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />

              <button
                onClick={sendMessage}
                className="mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 rounded-xl font-medium hover:scale-105 transition duration-300 shadow-lg shadow-indigo-500/30"
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}