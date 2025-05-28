// This file is for constant values that are shared between
// the frontend and the backend.

// Example: API routes base paths
export const API_BASE_URL = '/api'; // Use relative path if deployed on same domain
export const API_COMMUNITY_EVENTS = `${API_BASE_URL}/community/events`;
export const API_CONTACT_FORM = `${API_BASE_URL}/contact`;

// Example: User roles
export const USER_ROLES = {
  MEMBER: 'member',
  ADMIN: 'admin',
  VOLUNTEER: 'volunteer'
} as const; // 'as const' makes the string literals truly constant types
