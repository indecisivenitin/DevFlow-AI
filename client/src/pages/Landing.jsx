import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Zap, Brain, Code, Clock, Sparkles } from "lucide-react";

export default function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[700px] h-[700px] bg-indigo-500/30 blur-3xl rounded-full top-[-150px] left-[-150px]" />
        <div className="absolute w-[600px] h-[600px] bg-purple-500/30 blur-3xl rounded-full bottom-[-150px] right-[-150px]" />
      </div>

      {/* Navbar */}
      <nav className="flex justify-between items-center px-12 py-6 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <h1 className="text-2xl font-semibold tracking-wide">
          DevFlow AI
        </h1>

        <div className="space-x-6">
          <Link to="/login" className="text-gray-300 hover:text-white transition">
            Login
          </Link>

          <Link
            to="/register"
            className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl hover:scale-105 transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </nav>

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

        <p className="text-gray-300 mt-6 text-lg max-w-2xl mx-auto">
          Debug faster. Understand code instantly. Stream AI responses in real time.  
          DevFlow reduces mental overload and boosts productivity.
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
          <Feature
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
            <WorkflowStep
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
    </div>
  );
}

/* Reusable Components */

function Feature({ icon, title, text }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/10 shadow-lg"
    >
      <div className="mb-4 text-indigo-400">{icon}</div>
      <h4 className="text-xl font-semibold mb-3">{title}</h4>
      <p className="text-gray-300">{text}</p>
    </motion.div>
  );
}

function WorkflowStep({ number, title, text }) {
  return (
    <div>
      <div className="text-indigo-400 font-mono text-lg mb-2">{number}</div>
      <h4 className="text-xl font-semibold mb-3">{title}</h4>
      <p className="text-gray-300">{text}</p>
    </div>
  );
}