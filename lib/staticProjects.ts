// lib/staticProjects.ts

export interface Project {
    id: string;
    name: string;
    description: string;
    image_url: string;
    created_at: string;
    updated_at: string;
    website_url: string;
  }
  
  export const staticProjects: Project[] = [
    {
        created_at
        : 
        "2025-04-15T00:59:47.94931+00:00",
        description
        : 
        "An intelligent travel planning application that generates daily, customized travel-itineraries for users based on their budget and preferences. Built using React, TypeScript, ShadCN, Zod, Express, Drizzle, Passport.js, Stripe and Google Maps APIs, and MemStorage for data-persistence.",
        id
        : 
        "bb136d88-114b-4a06-b131-83aa2a6a19f7",
        image_url
        : 
        "https://res.cloudinary.com/djhqucpvr/image/upload/v1744678786/av1h1l8ngva7veowqibb.jpg",
        name
        : 
        "GoTrotter",
        updated_at
        : 
        "2025-04-15T00:59:47.94931+00:00",
        website_url
        : 
        "https://gotrotter.replit.app"
    },
    {
        created_at: "2025-04-14T04:37:58.903798+00:00",
        description: "Saas platform focused on AI-managed and automated customer-communications for small-to-medium-sized businesses. Services include AI chatbots, voice-enabled AI-appointment scheduling and automated text-messaging and communication.",
        id: "8554f72e-0aa9-45f1-98d5-f4b3a32422f3",
        image_url: "https://res.cloudinary.com/djhqucpvr/image/upload/v1744605477/klayb3zblpj2fboim0hm.jpg",
        name: "Desk Agent",
        updated_at: "2025-04-14T04:37:58.903798+00:00",
        website_url: "https://desk-agent.replit.app/"
    },
    {
        created_at : "2025-04-14T20:49:10.721709+00:00",
        description : "A fun and entertaining iOS application that leverages advanced facial recognition AI to analyze and rate facial features. Built with SwiftUI for iOS, TensorFlow/PyTorch for model training, CoreML and Vision Framework for in-app utilization, and Firebase for push notifications.",
        id : "da600867-c077-4980-8dd5-abf43deb5449",
        image_url : "https://res.cloudinary.com/djhqucpvr/image/upload/v1744663749/iy0tgyekxtfjqhnkq8v6.webp",
        name : "FaceRaterAI",   
        updated_at : "2025-04-14T20:49:10.721709+00:00",
        website_url: "https://github.com/stars/rabdulsal/lists/facerater-ai-codebases"
    }
    // Add more projects as needed
  ];