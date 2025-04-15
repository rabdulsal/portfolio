"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Github, Linkedin, Mail, Terminal, Phone } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { startAssistant, stopAssistant } from "@/components/ai";
import { vapi } from "@/components/ai";
import ActiveCallDetails from "@/components/custom/ActiveCallDetails";
import ProjectCarousel from "@/components/custom/ProjectCarousel";
import { projectOperations, type Project } from "@/lib/supabase";

export default function Home() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true });
  const [projectsRef, projectsInView] = useInView({ triggerOnce: true });
  const [aboutRef, aboutInView] = useInView({ triggerOnce: true });
  const [contactRef, contactInView] = useInView({ triggerOnce: true });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  /* Refactor to ContactForm Component */
  const allFieldsFilled = firstName && lastName && email && phone;
  
  // VAPI Configs
  const [callStarted, setCallStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [callId, setCallId] = useState("");
  const [callResult, setCallResult] = useState(null);
  const [loadingResult, setLoadingResult] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  

  useEffect(() => {
    vapi.on("call-start", () => {
      setCallStarted(true);
      setLoading(false);
    }).on("call-end", () => {
      setCallStarted(false);
      setLoading(false);
    }).on("speech-start", () => {
      setAssistantIsSpeaking(true);
    }).on("speech-end", () => {
      setAssistantIsSpeaking(false);
    }).on("speech-end", () => {
      setAssistantIsSpeaking(false);
    }).on("volume-level", (volume) => {
      setVolumeLevel(volume);
    })
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectOperations.getProjects();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchProjects();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(firstName, lastName, email, phone);
  };

  const handleStart = async () => {
    setLoading(true);
    const data = await startAssistant(firstName, lastName, email, phone);
    setCallId(data.id);
    setLoading(false);
  };

  const handleStop = async () => {
    stopAssistant();
  };
    
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Terminal className="h-8 w-8" />
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <a href="/content-uploader" style={{ color: 'hsl(var(--background) / 0.8' }}>^</a>
              </Button>
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
        
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-center gap-0 z-20">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative block lg:hidden mb-8"
          >
            {/* Image Container with Glow Effect */}
            <div className="relative">
              {/* Outer Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-full blur-2xl"></div>
              
              {/* Image */}
              <div className="relative overflow-hidden rounded-full border-4 border-purple-500/20">
                <img
                  src="https://res.cloudinary.com/djhqucpvr/image/upload/v1744694549/t5qicy62lx8uah5ky0zc.png"
                  alt="Rashad Abdul-Salaam"
                  className="w-[280px] h-[280px] object-cover"
                />
              </div>
              
              {/* Inner Glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/10 to-transparent"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left space-y-6 max-w-xl lg:pr-4"
          >
            <h1 className="text-4xl sm:text-6xl font-bold">
              Hi, I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-300">Rashad</span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground">
              AI Engineer | App Developer
            </p>
            <div className="flex justify-center lg:justify-start gap-4">
              <Button 
                asChild
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 border-0 text-white"
              >
                <a href="#projects">View Projects</a>
              </Button>
              <Button variant="outline" asChild className="backdrop-blur-sm bg-background/10 border-purple-500/30 hover:bg-background/20">
                <a href="#contact">Get in Touch</a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block pl-4"
          >
            {/* Image Container with Glow Effect */}
            <div className="relative">
              {/* Outer Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-full blur-2xl"></div>
              
              {/* Image */}
              <div className="relative overflow-hidden rounded-full border-4 border-purple-500/20">
                <img
                  src="https://res.cloudinary.com/djhqucpvr/image/upload/v1744694549/t5qicy62lx8uah5ky0zc.png"
                  alt="Rashad Abdul-Salaam"
                  className="w-[350px] h-[350px] object-cover"
                />
              </div>
              
              {/* Inner Glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/10 to-transparent"></div>
            </div>
          </motion.div>
        </div>
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
          {loadingProjects ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : projects.length > 0 ? (
            <ProjectCarousel projects={projects} />
          ) : (
            <div className="text-center text-muted-foreground">
              No projects available yet.
            </div>
          )}
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
            I've been developing innovative, impactful, enterprise-grade iOS applications for the last decade, and I'm adding AI-automation / engineering to my toolbelt. I'm building cross-platform AI/ML-powered applications to help people and businesses reach the next level. Let's make your dreams a reality! 🚀 💫 
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
            Email me with your inquiry, or chat now with my AI assistant to schedule a consultation.
          </p>
          <div className="flex justify-center gap-6">
            <Button size="lg" asChild>
              <a href="mailto:rabdulsalaam@gmail.com">
                <Mail className="mr-2 h-5 w-5" />
                Email Me
              </a>
            </Button>
            {/* <Button size="lg" variant="outline" asChild>
              <a href="https://www.linkedin.com/in/rashadabdulsalaam/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 h-5 w-5" />
                Connect
              </a>
            </Button> */}
            <Button 
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 border-0 text-white"
              size="lg"
              // onClick={() => !showContactForm && !callStarted && !loading && !loadingResult && !callResult ? setShowContactForm(true) : setShowContactForm(false)}
              onClick={handleStart}
              disabled={loading || loadingResult || callStarted}
            >
              <Phone className="mr-2 h-5 w-5" />
              AI Inquiry Call
            </Button>
          </div>
          {/* Contact Form */}
          { showContactForm && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <br />
            <h3 className="text-lg font-semibold">Leave some details and chat with an agent!</h3>
            
            {/* Names row */}
            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <label htmlFor="firstName" className="block text-sm font-medium text-left">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="flex-1 space-y-2">
                <label htmlFor="lastName" className="block text-sm font-medium text-left">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Email and Phone row */}
            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-left">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="flex-1 space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium text-left">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            {!callStarted && (
              <Button 
                onClick={handleStart} 
                type="submit" 
                className="w-full"
                disabled={!allFieldsFilled}
              >
                Start Inquiry Call
              </Button>
            )}
          </form>
          )}
          {(loading || loadingResult) && (
            <div className="loading"></div>
          )}
          {callStarted && (
            <ActiveCallDetails 
            isSpeaking={assistantIsSpeaking} 
            volume={volumeLevel} 
            endCallCallback={handleStop}
            />
          )}
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