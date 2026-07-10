# Social Frontend

Frontend часть социальной платформы с realtime-мессенджером.

Приложение построено на Next.js с использованием feature-based архитектуры, современного React state management и WebSocket-коммуникации.

Основные возможности:

* социальная лента
* профили пользователей
* посты и комментарии
* realtime чат
* уведомления
* поиск
* управление аккаунтом

---

# Tech Stack

## Core

* **Next.js 15**
* **React 19**
* **TypeScript**

## State Management

* **TanStack Query**
* **Redux Toolkit**

## UI

* Tailwind CSS
* Radix UI
* Class Variance Authority
* Framer Motion
* Lucide Icons

## Forms & Validation

* React Hook Form
* Zod

## Realtime

* Socket.IO Client

## Rich Content

* TipTap Editor

---

# Features

## Authentication

Implemented:

* Registration
* Login
* Email verification
* Password recovery
* Magic link authentication
* Session handling

---

# Social Network

## Feed

Features:

* Posts feed
* Post creation
* Post editing
* Media support
* Visibility settings
* Infinite loading

## Comments

Implemented:

* Comments
* Nested replies
* Comment interactions
* Likes

## Profiles

Features:

* User profiles
* Profile editing
* Avatar management
* Followers/following
* Online status

## Search

Implemented:

* Global search
* User search
* Search suggestions

---

# Realtime Messenger

The application includes a fully realtime chat interface.

Features:

* Direct chats
* Group chats
* Instant messages
* Message editing
* Message deletion
* Replies
* Attachments
* Read states
* Unread counters
* Realtime chat list updates

Realtime communication is handled through Socket.IO.

Example flow:

```text
Backend Event

      ↓

WebSocket Gateway

      ↓

Socket.IO Client

      ↓

React State Update

      ↓

UI Update
```

---

# Architecture

The project follows a feature-oriented architecture.

Structure:

```text
src/

├── app/
│
├── features/
│   ├── auth
│   ├── chats
│   ├── messages
│   ├── feed
│   ├── post
│   ├── comments
│   ├── profile
│   ├── notifications
│   ├── search
│   └── websocket
│
└── shared/
    ├── api
    ├── components
    ├── hooks
    ├── lib
    ├── store
    └── types
```

---

# State Management

## Server State

TanStack Query is used for:

* API requests
* caching
* pagination
* optimistic updates
* synchronization with backend

Example:

```text
API Request

   ↓

React Query Cache

   ↓

Components
```

---

## Client State

Redux Toolkit manages:

* application state
* UI state
* global client data

---

# Infinite Data Handling

The application uses infinite queries for large datasets:

* chat lists
* feeds
* search results
* comments

Data is loaded incrementally and updated through realtime events.

---

# UI System

The interface uses reusable components built around Radix UI primitives.

Implemented:

* dialogs
* dropdowns
* context menus
* tooltips
* tabs
* forms
* interactive elements

Animations are handled with Framer Motion.

---

# Rich Text Editor

Posts and messages support rich content through TipTap.

Implemented:

* text formatting
* links
* placeholders
* controlled editor state

---

# File Handling

The frontend supports:

* image uploads
* message attachments
* media previews

Files are uploaded to backend storage services.

---

# Development

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Create production build:

```bash
npm run build
```

Run production server:

```bash
npm run start
```

---

# Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_WS_URL=
```

---

# Related Repository

Backend:

```
https://github.com/Allaros/social-backend
```

---

# Project Goals

The project was built with focus on:

* scalable frontend architecture
* realtime user experience
* maintainable feature separation
* modern React patterns
* production-oriented state management

The result is a full-stack social platform combining social networking features and realtime messaging.
