import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Zap, Brain, Clock, Menu, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Message sent successfully 🚀");
        setContactOpen(false);
        setForm({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send message");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[700px] h-[700px] bg-indigo-500/30 blur-3xl rounded-full top-[-150px] left-[-150px]" />
        <div className="absolute w-[600px] h-[600px] bg-purple-500/30 blur-3xl rounded-full bottom-[-150px] right-[-150px]" />
      </div>

      {/* { NAVBAR } */}
      <nav className="flex justify-between items-center px-6 md:px-12 py-5 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <h1 className="text-xl md:text-2xl font-semibold tracking-wide">
          DevFlow AI
        </h1>

        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/login" className="text-gray-300 hover:text-white transition">
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl hover:scale-105 transition"
          >
            Get Started
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="md:hidden bg-black/90 backdrop-blur-lg px-6 py-6 space-y-4"
          >
            <Link to="/login" onClick={() => setMenuOpen(false)} className="block text-gray-300">
              Login
            </Link>
            <Link
              to="/register"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg"
            >
              Get Started
            </Link>
          </motion.div>
        )}
      </AnimatePresence> 

      {/* HERO */}
      <section className="text-center px-6 py-36">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold max-w-4xl mx-auto leading-tight"
        >
          Your AI-Powered
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Developer Workspace
          </span>
        </motion.h2>

        {/* <p className="text-gray-300 mt-6 text-lg max-w-2xl mx-auto">
           Debug faster. Understand code instantly. Stream AI responses in real time.  
           DevFlow reduces mental overload and boosts productivity.
         </p> */}
        <p className="text-gray-300 mt-6 text-lg max-w-2xl mx-auto leading-relaxed">
          DevFlow AI is a real-time developer productivity workspace designed to
          eliminate context switching and reduce cognitive overload. Instead of
          searching through documentation, StackOverflow threads, and scattered tabs,
          you get structured, streaming AI insights directly inside your workflow.
        </p>

        <Link
          to="/register"
          className="mt-10 inline-block px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl text-lg font-medium hover:scale-105 transition duration-300 shadow-lg shadow-indigo-500/30"
        >
          Start Building Smarter
        </Link>
      </section>

      {/* HOW IT HELPS */}
      <section className="px-8 py-24 max-w-6xl mx-auto">
        <h3 className="text-3xl font-semibold text-center mb-16">
          Why Developers Love DevFlow
        </h3>

        <div className="grid md:grid-cols-3 gap-10">
          {/* <Feature
             icon={<Zap size={28} />}
             title="Instant Debugging"
             text="Paste errors and get clear, contextual explanations in seconds."
           />
           <Feature
             icon={<Brain size={28} />}
             title="Smarter Thinking"
             text="Break down complex logic into simple, structured insights."
           />
           <Feature
             icon={<Clock size={28} />}
             title="Save Hours Weekly"
             text="Reduce Googling and context switching while coding."
           /> */}
          <Feature
            icon={<Zap size={28} />}
            title="Instant Debugging"
            text="Understand errors deeply, not just superficially. DevFlow analyzes stack traces and patterns to deliver structured explanations and actionable fixes in seconds."
          />

          <Feature
            icon={<Brain size={28} />}
            title="Smarter Thinking"
            text="Break complex concepts into clean mental models. From React internals to system design, DevFlow explains the 'why' behind the code."
          />

          <Feature
            icon={<Clock size={28} />}
            title="Save Hours Weekly"
            text="Reduce time spent searching across multiple platforms. Stay focused in one intelligent workspace built for engineers."
          />
        </div>
      </section>

      {/* WORKFLOW SECTION */}
      <section className="px-8 py-24 bg-white/5 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl font-semibold mb-12">
            How DevFlow Reduces Your Effort
          </h3>

          <div className="grid md:grid-cols-3 gap-12 text-left">
            {/* <WorkflowStep
               number="01"
               title="Paste Your Code"
               text="Drop in errors, stack traces, or confusing logic."
             />
             <WorkflowStep
               number="02"
               title="Stream AI Insights"
               text="Watch intelligent responses appear in real time."
             />
             <WorkflowStep
               number="03"
               title="Implement Faster"
               text="Apply fixes instantly and ship features confidently."
             /> */}
            <WorkflowStep
              number="01"
              title="Provide Context"
              text="Share your code, architecture concerns, or error messages. DevFlow maintains session memory so conversations stay contextual."
            />

            <WorkflowStep
              number="02"
              title="Stream Structured Insights"
              text="Watch AI responses appear in real time with formatted explanations, code blocks, and logical breakdowns."
            />

            <WorkflowStep
              number="03"
              title="Implement with Confidence"
              text="Apply improvements immediately. Spend less time debugging and more time building meaningful features."
            />
          </div>
        </div>
      </section>

      {/* MOCK UI SECTION */}
      <section className="px-8 py-28 max-w-6xl mx-auto">
        <h3 className="text-3xl font-semibold text-center mb-16">
          Built for Modern Developer Workflow
        </h3>

        <div className="bg-white/10 border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-4 mb-4">
            <p className="text-sm">You:</p>
            <p className="font-mono text-sm">
              Why is my useEffect running twice?
            </p>
          </div>

          <div className="bg-white/10 rounded-xl p-4">
            <p className="text-sm">DevFlow AI:</p>
            <p className="font-mono text-sm">
              React Strict Mode intentionally double-invokes effects...
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT CREATOR */}
      <section className="px-8 py-24 max-w-5xl mx-auto text-center">
        <h3 className="text-3xl font-semibold mb-8">
          Built by a Developer, for Developers
        </h3>

        <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto">
          DevFlow AI was designed and developed by <span className="text-white font-semibold">Nitin Yadav</span>,
          a passionate full-stack developer focused on building modern, AI-powered
          productivity tools. The vision behind DevFlow is simple: reduce friction,
          eliminate repetitive debugging cycles, and empower developers to think
          clearly and ship faster.
        </p>
        <div className="mt-10">
          <a
            href="https://github.com/indecisivenitin"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition"
          >
            Visit GitHub Profile
          </a>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="text-center px-6 py-28">
        <h3 className="text-4xl font-bold mb-6">
          Stop Debugging Alone.
        </h3>

        <p className="text-gray-300 mb-10">
          Let AI become your coding partner.
        </p>

        <Link
          to="/register"
          className="px-10 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl text-lg font-medium hover:scale-105 transition duration-300 shadow-lg shadow-indigo-500/30"
        >
          Create Free Account
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-8 py-16 grid md:grid-cols-3 gap-12">

          <div>
            <h4 className="text-xl font-semibold mb-4">DevFlow AI</h4>
            <p className="text-gray-400 leading-relaxed">
              A real-time AI-powered developer productivity workspace combining
              contextual memory, streaming responses, and modern UX.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">Creator</h4>
            <p className="text-gray-400">
              Built with passion by Nitin Yadav.
            </p>

            <a
              href="https://github.com/indecisivenitin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition"
            >
              GitHub Profile
            </a>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">Contact</h4>
            <p className="text-gray-400">
              Interested in collaboration, feedback, or opportunities?
            </p>

            <p className="text-gray-400 mt-2">
              📞 +91 9588091139
            </p>

            <button
              onClick={() => setContactOpen(true)}
              className="inline-block mt-4 px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl hover:scale-105 transition duration-300 shadow-lg shadow-indigo-500/30"
            >
              Contact Me
            </button>
          </div>

        </div>

        <div className="border-t border-white/10 text-center py-6 text-gray-500 text-sm">
          © {new Date().getFullYear()} DevFlow AI. Built with React, Node.js & Groq AI.
        </div>
      </footer>

      {/* CONTACT MODAL — unchanged */}
      <AnimatePresence>
        {contactOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center px-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 w-full max-w-md"
            >
              <h3 className="text-xl font-semibold mb-4">Send a Message</h3>

              <input
                type="text"
                placeholder="Your Name"
                className="w-full mb-3 p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full mb-3 p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <textarea
                placeholder="Your Message"
                rows="4"
                className="w-full mb-4 p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />

              <div className="flex justify-between">
                <button onClick={() => setContactOpen(false)} className="text-gray-400">
                  Cancel
                </button>

                <button
                  onClick={handleSubmit}
                  className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg"
                >
                  Send
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

/* COMPONENTS */

function Feature({ icon, title, text }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/10"
    >
      <div className="mb-3 text-indigo-400">{icon}</div>
      <h4 className="text-lg font-semibold mb-2">{title}</h4>
      <p className="text-gray-300 text-sm">{text}</p>
    </motion.div>
  );
}

function WorkflowStep({ number, title, text }) {
  return (
    <div>
      <div className="text-indigo-400 font-mono mb-2">{number}</div>
      <h4 className="text-lg font-semibold mb-2">{title}</h4>
      <p className="text-gray-300 text-sm">{text}</p>
    </div>
  );
}














