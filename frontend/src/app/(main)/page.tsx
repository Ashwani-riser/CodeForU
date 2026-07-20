"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Code2,
  Trophy,
  Zap,
  ArrowRight,
  Cpu,
  Terminal,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/constants";

const features = [
  {
    icon: Code2,
    title: "Problem Solving",
    description: "Practice hundreds of problems across multiple difficulty levels.",
    gradient: "from-violet-500/20 to-purple-500/20",
    iconColor: "text-violet-400",
  },
  {
    icon: Trophy,
    title: "Contests",
    description: "Compete in timed contests and climb the leaderboard.",
    gradient: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-400",
  },
  {
    icon: Terminal,
    title: "Code Playground",
    description: "Write and run code freely with our built-in editor.",
    gradient: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-400",
  },
  {
    icon: Zap,
    title: "Instant Execution",
    description: "Get real-time feedback with our multi-language judge engine.",
    gradient: "from-cyan-500/20 to-blue-500/20",
    iconColor: "text-cyan-400",
  },
];

const languages = [
  { name: "C++", color: "from-blue-500/20 to-blue-600/20", text: "text-blue-400", border: "border-blue-500/30" },
  { name: "C", color: "from-gray-500/20 to-gray-600/20", text: "text-gray-400", border: "border-gray-500/30" },
  { name: "Java", color: "from-orange-500/20 to-red-500/20", text: "text-orange-400", border: "border-orange-500/30" },
  { name: "Python", color: "from-yellow-500/20 to-green-500/20", text: "text-yellow-400", border: "border-yellow-500/30" },
];

const steps = [
  { step: "1", title: "Sign Up", description: "Create your free account in seconds." },
  { step: "2", title: "Choose a Problem", description: "Browse problems by difficulty and tags." },
  { step: "3", title: "Write & Submit", description: "Code in our built-in editor and submit." },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-violet-600/20 blur-[128px]"
          />
          <motion.div
            animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-20 -right-40 h-96 w-96 rounded-full bg-indigo-600/20 blur-[128px]"
          />
          <motion.div
            animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-purple-500/10 blur-[100px]"
          />
        </div>

        <div className="mx-auto max-w-5xl px-4 py-28 md:py-36 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/5 text-sm text-violet-400 mb-6"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Your journey to mastering code starts here
            </motion.div>

            <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-6">
              Welcome to{" "}
              <span className="gradient-text">CodeForU</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Practice coding problems, compete in contests, and sharpen your
              problem-solving skills with our modern online judge platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={ROUTES.PROBLEMS}>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button size="lg" className="gap-2 px-8 h-12 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300">
                    Browse Problems
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              </Link>
              <Link href={ROUTES.PLAYGROUND}>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button size="lg" variant="outline" className="gap-2 px-8 h-12 border-border/50 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-300">
                    <Terminal className="h-4 w-4" />
                    Try Playground
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 relative">
        <div className="mx-auto max-w-5xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Everything You Need</h2>
            <p className="text-muted-foreground text-lg">
              A complete platform to practice, compete, and grow.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4, scale: 1.01 }}
              >
                <Card className="h-full border-border/50 bg-card/50 glass hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className={`inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4`}>
                      <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 relative border-t border-border/30">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-600/3 to-transparent" />
        <div className="mx-auto max-w-5xl px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3">How It Works</h2>
            <p className="text-muted-foreground text-lg">
              Get started in three simple steps.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white flex items-center justify-center text-xl font-bold mb-5 shadow-lg shadow-violet-500/25"
                >
                  {step.step}
                </motion.div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Languages */}
      <section className="py-24 border-t border-border/30">
        <div className="mx-auto max-w-5xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Supported Languages</h2>
            <p className="text-muted-foreground text-lg">
              Code in the language you&apos;re most comfortable with.
            </p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-5">
            {languages.map((lang, i) => (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.08, y: -4 }}
                className={`px-8 py-4 rounded-2xl border bg-gradient-to-br ${lang.color} ${lang.text} ${lang.border} text-lg font-medium shadow-lg`}
              >
                {lang.name}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-border/30 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-64 w-[600px] rounded-full bg-violet-600/10 blur-[128px]" />
        </div>
        <div className="mx-auto max-w-3xl px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start with <span className="gradient-text">CodeForU</span>?
            </h2>
            <p className="text-muted-foreground mb-10 text-lg">
              Join our community of developers and start solving problems today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={ROUTES.SIGNUP}>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button size="lg" className="gap-2 px-8 h-12 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300">
                    Get Started Free
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              </Link>
              <Link href={ROUTES.PROBLEMS}>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button size="lg" variant="outline" className="px-8 h-12 border-border/50 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-300">
                    Browse Problems
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
