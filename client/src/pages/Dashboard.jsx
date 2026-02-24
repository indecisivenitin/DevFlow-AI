import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Plus, LogOut, Sun, Moon, PanelLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

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
  const [mode, setMode] = useState("coding");

  /* -------------------- Auto Scroll -------------------- */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* -------------------- Fetch Sessions -------------------- */
  useEffect(() => {
    const initSessions = async () => {
      const res = await fetch("http://localhost:5000/api/sessions", {
        credentials: "include",
      });

      const data = await res.json();

      if (data.length === 0) {
        const createRes = await fetch(
          "http://localhost:5000/api/sessions",
          {
            method: "POST",
            credentials: "include",
          }
        );

        const newSession = await createRes.json();

        setSessions([newSession]);
        setActiveSessionId(newSession._id);

        // ✅ LOAD welcome message
        setMessages(newSession.messages || []);
      } else {
        setSessions(data);
        setActiveSessionId(data[0]._id);
        setMessages(data[0].messages || []);
      }
    };

    initSessions();
  }, []);

  /* -------------------- Create Session -------------------- */
  const createNewSession = async () => {
    const res = await fetch("http://localhost:5000/api/sessions", {
      method: "POST",
      credentials: "include",
    });

    const newSession = await res.json();

    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newSession._id);

    // ✅ LOAD welcome message instantly
    setMessages(newSession.messages || []);
  };

  /* -------------------- Load Session -------------------- */
  const loadSession = (session) => {
    setActiveSessionId(session._id);
    setMessages(session.messages || []);
  };

  /* -------------------- Send Message -------------------- */
  const sendMessage = async () => {
    if (!input.trim() || !activeSessionId) return;

    const userMessage = { role: "user", content: input };

    // Show instantly
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/ai/stream",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: userMessage.content,
            sessionId: activeSessionId,
            mode,
          }),
        }
      );

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let assistantMessage = { role: "assistant", content: "" };

      // Add placeholder assistant message
      setMessages((prev) => [...prev, assistantMessage]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);

        // 🔥 Title update detection
        if (chunk.startsWith("__TITLE__:")) {
          const newTitle = chunk.replace("__TITLE__:", "").trim();

          setSessions((prev) =>
            prev.map((s) =>
              s._id === activeSessionId
                ? { ...s, title: newTitle }
                : s
            )
          );

          continue;
        }

        assistantMessage.content += chunk;

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...assistantMessage,
          };
          return updated;
        });
      }
    } catch (error) {
      console.error("Streaming error:", error);
    }

    setLoading(false);
  };

  /* -------------------- Logout -------------------- */
  const handleLogout = async () => {
    await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    navigate("/");
  };

  return (
    <div className={dark ? "dark" : ""}>
      <div className="h-screen flex bg-gradient-to-br from-gray-950 via-indigo-950 to-black text-white">

        {/* Sidebar */}
        <div
          className={`${sidebarOpen ? "w-64" : "w-20"} transition-all duration-300 backdrop-blur-xl bg-white/5 border-r border-white/10 flex flex-col`}
        >
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

            {sidebarOpen &&
              sessions.map((session) => (
                <button
                  key={session._id}
                  onClick={() => loadSession(session)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                    activeSessionId === session._id
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
                  className={`${
                    msg.role === "user"
                      ? "ml-auto bg-gradient-to-r from-indigo-500 to-purple-600"
                      : "bg-white/10 border border-white/10"
                  } p-4 rounded-2xl max-w-2xl`}
                >
                  <ReactMarkdown
                    components={{
                      code({
                        inline,
                        className,
                        children,
                        ...props
                      }) {
                        const match =
                          /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                          <SyntaxHighlighter
                            style={tomorrow}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                          >
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>
                        ) : (
                          <code className="bg-black/30 px-1 py-0.5 rounded text-indigo-300">
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
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

          {/* Input */}
          <div className="border-t border-white/10 backdrop-blur-xl bg-white/5 py-6">
            <div className="max-w-4xl mx-auto px-6">
              <div className="mb-4">
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  className="bg-white/10 border border-white/20 px-4 py-2 rounded-lg text-sm focus:outline-none"
                >
                  <option value="coding">Coding Assistant</option>
                  <option value="study">Study Tutor</option>
                  <option value="interview">
                    Interview Coach
                  </option>
                  <option value="writer">Content Writer</option>
                </select>
              </div>

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