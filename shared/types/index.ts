// This file is for TypeScript types and interfaces that are shared
// between the frontend and the backend.

// Example: A common interface for a User profile
/*
export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  role: 'member' | 'admin';
  createdAt: string;
}
*/

// Example: A common interface for a Classroom Resource (matching Supabase table)
export interface ClassroomResource {
  id: string;
  created_at: string;
  title: string;
  description: string;
  url: string;
  category: string; // e.g., "AI Tool", "Coding Course"
  is_premium: boolean;
}
