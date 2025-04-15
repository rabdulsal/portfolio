"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type Project } from '@/lib/supabase';

interface ProjectCarouselProps {
  projects: Project[];
}

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextProject = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const prevProject = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextProject();
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  const currentProject = projects[currentIndex];

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-2xl blur-xl" />
      
      <div className="relative bg-background/50 backdrop-blur-sm rounded-2xl border border-border/50 p-6">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="space-y-6"
          >
            <div className="aspect-video relative overflow-hidden rounded-lg">
              <img
                src={currentProject.image_url}
                alt={currentProject.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">{currentProject.name}</h3>
              <p className="text-muted-foreground">{currentProject.description}</p>
              {currentProject.website_url && (
                <a
                  href={currentProject.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm text-primary hover:underline"
                >
                  Visit Project →
                </a>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        {/* <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevProject}
            className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextProject}
            className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div> */}

        {/* Dots indicator -- Add back once 4+ projects are added*/}
        {/* <div className="flex justify-center gap-2 mt-6">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
} 