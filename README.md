# Our Community in Unity - Project Documentation

This document provides a comprehensive overview of the `ourcommunity.agency` platform, its structure, and detailed instructions for setting it up, developing, and deploying it. This guide is designed to be accessible even for users with limited coding experience.

## Table of Contents

1.  [Project Overview](#1-project-overview)
2.  [Project Structure](#2-project-structure)
3.  [Key Technologies & Services (Free Tiers)](#3-key-technologies--services-free-tiers)
    * [Frontend](#31-frontend)
    * [Backend / Database / Auth](#32-backend--database--auth)
    * [Deployment & Infrastructure](#33-deployment--infrastructure)
4.  [Detailed Guide: Setting Up & Deploying Your Platform](#4-detailed-guide-setting-up--deploying-your-platform)
    * [Part 1: Project Setup & Version Control (GitHub)](#part-1-project-setup--version-control-github)
    * [Part 2: Backend & Database Setup (Supabase)](#part-2-backend--database-setup-supabase)
    * [Part 3: Frontend Development & Connecting to Supabase](#part-3-frontend-development--connecting-to-supabase)
    * [Part 4: Frontend Deployment (Firebase Hosting)](#part-4-frontend-deployment-firebase-hosting)
    * [Part 5: Domain Management & Performance (Cloudflare)](#part-5-domain-management--performance-cloudflare)
    * [Part 6: Backend Considerations (Render / Supabase Edge Functions)](#part-6-backend-considerations-render--supabase-edge-functions)
5.  [The Classroom: Learning & Free Tools](#5-the-classroom-learning--free-tools)
    * [Purpose](#purpose)
    * [Content & Resources](#content--resources)
    * [Membership & Access](#membership--access)
    * [Adding New Resources](#adding-new-resources)
6.  [Development Guidelines](#6-development-guidelines)
    * [Running Locally](#running-locally)
    * [Coding Standards](#coding-standards)
    * [Contributing](#contributing)
7.  [Contact & Support](#7-contact--support)

---

## 1. Project Overview

Our Community in Unity is a full-stack web platform dedicated to empowering individuals in Cape Town through education, shared resources, and community building. The project operates under the guiding motto "Each One Teach One," emphasizing the reciprocal nature of learning and support within the community. This platform is designed to be accessible and sustainable by leveraging free-tier cloud services for its various components.

The core functionalities include a public-facing website providing information about the organization's mission, vision, values, programs, and how to get involved. A key feature is the dynamic "Classroom" section, which offers free learning tools and courses in areas like coding, marketing, and digital literacy. This section is accessible to registered members, with user authentication handled securely.

The entire project is structured to ensure clarity and maintainability, with distinct directories for the frontend, backend (primarily utilizing Supabase services initially), and shared resources. It is set up for continuous development and deployment, making it suitable for both experienced developers and no-code users looking to replicate or adapt similar community-focused platforms.

## 2. Project Structure

The project follows a monorepo-like structure, organizing frontend, backend, and shared components in distinct directories.
docs: Add comprehensive README.md with full deployment guide [Deployment trigger: Minor README update to re-sync with Cloudflare Pages]
[Final Cloudflare Pages re-sync attempt post domain removal]
fix: Final trigger after Pages project and custom domain removal
