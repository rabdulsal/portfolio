import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  if (process.env.NODE_ENV === 'development') {
    console.warn('Missing Supabase environment variables');
  }
}

// Initialize with empty strings if variables are missing (for static export)
export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

// Types for our projects table
export interface Project {
  id: string;
  name: string;
  description: string;
  image_url: string;
  website_url?: string;  // Optional website URL
  created_at: string;
  updated_at: string;
}

// Helper functions for project operations
export const projectOperations = {
  // Get all projects
  getProjects: async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Project[];
  },

  // Create a new project
  createProject: async (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()
      .single();
    
    if (error) throw error;
    return data as Project;
  },

  // Update a project
  updateProject: async (id: string, updates: Partial<Project>) => {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Project;
  },

  // Delete a project
  deleteProject: async (id: string) => {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
}; 