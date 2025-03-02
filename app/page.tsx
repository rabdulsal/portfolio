"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Github, Linkedin, Mail, Terminal } from "lucide-react";
import { useInView } from "react-intersection-observer";

export default function Home() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true });
  const [projectsRef, projectsInView] = useInView({ triggerOnce: true });
  const [aboutRef, aboutInView] = useInView({ triggerOnce: true });
  const [contactRef, contactInView] = useInView({ triggerOnce: true });

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Terminal className="h-8 w-8" />
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <a href="#contact">Contact</a>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Deep Purple Gradient and Grid Effect */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
        style={{
          background: "linear-gradient(to bottom, #1a0b2e, #121212)",
        }}
      >
        {/* Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: "linear-gradient(#8a2be2 1px, transparent 1px), linear-gradient(90deg, #8a2be2 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            backgroundPosition: "center center",
          }}
        />
        
        {/* Abstract Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-600/20 blur-[100px] z-0"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-indigo-500/20 blur-[120px] z-0"></div>
        <div className="absolute top-1/2 right-1/3 w-72 h-72 rounded-full bg-blue-500/10 blur-[80px] z-0"></div>
        
        {/* Gradient Fade to Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 px-4 z-20"
        >
          <h1 className="text-4xl sm:text-6xl font-bold">
            Hi, I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-300">Rashad</span>
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground">
            AI Engineer | App Developer
          </p>
          <div className="flex justify-center gap-4">
            <Button 
              asChild
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 border-0"
            >
              <a href="#projects">View Projects</a>
            </Button>
            <Button variant="outline" asChild className="backdrop-blur-sm bg-background/10 border-purple-500/30 hover:bg-background/20">
              <a href="#contact">Get in Touch</a>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        ref={projectsRef}
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={projectsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Projects</h2>
          <div className="max-w-2xl mx-auto">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-video relative overflow-hidden rounded-lg mb-6">
                <img
                  src="/images/face_rater_thumb.jpg"
                  alt="FaceRater App"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-semibold mb-3">FaceRater AI</h3>
              <p className="text-muted-foreground mb-6">
                A fun and entertaining iOS application that leverages advanced facial recognition AI 
                to analyze and rate facial features. Built with SwiftUI for iOS, TensorFlow/PyTorch for model training, and Firebase for push notifications.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-3 py-1 bg-primary/10 rounded-full text-sm">SwiftUI</span>
                <span className="px-3 py-1 bg-primary/10 rounded-full text-sm">Core ML</span>
                <span className="px-3 py-1 bg-primary/10 rounded-full text-sm">Vision Framework</span>
                <span className="px-3 py-1 bg-primary/10 rounded-full text-sm">TensorFlow</span>
                <span className="px-3 py-1 bg-primary/10 rounded-full text-sm">PyTorch</span>
              </div>
              <div className="flex justify-center">
                <Button variant="outline" size="lg" asChild>
                  <a href="https://github.com/stars/rabdulsal/lists/facerater-ai-codebases" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-5 w-5" />
                    View Code
                  </a>
                </Button>
              </div>
            </Card>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section
        id="about"
        ref={aboutRef}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={aboutInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-8">About Me</h2>
          <p className="text-lg text-muted-foreground mb-6">
            I've been developing innovative, impactful, enterprise-grade iOS applications for the last decade, and I'm adding AI-automation / engineering to my toolbelt. I'm building cross-platform AI/ML-powered applications to help people and businesses reach the next level. Let's work together to build the future! 🚀 💫 
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" asChild>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://www.linkedin.com/in/rashadabdulsalaam/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn
              </a>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        ref={contactRef}
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={contactInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Interested in working together? Feel free to reach out through any of
            these channels.
          </p>
          <div className="flex justify-center gap-6">
            <Button size="lg" asChild>
              <a href="mailto:rabdulsalaam@gmail.com">
                <Mail className="mr-2 h-5 w-5" />
                Email Me
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="https://www.linkedin.com/in/rashadabdulsalaam/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 h-5 w-5" />
                Connect
              </a>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Rashad. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}