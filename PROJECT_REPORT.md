# Career Canvas (JobNest) — Project Report

**Prepared for:** Tata Consultancy Services (TCS)
**Date:** February 27, 2026
**Version:** 1.0
**Author:** Project Team — Career Canvas

---

## Table of Contents

1. [Project Title](#1-project-title)
2. [Problem Statement](#2-problem-statement)
3. [Objective](#3-objective)
4. [Technology Stack](#4-technology-stack)
5. [System Architecture](#5-system-architecture)
6. [Folder Structure Explanation](#6-folder-structure-explanation)
7. [Features & Functionalities](#7-features--functionalities)
8. [API Details](#8-api-details)
9. [Database Schema](#9-database-schema)
10. [Implementation Details](#10-implementation-details)
11. [AI Integration — Where and How AI Is Used](#11-ai-integration--where-and-how-ai-is-used)
12. [Security Measures](#12-security-measures)
13. [Testing Approach](#13-testing-approach)
14. [Challenges Faced & Solutions](#14-challenges-faced--solutions)
15. [Future Enhancements](#15-future-enhancements)
16. [Conclusion](#16-conclusion)

---

## 1. Project Title

**Career Canvas (JobNest)** — An AI-Powered Career Networking and Job Matching Platform

---

## 2. Problem Statement

The modern job market suffers from a fundamental disconnect between job seekers and employers. Existing platforms are either purely job boards with no social engagement, or social networks with limited job functionality. Key pain points include:

- **For Job Seekers:** Difficulty in discovering roles that match their actual skills, lack of objective feedback on resumes, no AI-driven guidance on profile optimization, and limited professional networking capabilities integrated with the job search process.
- **For Employers:** Time-consuming manual screening of irrelevant applications, inability to generate compelling job descriptions quickly, lack of automated applicant-resume matching, and fragmented workflows across multiple tools.
- **For Platform Administrators:** Absence of centralized moderation tools, no real-time analytics on platform health, and difficulty maintaining community safety across user-generated content.

There is a clear need for a unified platform that combines intelligent job matching, professional networking, and AI-powered career tools — all within a single, modern web application.

---

## 3. Objective

The objective of Career Canvas is to build a production-grade, full-stack web application that:

1. **Bridges the gap** between professional social networking and intelligent job discovery by combining LinkedIn-style networking features with advanced job search and application management.
2. **Leverages Generative AI** (Google Gemini) to provide resume reviews, job-resume match scoring, profile optimization suggestions, automated job description generation, and intelligent resume parsing.
3. **Serves three distinct user roles** — Job Seekers, Employers, and Administrators — each with tailored dashboards, workflows, and permissions.
4. **Implements enterprise-grade security** including JWT-based authentication with refresh tokens, OTP-based email verification, role-based access control, rate limiting, and input validation.
5. **Follows modern software architecture principles** including the Service-Layer Pattern, async database operations, RESTful API design, and component-based frontend architecture.

---

## 4. Technology Stack

### 4.1 Frontend

| Category | Technology | Version | Purpose |
|---|---|---|---|
| **Language** | TypeScript | 5.8 | Static type safety across the entire frontend |
| **UI Framework** | React | 18.3 | Component-based UI rendering with hooks |
| **Build Tool** | Vite | 5.4 | Fast HMR development with SWC compilation |
| **Styling** | Tailwind CSS | 3.4 | Utility-first CSS with custom design tokens |
| **Component Library** | shadcn/ui (Radix) | Latest | 48 accessible, unstyled primitives |
| **Routing** | React Router DOM | 6.30 | Declarative client-side routing with nested layouts |
| **Global State** | Zustand | 5.0 | Lightweight reactive state management |
| **Server State** | TanStack React Query | 5.83 | Automatic caching, refetching, and synchronization |
| **HTTP Client** | Axios | 1.13 | Promise-based HTTP with interceptors |
| **Forms** | React Hook Form + Zod | 7.61 / 3.25 | Performant forms with schema-based validation |
| **Animations** | Framer Motion | 12.34 | Physics-based animations and gestures |
| **Charts** | Recharts | 2.15 | Declarative SVG chart components |
| **Icons** | Lucide React | 0.462 | Consistent, tree-shakeable icon set |
| **Toasts** | Sonner | 1.7 | Non-intrusive notification system |

### 4.2 Backend

| Category | Technology | Version | Purpose |
|---|---|---|---|
| **Language** | Python | 3.11+ | Async-first backend development |
| **Framework** | FastAPI | 0.115 | High-performance async API framework with auto-docs |
| **ASGI Server** | Uvicorn | 0.34 | Production ASGI server with HTTP/2 support |
| **ORM** | SQLAlchemy | 2.0 (Async) | Declarative async ORM with relationship loading |
| **Database Driver** | asyncpg | 0.31 | Native async PostgreSQL driver |
| **Migrations** | Alembic | 1.18 | Database schema version control |
| **Authentication** | python-jose + bcrypt | 3.3 / Latest | JWT token generation and password hashing |
| **Validation** | Pydantic V2 | Latest | Data validation with JSON Schema generation |
| **AI Engine** | Google Gemini (google-genai) | 1.0+ | Generative AI for content analysis and generation |
| **File Storage** | Cloudinary | 1.41 | CDN-backed file/image/resume storage |
| **Email** | aiosmtplib | 5.1 | Async SMTP email delivery |
| **Rate Limiting** | SlowAPI | 0.1.9 | Token-bucket rate limiting middleware |
| **Settings** | pydantic-settings | 2.13 | Type-safe environment variable management |

### 4.3 Database

| Component | Technology | Details |
|---|---|---|
| **Primary Database** | PostgreSQL (Neon Serverless) | Cloud-hosted with auto-scaling, connection pooling |
| **Driver Protocol** | asyncpg + SSL | Fully asynchronous with TLS encryption in transit |

### 4.4 External Services

| Service | Provider | Purpose |
|---|---|---|
| **AI/ML** | Google Gemini API (gemini-2.5-flash) | Resume parsing, match scoring, content generation |
| **CDN/Storage** | Cloudinary | Resume PDFs, profile photos, post media |
| **Email** | Gmail SMTP (via aiosmtplib) | OTP verification, notifications, password resets |
| **Database** | Neon (Serverless PostgreSQL) | Persistent data storage with auto-sleep |

### 4.5 Development Tools

| Tool | Purpose |
|---|---|
| **uv** | Python package manager (fast dependency resolution) |
| **npm** | Node.js package manager |
| **ESLint** | TypeScript/React linting |
| **Vitest** | Unit testing framework |
| **Alembic** | Database migration management |

---

## 5. System Architecture

### 5.1 High-Level Architecture

The application follows a **three-tier architecture**:

```
┌──────────────────────────────────────────────────────────────────────┐
│                         CLIENT TIER                                  │
│                                                                      │
│   React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui           │
│   ┌─────────────┐  ┌──────────────┐  ┌───────────────┐             │
│   │ React Router │  │ React Query  │  │   Zustand     │             │
│   │ (Routing)    │  │(Server State)│  │(Global State) │             │
│   └─────────────┘  └──────────────┘  └───────────────┘             │
│   ┌─────────────────────────────────────────────────────┐           │
│   │         Axios API Client (with interceptors)         │           │
│   └─────────────────────────┬───────────────────────────┘           │
└─────────────────────────────┼────────────────────────────────────────┘
                              │  REST API / JSON (HTTPS)
                              │  JWT Bearer Authentication
┌─────────────────────────────┼────────────────────────────────────────┐
│                         API TIER                                     │
│                              │                                       │
│   FastAPI + Uvicorn (ASGI)  ▼                                       │
│   ┌─────────────────────────────────────────────────┐               │
│   │          API Routers (v1-namespaced)              │               │
│   │  auth │ users │ profiles │ jobs │ applications   │               │
│   │  social │ messaging │ notifications │ ai │ admin │               │
│   └──────────────────────┬──────────────────────────┘               │
│   ┌──────────────────────┼──────────────────────────┐               │
│   │        Service Layer (Business Logic)             │               │
│   │  AuthService │ ProfileService │ JobService        │               │
│   │  AIService │ EmailService │ CloudinaryService     │               │
│   └──────────────────────┬──────────────────────────┘               │
│   ┌──────────────────────┼──────────────────────────┐               │
│   │        SQLAlchemy ORM Models + Pydantic Schemas   │               │
│   └──────────────────────┬──────────────────────────┘               │
└──────────────────────────┼───────────────────────────────────────────┘
                           │
┌──────────────────────────┼───────────────────────────────────────────┐
│                      DATA TIER                                       │
│                           │                                          │
│   ┌───────────────┐  ┌───┴──────────┐  ┌───────────────┐           │
│   │  Neon         │  │  Cloudinary   │  │  Google       │           │
│   │  PostgreSQL   │  │  CDN          │  │  Gemini AI    │           │
│   │  (Database)   │  │  (Files)      │  │  (AI/ML)      │           │
│   └───────────────┘  └──────────────┘  └───────────────┘           │
│                                                                      │
│   ┌───────────────┐                                                 │
│   │  Gmail SMTP   │                                                 │
│   │  (Email)      │                                                 │
│   └───────────────┘                                                 │
└──────────────────────────────────────────────────────────────────────┘
```

### 5.2 Design Patterns

| Pattern | Implementation |
|---|---|
| **Service-Layer Pattern** | All business logic resides in `app/services/`, keeping routers thin |
| **Repository-like Querying** | Services encapsulate SQLAlchemy queries; routers never run raw SQL |
| **Dependency Injection** | FastAPI `Depends()` for database sessions, auth guards, services |
| **Factory Functions** | `require_role()` factory produces role-specific auth dependencies |
| **Observer/Event Pattern** | Frontend uses `auth:logout` custom events for cross-component coordination |
| **Interceptor Pattern** | Axios request/response interceptors for token management and auto-refresh |
| **Mixin Pattern** | `TimestampMixin` and `SoftDeleteMixin` provide reusable model columns |

---

## 6. Folder Structure Explanation

### 6.1 Backend (`backend/`)

```
backend/
├── main.py                     # FastAPI application entry point, CORS, rate limiting
├── pyproject.toml              # Python dependencies and project metadata
├── alembic.ini                 # Alembic migration configuration
├── .env                        # Environment variables (secrets — not committed)
├── .env.example                # Template for required environment variables
├── app/
│   ├── api/
│   │   ├── deps.py             # Shared dependency re-exports
│   │   └── v1/
│   │       ├── __init__.py     # V1 router aggregation (all sub-routers)
│   │       ├── auth.py         # Registration, login, OTP verification, password reset
│   │       ├── users.py        # User CRUD (get/update current user)
│   │       ├── profiles.py     # Seeker/Employer profiles, resume upload, photo upload
│   │       ├── jobs.py         # Job CRUD, search, save/unsave, delegated OTP editing
│   │       ├── applications.py # Apply, list, update application status
│   │       ├── social.py       # Posts, comments, likes, hashtags, trending
│   │       ├── messaging.py    # Direct messaging between users
│   │       ├── notifications.py# User notification management
│   │       ├── connections.py  # Professional connection requests
│   │       ├── ai.py           # AI endpoints (resume review, match, recommendations)
│   │       ├── search.py       # Global search across users, jobs, posts
│   │       ├── admin.py        # Admin dashboard, user/job management, moderation
│   │       └── reports.py      # Content reporting and moderation
│   ├── core/
│   │   ├── config.py           # Pydantic-Settings (env var management)
│   │   ├── security.py         # JWT creation/validation, bcrypt password hashing
│   │   ├── dependencies.py     # Auth guards (get_current_user, require_role)
│   │   └── logging.py          # Structured logging configuration
│   ├── db/
│   │   ├── base.py             # SQLAlchemy Base, TimestampMixin, SoftDeleteMixin
│   │   ├── enums.py            # Python enums (UserRole, JobStatus, etc.)
│   │   └── session.py          # Async engine, session factory, get_db_session
│   ├── models/
│   │   ├── __init__.py         # Re-exports all models for Alembic discovery
│   │   ├── user.py             # User, EmailVerificationToken, PasswordResetToken
│   │   ├── profile.py          # SeekerProfile, EmployerProfile, Experience, etc.
│   │   ├── job.py              # Job, Skill, SavedJob, association tables
│   │   ├── application.py      # Application model
│   │   ├── social.py           # Post, Comment, Like, Hashtag models
│   │   ├── messaging.py        # Message model
│   │   ├── notification.py     # Notification model
│   │   ├── connection.py       # Connection model (self-referencing M2M)
│   │   └── report.py           # Report model
│   ├── schemas/                # Pydantic V2 request/response schemas
│   │   ├── user.py             # UserCreate, UserRead, LoginRequest, TokenResponse
│   │   ├── profile.py          # SeekerProfileRead, EmployerProfileRead, etc.
│   │   ├── job.py              # JobCreate, JobRead, JobUpdate, SkillRead
│   │   ├── application.py      # ApplicationCreate, ApplicationRead
│   │   ├── ai.py               # AI request/response schemas (structured output)
│   │   ├── social.py           # Post/Comment/Like schemas
│   │   ├── messaging.py        # Message schemas
│   │   ├── notification.py     # Notification schemas
│   │   ├── connection.py       # Connection schemas
│   │   ├── bookmark.py         # Bookmark response schema
│   │   └── report.py           # Report schemas
│   ├── services/               # Business logic layer
│   │   ├── auth_service.py     # Registration, login, OTP, password reset
│   │   ├── user_service.py     # User CRUD operations
│   │   ├── profile_service.py  # Profile management, skills sync, stats
│   │   ├── job_service.py      # Job CRUD, search, recommendations
│   │   ├── application_service.py # Application lifecycle
│   │   ├── ai_service.py       # Gemini AI integration (all AI calls)
│   │   ├── email_service.py    # SMTP email delivery
│   │   ├── cloudinary_service.py # File upload/delete via Cloudinary
│   │   ├── social_service.py   # Social feed operations
│   │   ├── messaging_service.py # Messaging operations
│   │   ├── notification_service.py # Notification creation/retrieval
│   │   ├── connection_service.py # Connection management
│   │   ├── search_service.py   # Full-text search logic
│   │   ├── bookmark_service.py # Job bookmarking
│   │   └── moderation_service.py # Content moderation
│   └── utils/
│       ├── constants.py        # Upload limits, pagination defaults, folder names
│       └── pagination.py       # Reusable pagination dependency
└── migrations/
    ├── env.py                  # Alembic async migration runner
    └── versions/               # 7 migration files (initial → phase 2.5)
```

### 6.2 Frontend (`frontend/`)

```
frontend/
├── index.html                  # HTML entry point
├── package.json                # Dependencies and scripts
├── vite.config.ts              # Vite bundler config (port 8080, @ alias, SWC)
├── tailwind.config.ts          # Tailwind theme (colors, animations, dark mode)
├── tsconfig.json               # TypeScript configuration
├── src/
│   ├── main.tsx                # React DOM root render
│   ├── App.tsx                 # Root component — all route definitions
│   ├── index.css               # Tailwind directives + global styles
│   ├── context/
│   │   └── AuthContext.tsx      # Authentication state (login, logout, refresh)
│   ├── store/
│   │   └── useStore.ts         # Zustand global state store
│   ├── hooks/
│   │   ├── use-mobile.tsx      # Responsive breakpoint hook
│   │   └── use-toast.ts        # Toast notification hook
│   ├── lib/
│   │   ├── utils.ts            # Utility functions (cn, class merging)
│   │   └── api/
│   │       ├── apiClient.ts    # Axios instance + interceptors (auto-refresh)
│   │       ├── authApi.ts      # Auth endpoints (login, register, verify, reset)
│   │       ├── userApi.ts      # User endpoints (getMe, updateMe)
│   │       ├── profileApi.ts   # Profile CRUD endpoints
│   │       ├── jobApi.ts       # Job search, CRUD endpoints
│   │       ├── applicationApi.ts # Application endpoints
│   │       ├── aiApi.ts        # AI feature endpoints
│   │       ├── socialApi.ts    # Social feed endpoints
│   │       ├── messagingApi.ts # Messaging endpoints
│   │       ├── connectionApi.ts # Connection endpoints
│   │       ├── notificationApi.ts # Notification endpoints
│   │       ├── searchApi.ts    # Global search endpoint
│   │       └── adminApi.ts     # Admin endpoints
│   ├── layouts/
│   │   ├── PublicLayout.tsx    # Layout for public pages (navbar + footer)
│   │   ├── AuthLayout.tsx      # Layout for auth pages (centered, no nav)
│   │   └── DashboardLayout.tsx # Layout for dashboard (sidebar + main area)
│   ├── components/
│   │   ├── auth/
│   │   │   ├── ProtectedRoute.tsx     # Redirects unauthenticated users
│   │   │   └── RoleProtectedRoute.tsx # Enforces role-based route access
│   │   ├── ui/                 # 48 shadcn/ui components (buttons, cards, etc.)
│   │   ├── Navbar.tsx          # Top navigation bar
│   │   ├── Footer.tsx          # Page footer
│   │   ├── AppSidebar.tsx      # Dashboard sidebar navigation
│   │   ├── GlassCard.tsx       # Reusable glass-morphism card
│   │   ├── JobCard.tsx         # Job listing card component
│   │   ├── AnimatedCounter.tsx # Animated number counter
│   │   └── ScrollReveal.tsx    # Scroll-triggered animation wrapper
│   └── pages/
│       ├── Index.tsx           # Landing page (hero, features, testimonials)
│       ├── Login.tsx           # Login with role toggle
│       ├── Signup.tsx          # Registration with role selection
│       ├── VerifyEmail.tsx     # OTP email verification
│       ├── ForgotPassword.tsx  # Password reset request
│       ├── ResetPassword.tsx   # Password reset form
│       ├── seeker/             # 15 seeker-specific pages
│       │   ├── Dashboard.tsx   # Seeker dashboard with stats
│       │   ├── Profile.tsx     # Profile management
│       │   ├── Resume.tsx      # Resume upload + AI parsing
│       │   ├── JobSearch.tsx   # Job search with filters
│       │   ├── JobDetail.tsx   # Individual job view
│       │   ├── AIMatch.tsx     # AI-powered job recommendations
│       │   ├── SocialFeed.tsx  # Social networking feed
│       │   ├── Messages.tsx    # Direct messaging
│       │   └── ...
│       ├── employer/           # Employer dashboard + pages
│       ├── admin/              # Admin dashboard + pages
│       └── shared/             # Shared pages (search, company view)
```

---

## 7. Features & Functionalities

### 7.1 Job Seeker Features

| Feature | Description |
|---|---|
| **User Registration & Email Verification** | OTP-based email verification with 6-digit codes, Gmail-only enforcement |
| **Profile Management** | Full name, headline, location, about section, profile photo upload |
| **Resume Upload & AI Parsing** | PDF upload to Cloudinary; Gemini AI extracts structured data (experiences, education, skills, languages, projects) and optionally pre-fills the profile |
| **Experience/Education/Skills CRUD** | Add, edit, delete work experience, education entries, certifications, languages, and projects |
| **Job Search & Filters** | Search by keyword, location, experience level, job type, remote status with pagination |
| **Job Application** | One-click apply with automatic resume attachment and cover letter support |
| **Job Bookmarking** | Save/unsave jobs for later review |
| **AI Resume Review** | Get AI-powered feedback on resume quality, strengths, improvements, and formatting |
| **AI Job Matching** | AI calculates a 0-100 match score between resume and specific job descriptions |
| **AI Job Recommendations** | Bulk AI scoring of resume against all open jobs, ranked by match score |
| **AI Profile Optimization** | AI suggests profile improvements, headline suggestions, and completeness score |
| **Social Feed** | Create posts, like, comment, use hashtags, view trending content |
| **Professional Connections** | Send, accept, reject connection requests |
| **Direct Messaging** | Real-time messaging between connected users |
| **Notifications** | Application updates, connection requests, message alerts |
| **Skill-Based Recommendations** | Deterministic job recommendations based on overlapping skills |

### 7.2 Employer Features

| Feature | Description |
|---|---|
| **Company Profile** | Company name, description, industry, size, website, logo, cover image |
| **Job Posting** | Create detailed job listings with title, description, requirements, benefits, salary range, skills |
| **AI Job Description Generator** | Generate professional job descriptions from title and context using Gemini AI |
| **Applicant Tracking** | View all applicants per job, review resumes, update application status |
| **Job Management** | Edit, archive, close job postings |
| **Delegated Editing (OTP)** | Same-company employees can request OTP from job owner to edit postings |
| **Company Dashboard** | Shared dashboard across all employees with the same email domain |
| **Email Notifications** | Receive notifications when candidates apply |

### 7.3 Admin Features

| Feature | Description |
|---|---|
| **Platform Dashboard** | Real-time statistics on users, jobs, applications, posts |
| **User Management** | View all users, deactivate accounts |
| **Job Management** | View all jobs (including non-open), deactivate job postings |
| **Content Moderation** | Review reported users, jobs, and posts |
| **Report Management** | Review, dismiss, or action reports |

---

## 8. API Details

### 8.1 API Design

- **Base URL:** `/api/v1`
- **Format:** RESTful JSON API
- **Authentication:** OAuth2 Bearer token (JWT)
- **Documentation:** Auto-generated Swagger UI at `/docs`, ReDoc at `/redoc`
- **Rate Limiting:** 60 requests/minute per IP (configurable)

### 8.2 Endpoint Summary

| Module | Endpoints | Key Routes |
|---|---|---|
| **Auth** | 6 | `POST /auth/register`, `POST /auth/login`, `POST /auth/refresh`, `POST /auth/verify-email`, `POST /auth/resend-otp`, `POST /auth/forgot-password`, `POST /auth/reset-password` |
| **Users** | 3 | `GET /users/me`, `PATCH /users/me`, `GET /users/{id}` |
| **Profiles** | 20+ | `GET/POST/PATCH /profiles/seeker`, `POST /profiles/seeker/resume`, `POST /profiles/seeker/photo`, `PUT /profiles/seeker/skills`, CRUD for experiences/education/languages/projects, `GET/POST/PATCH /profiles/employer` |
| **Jobs** | 10+ | `GET/POST /jobs`, `GET /jobs/{id}`, `PATCH/DELETE /jobs/{id}`, `GET /jobs/saved`, `GET /jobs/recommendations`, `POST /jobs/{id}/save`, `DELETE /jobs/{id}/unsave`, OTP delegated editing |
| **Applications** | 5 | `POST /applications`, `GET /applications/me`, `GET /applications/job/{id}`, `GET/PATCH /applications/{id}` |
| **AI** | 6 | `POST /ai/job-description`, `POST /ai/resume-review`, `POST /ai/resume-match/{id}`, `POST /ai/profile-optimize`, `POST /ai/job-recommendations`, `POST /ai/application-score` |
| **Social** | 8+ | `GET/POST /social/posts`, `POST /social/posts/{id}/like`, `POST /social/posts/{id}/comment`, `GET /social/trending` |
| **Messaging** | 4 | `GET /messaging/conversations`, `GET/POST /messaging/messages/{user_id}` |
| **Notifications** | 3 | `GET /notifications`, `PATCH /notifications/{id}/read`, `PATCH /notifications/read-all` |
| **Connections** | 5 | `POST /connections/request`, `PATCH /connections/{id}/accept`, `PATCH /connections/{id}/reject`, `GET /connections` |
| **Admin** | 8+ | `GET /admin/stats`, `GET /admin/users`, `POST /admin/users/{id}/deactivate`, `GET /admin/jobs`, `POST /admin/jobs/{id}/deactivate`, `GET /admin/reports` |
| **Search** | 1 | `GET /search` (cross-entity search) |
| **Reports** | 2+ | `POST /reports`, `GET /reports` |

### 8.3 Authentication Flow

```
1. User registers → POST /auth/register
   └── OTP sent to email
2. User verifies email → POST /auth/verify-email (with OTP)
3. User logs in → POST /auth/login
   └── Returns { access_token, refresh_token, token_type }
4. All subsequent requests include: Authorization: Bearer <access_token>
5. On 401, client auto-refreshes → POST /auth/refresh { refresh_token }
   └── Returns new { access_token, refresh_token }
6. If refresh fails, client dispatches 'auth:logout' event → full logout
```

---

## 9. Database Schema

### 9.1 Overview

The database consists of **20+ tables** built with the following design principles:
- **UUID primary keys** for distributed-safe ID generation
- **Soft deletes** via `deleted_at` timestamps (no data loss)
- **Automatic timestamps** via `created_at` and `updated_at` columns
- **Composite unique constraints** to prevent data duplication
- **Foreign key cascades** for referential integrity

### 9.2 Core Tables

#### Users

| Column | Type | Constraints |
|---|---|---|
| `id` | UUID | Primary Key, auto-generated |
| `email` | VARCHAR(320) | Unique, indexed |
| `hashed_password` | VARCHAR(1024) | Not null |
| `role` | ENUM (seeker/employer/admin) | Not null |
| `is_active` | BOOLEAN | Default true |
| `is_verified` | BOOLEAN | Default false |
| `last_login_at` | TIMESTAMP | Nullable |
| `created_at` | TIMESTAMP | Auto-set |
| `updated_at` | TIMESTAMP | Auto-updated |
| `deleted_at` | TIMESTAMP | Soft delete |

#### Seeker Profiles

| Column | Type | Description |
|---|---|---|
| `id` | UUID | Primary Key |
| `user_id` | UUID (FK → users) | Unique, one-to-one |
| `full_name` | VARCHAR(255) | Required |
| `headline` | VARCHAR(500) | Professional headline |
| `location` | VARCHAR(255) | Geographic location |
| `about` | TEXT | Bio / summary |
| `profile_photo_url` | VARCHAR(1024) | Cloudinary URL |
| `resume_url` | VARCHAR(1024) | Cloudinary URL |
| `parsed_resume_data` | JSON | AI-extracted structured resume data |
| `profile_visibility` | ENUM (public/private) | Access control |
| `profile_views_count` | INTEGER | Analytics counter |

#### Employer Profiles

| Column | Type | Description |
|---|---|---|
| `id` | UUID | Primary Key |
| `user_id` | UUID (FK → users) | Unique, one-to-one |
| `company_name` | VARCHAR(255) | Required |
| `description` | TEXT | Company description |
| `website` | VARCHAR(512) | Company URL |
| `industry` | VARCHAR(255) | Industry sector |
| `company_size` | VARCHAR(50) | Size category |
| `logo_url` | VARCHAR(1024) | Cloudinary URL |
| `headquarters` | VARCHAR(255) | HQ location |
| `founded_year` | INTEGER | Establishment year |

#### Jobs

| Column | Type | Description |
|---|---|---|
| `id` | UUID | Primary Key |
| `employer_profile_id` | UUID (FK) | Posted by employer |
| `title` | VARCHAR(255) | Indexed for search |
| `description` | TEXT | Full job description |
| `requirements` | TEXT | Job requirements |
| `location` | VARCHAR(255) | Indexed for search |
| `salary_min` / `salary_max` | NUMERIC(12,2) | Salary range |
| `experience_level` | ENUM (junior/mid/senior) | Required level |
| `job_type` | ENUM (full_time/part_time/contract/internship) | Employment type |
| `is_remote` | BOOLEAN | Remote flag |
| `status` | ENUM (open/closed/archived) | Job lifecycle |
| `views_count` | INTEGER | View analytics |
| `applications_count` | INTEGER | Application counter |

#### Applications

| Column | Type | Description |
|---|---|---|
| `id` | UUID | Primary Key |
| `job_id` | UUID (FK → jobs) | Target job |
| `seeker_id` | UUID (FK → users) | Applicant |
| `resume_url` | VARCHAR(1024) | Submitted resume |
| `cover_letter` | TEXT | Application text |
| `status` | ENUM (applied/interviewing/offer/rejected) | Status tracker |
| `ai_match_score` | INTEGER | AI-computed score (0-100) |
| `ai_review_text` | TEXT | AI-generated assessment |

### 9.3 Association Tables

| Table | Connects | Type |
|---|---|---|
| `seeker_skills` | SeekerProfile ↔ Skill | Many-to-Many |
| `job_skills` | Job ↔ Skill | Many-to-Many |
| `post_hashtags` | Post ↔ Hashtag | Many-to-Many |

### 9.4 Supporting Tables

| Table | Purpose |
|---|---|
| `experiences` | Work experience entries (child of SeekerProfile) |
| `education_entries` | Education entries (child of SeekerProfile) |
| `certifications` | Professional certifications |
| `languages` | Spoken languages |
| `projects` | Portfolio projects |
| `skills` | Skill taxonomy (shared across seekers and jobs) |
| `posts` | Social feed posts |
| `comments` | Post comments |
| `likes` | Post likes |
| `hashtags` | Hashtag taxonomy |
| `messages` | Direct messages |
| `notifications` | User notifications |
| `connections` | Professional connections (self-referencing M2M) |
| `reports` | Content reports (for moderation) |
| `saved_jobs` | Job bookmarks |
| `email_verification_tokens` | OTP tokens for email verification |
| `password_reset_tokens` | Tokens for password reset |
| `job_edit_approval_tokens` | OTP tokens for delegated job editing |

### 9.5 Entity Relationship Diagram

```
USER ─── 1:1 ──── SEEKER_PROFILE ─── 1:N ──── EXPERIENCE
  │                    │                         EDUCATION
  │                    │                         CERTIFICATION
  │                    │                         LANGUAGE
  │                    │                         PROJECT
  │                    │
  │                    └─── M:N (seeker_skills) ──── SKILL
  │
  ├── 1:1 ──── EMPLOYER_PROFILE ─── 1:N ──── JOB
  │                                            │
  │                                            ├─── M:N (job_skills) ──── SKILL
  │                                            │
  │                                            └─── 1:N ──── APPLICATION
  │
  ├── 1:N ──── POST ─── 1:N ──── COMMENT
  │                       │
  │                       ├─── 1:N ──── LIKE
  │                       │
  │                       └─── M:N (post_hashtags) ──── HASHTAG
  │
  ├── 1:N ──── MESSAGE (sender/receiver)
  ├── 1:N ──── NOTIFICATION
  ├── 1:N ──── CONNECTION (requester/receiver)
  ├── 1:N ──── SAVED_JOB
  └── 1:N ──── REPORT
```

---

## 10. Implementation Details

### 10.1 Backend Architecture (Service-Layer Pattern)

The backend follows a strict three-layer architecture:

**Layer 1 — API Routers** (`app/api/v1/`): Define HTTP endpoints, handle request/response serialization, and delegate to services. Routers are thin and contain no business logic.

**Layer 2 — Services** (`app/services/`): Encapsulate all business logic, database queries, and orchestration of external services (AI, email, storage). Services receive an `AsyncSession` via dependency injection.

**Layer 3 — Models & Schemas** (`app/models/`, `app/schemas/`): SQLAlchemy ORM models define the database structure. Pydantic V2 schemas validate and serialize API data.

### 10.2 Async Database Operations

All database operations use SQLAlchemy 2.0 async mode with `asyncpg` driver:

```python
engine = create_async_engine(DATABASE_URL, pool_size=5, max_overflow=10)
async_session_factory = async_sessionmaker(bind=engine, class_=AsyncSession)
```

The `get_db_session` dependency provides transaction management with auto-commit and rollback:

```python
async def get_db_session():
    async with async_session_factory() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
```

### 10.3 Frontend State Management

The frontend uses a **dual-state architecture**:

1. **Zustand** for global UI state (sidebar state, theme preferences, modal controls)
2. **React Query** for all server-state (data fetching, caching, pagination, mutations)

This separation ensures that server data is always fresh (via React Query's smart refetching) while UI state remains performant (via Zustand's lightweight proxy-based reactivity).

### 10.4 Authentication Implementation

The authentication system implements a **JWT access + refresh token pattern**:

- **Access tokens** (30-minute TTL) are stored in memory and localStorage
- **Refresh tokens** (7-day TTL) are stored in localStorage
- The Axios interceptor automatically refreshes expired access tokens
- A request queue ensures concurrent 401 responses don't trigger multiple refresh calls
- Custom `auth:logout` DOM events coordinate logout across React components

### 10.5 Email-Domain Based Company Identity

The platform enforces company identity through email domains:

- Seekers must use `@gmail.com` addresses
- Employers must use company email domains (e.g., `@tcs.com`)
- All employer employees with the same email domain share a single company dashboard
- Job postings belong to the company (via domain), not individual employees
- Delegated job editing allows cross-employee collaboration via OTP approval

---

## 11. AI Integration — Where and How AI Is Used

### 11.1 AI Technology

The platform uses **Google Gemini API** (model: `gemini-2.5-flash`) through the official `google-genai` Python SDK. All AI interactions are centralized in `app/services/ai_service.py` to maintain separation of concerns.

### 11.2 Structured Output with Pydantic

A key technical innovation is the use of **Gemini's structured output mode** with Pydantic schemas. Instead of parsing free-text AI responses, we configure each Gemini call with:

```python
config=types.GenerateContentConfig(
    response_mime_type="application/json",
    response_json_schema=OutputSchema.model_json_schema(),
)
```

This forces Gemini to return responses that exactly match our Pydantic schema, which are then validated with `OutputSchema.model_validate_json(response.text)`. This eliminates parsing errors and ensures type-safe AI outputs.

### 11.3 AI Features in Detail

#### Feature 1: AI Resume Parsing & Profile Pre-fill

**Where:** `AIService.extract_resume_data()` called during resume upload (`POST /profiles/seeker/resume`)

**How it works:**
1. User uploads a PDF resume to Cloudinary
2. The raw PDF bytes are sent to Gemini as a `Part.from_bytes(data=file_bytes, mime_type="application/pdf")` — Gemini Vision processes the document
3. Gemini extracts structured data matching the `ResumeExtractionOutput` schema:
   - Full name, headline, location, about/summary
   - Work experiences (title, company, dates, descriptions)
   - Education entries (institution, degree, field, years)
   - Languages (spoken/written only — not programming languages)
   - Technical skills (tools, frameworks, methodologies)
   - Projects (name, description, role, URL, dates)
4. If `prefill_profile=true`, the extracted data is automatically merged into the user's profile, creating Experience, Education, Language, and Project records
5. Skills are synced using a get-or-create pattern to maintain a normalized skill taxonomy

**Technical highlight:** The system intelligently distinguishes between human languages (English, Hindi) and programming languages (Python, React) by instructing the AI in the schema description.

#### Feature 2: AI Resume-Job Match Scoring

**Where:** `AIService.calculate_resume_match()` and `AIService.score_resume_against_job()`

**How it works:**
1. The seeker's resume text and a job description are sent as a combined prompt
2. Gemini analyzes alignment between the candidate's qualifications and job requirements
3. Returns a `ResumeMatchOutput` with:
   - `match_score` (0-100): Quantitative compatibility rating
   - `strengths`: List of areas where the resume excels for this role
   - `gaps`: List of missing qualifications or skills
   - `overall_assessment`: Narrative summary

**Two modes:**
- **Text-based matching:** Uses parsed resume data as text
- **PDF-based matching:** Sends the actual resume PDF to Gemini Vision for direct document analysis

#### Feature 3: AI Resume Review

**Where:** `AIService.generate_resume_review()`

**How it works:**
1. Resume text is sent to Gemini with a career-coach system prompt
2. Returns `ResumeReviewOutput` with:
   - `overall_rating`: "strong" / "moderate" / "weak"
   - `strengths`: What the resume does well
   - `improvements`: Specific areas to improve
   - `formatting_suggestions`: Layout and formatting tips
   - `summary`: Overall assessment narrative

#### Feature 4: AI Job Description Generator

**Where:** `AIService.generate_job_description()`

**How it works:**
1. Employer provides: job title, required skills, experience level, job type, company description
2. Gemini generates a complete `JobDescriptionOutput`:
   - Professional summary
   - Key responsibilities
   - Must-have requirements
   - Nice-to-have qualifications
   - Benefits and perks

This allows employers to create compelling job postings in seconds instead of hours.

#### Feature 5: AI Profile Optimization

**Where:** `AIService.generate_profile_optimization()`

**How it works:**
1. The user's complete profile data (serialized as JSON) is sent to Gemini
2. Gemini acts as a "LinkedIn optimization expert" and returns:
   - `completeness_score` (0-100): How complete the profile is
   - `missing_fields`: Fields that should be filled
   - `improvement_suggestions`: Actionable optimization tips
   - `headline_suggestion`: A recruiter-attracting headline
   - `summary_suggestion`: An optimized profile summary

#### Feature 6: AI Bulk Job Recommendations

**Where:** `AIService.get_ai_job_recommendations()`

**How it works:**
1. The seeker's parsed resume data and a list of all open jobs (with titles, companies, descriptions) are sent together
2. Gemini evaluates each job against the resume simultaneously
3. Returns an `AIRecommendationsOutput` with ranked `AIJobRecommendation` objects, each containing:
   - `job_id`, `job_title`, `company_name`
   - `match_score` (0-100)
   - `strengths`, `gaps`, `summary`
4. Results are sorted by match score descending

### 11.4 AI Architecture Summary

```
                      ┌────────────────────┐
                      │    API Routers      │
                      │  (ai.py, profiles.py│
                      │   applications.py)  │
                      └────────┬───────────┘
                               │
                      ┌────────▼───────────┐
                      │    AIService        │
                      │  (ai_service.py)    │
                      │                     │
                      │  • Lazy client init │
                      │  • System prompts   │
                      │  • Schema binding   │
                      └────────┬───────────┘
                               │
                      ┌────────▼───────────┐
                      │  Google Gemini API  │
                      │  (gemini-2.5-flash) │
                      │                     │
                      │  Structured Output  │
                      │  → JSON Schema      │
                      │  → Pydantic models  │
                      └────────────────────┘
```

---

## 12. Security Measures

### 12.1 Authentication & Authorization

| Measure | Implementation |
|---|---|
| **Password Hashing** | bcrypt with automatic salt generation |
| **JWT Tokens** | Access (30 min) + Refresh (7 days) with HS256 signing |
| **Token Type Validation** | Tokens include `type: "access"` or `type: "refresh"` to prevent misuse |
| **Email Verification** | Mandatory OTP verification before login is allowed |
| **Role-Based Access Control** | `require_role()` factory dependency enforces role membership on every protected endpoint |
| **OAuth2 Bearer Flow** | Standard `Authorization: Bearer <token>` header pattern |

### 12.2 Input Validation & Sanitization

| Measure | Implementation |
|---|---|
| **Schema Validation** | All request bodies validated by Pydantic V2 with strict type checking |
| **Email Validation** | `EmailStr` type with format validation |
| **Password Policy** | Minimum 8 characters, maximum 128 characters |
| **File Upload Limits** | 10MB maximum size, PDF-only for resumes, image-only for photos |
| **Content Type Verification** | MIME type checked before processing uploads |

### 12.3 API Security

| Measure | Implementation |
|---|---|
| **Rate Limiting** | 60 requests/minute per IP via SlowAPI |
| **CORS** | Whitelist-based origin control (only allowed frontend domains) |
| **SQL Injection Prevention** | Parameterized queries via SQLAlchemy ORM (never raw SQL) |
| **Soft Deletes** | Data is never permanently destroyed (audit trail) |
| **Email Enumeration Prevention** | Password reset returns generic messages regardless of email existence |

### 12.4 Cryptographic Security

| Measure | Implementation |
|---|---|
| **OTP Generation** | `secrets.randbelow()` for cryptographically secure random numbers |
| **Password Reset Tokens** | `secrets.token_urlsafe(32)` with bcrypt hashing of the token itself |
| **OTP Expiry** | 10-minute TTL for email verification, 15-minute TTL for password resets |
| **One-Time Use** | All tokens are marked `is_used=True` after consumption |
| **Database SSL** | TLS encryption for all database connections |

### 12.5 Domain-Based Access Control

| Rule | Implementation |
|---|---|
| **Seeker Registration** | Only `@gmail.com` email addresses accepted |
| **Employer Registration** | Personal email domains (Gmail, Yahoo, etc.) blocked |
| **Company Isolation** | Employers from different domains cannot access each other's data |
| **Job Ownership** | Only the company owner can directly edit jobs; others require OTP approval |

---

## 13. Testing Approach

### 13.1 Testing Framework

The project uses **Vitest** as the testing framework for the frontend, with:

- **@testing-library/react** for component testing
- **@testing-library/jest-dom** for DOM assertions
- **jsdom** as the browser environment
- **Test setup** in `src/test/setup.ts`

### 13.2 Testing Strategy

| Level | Approach |
|---|---|
| **Unit Tests** | Vitest for individual component and utility function testing |
| **API Contract Testing** | FastAPI's auto-generated OpenAPI spec ensures API contract compliance |
| **Schema Validation** | Pydantic V2 schemas serve as both runtime validation and contract documentation |
| **Manual Testing** | End-to-end testing via the Swagger UI at `/docs` for all backend endpoints |
| **Type Safety** | TypeScript strict mode on the frontend catches type errors at compile time |

### 13.3 Backend Testability

The backend architecture is designed for testability:
- All services accept `AsyncSession` via constructor injection, making them mockable
- No global state; all configuration is centralized in `Settings`
- Dependency injection via `Depends()` allows easy service substitution in tests

---

## 14. Challenges Faced & Solutions

### Challenge 1: Async SQLAlchemy Relationship Loading

**Problem:** SQLAlchemy in async mode does not support lazy-loading of relationships. Accessing `user.posts` without explicit loading causes `MissingGreenlet` errors.

**Solution:** Used `selectinload()` explicitly in every query that needs related data. Created consistent query patterns in service methods with all required eager-loading options.

### Challenge 2: Neon Serverless Connection Parameters

**Problem:** Neon PostgreSQL connection strings include `sslmode=require` and `channel_binding=require` parameters that `asyncpg` does not support.

**Solution:** Implemented a `_clean_url_for_asyncpg()` function that strips unsupported query parameters and instead passes `ssl=True` via `connect_args`. This approach maintains SSL security while being compatible with the async driver.

### Challenge 3: AI Response Reliability

**Problem:** Free-form AI responses are unpredictable and difficult to parse reliably.

**Solution:** Leveraged Gemini's structured output feature with Pydantic JSON Schema injection. Every AI call specifies `response_mime_type="application/json"` and `response_json_schema` from Pydantic models, ensuring deterministic, type-safe AI responses.

### Challenge 4: Multi-Tenant Company Architecture

**Problem:** Multiple employees from the same company should share a single company dashboard, but each has their own user account.

**Solution:** Implemented email-domain-based company identity. All users with the same company email domain (e.g., `@tcs.com`) are grouped together. The first employee to create a profile becomes the "company admin," and all subsequent employees share the company's jobs and dashboard via domain matching.

### Challenge 5: Concurrent Token Refresh

**Problem:** When multiple API calls fail with 401 simultaneously, each triggers a token refresh, causing race conditions and redundant refresh requests.

**Solution:** Implemented a request queue in the Axios interceptor. When a refresh is in-progress (`isRefreshing=true`), subsequent 401 responses add their retry promises to a `failedQueue`. Once the refresh completes, all queued requests are retried with the new token.

### Challenge 6: Windows Unicode Encoding

**Problem:** Emoji characters in log messages (e.g., rocket emoji for "starting") fail with `UnicodeEncodeError` on Windows systems using `cp1252` encoding.

**Solution:** Removed emoji characters from log messages and replaced them with plain text to ensure cross-platform compatibility.

---

## 15. Future Enhancements

### Short-Term (Next Quarter)

1. **WebSocket Real-Time Messaging** — Replace polling with WebSocket connections for instant message delivery
2. **Resume Builder** — In-app resume template editor with PDF export
3. **Advanced Search with Elasticsearch** — Full-text search with relevance scoring across all entities
4. **Push Notifications** — Browser push notifications via Service Workers
5. **Two-Factor Authentication (2FA)** — TOTP-based 2FA for enhanced account security

### Medium-Term (6 Months)

6. **Video Interviews** — Integrated video call functionality for virtual interviews
7. **Skill Assessment Tests** — Built-in coding challenges and aptitude tests
8. **Analytics Dashboard for Seekers** — Profile view trends, application success rates, skill demand analysis
9. **Company Reviews** — Glassdoor-style anonymous company reviews
10. **Multi-Language Support** — i18n for Hindi, Spanish, French, and more

### Long-Term (12 Months)

11. **AI Interview Preparation** — AI-powered mock interviews with feedback
12. **Recommendation Engine V2** — Collaborative filtering based on user behavior patterns
13. **Mobile Application** — React Native cross-platform mobile app
14. **Salary Insights** — Market salary data aggregation and comparison tools
15. **Premium Tier** — Monetization with premium features (unlimited AI reviews, priority visibility)

---

## 16. Conclusion

Career Canvas (JobNest) is a comprehensive, production-grade career networking and job matching platform that successfully addresses the fragmentation in the modern job market. By combining professional social networking with AI-powered career tools, the platform delivers significant value to all three user segments:

**For Job Seekers:** An intelligent assistant that parses resumes, matches skills to jobs, provides actionable feedback, and connects them with relevant opportunities — all within a modern, intuitive interface.

**For Employers:** A streamlined hiring pipeline with AI-generated job descriptions, automated applicant matching, and collaborative job management through domain-based company identity.

**For Administrators:** A centralized moderation and analytics platform for maintaining community health and monitoring platform growth.

The project demonstrates mastery of:
- **Full-Stack Development** with React/TypeScript frontend and FastAPI/Python backend
- **AI Integration** using Google Gemini with structured output schemas
- **Database Design** with 20+ relational tables, async operations, and migration management
- **Security Engineering** with JWT auth, OTP verification, RBAC, and rate limiting
- **Modern Architecture** with Service-Layer pattern, dependency injection, and event-driven coordination

The platform is built on a solid foundation that supports immediate deployment while providing clear paths for future enhancement including real-time communication, mobile applications, and advanced AI capabilities.

---

*This report is confidential and prepared for Tata Consultancy Services (TCS) review purposes.*
*© 2026 Career Canvas Team. All rights reserved.*
