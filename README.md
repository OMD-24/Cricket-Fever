# 🏏 CricketFever — Full-Stack Cricket Community Platform

> A production-style full-stack web application where cricket players broadcast match updates, scout other players by jersey number, and manage their professional profiles.

---

## 🚀 Live Demo

> Backend: `http://localhost:8080`  
> Frontend: `http://localhost:5173`  
---

## 📸 Project Overview

CricketFever is a full-stack cricket community platform built with a **decoupled architecture** — a Spring Boot REST backend and a React.js frontend communicating over JSON APIs.

The project demonstrates real-world backend engineering concepts: layered architecture, DTO pattern, centralized exception handling, BCrypt password encryption, request validation, and a mapper layer — all structured the way production Spring Boot applications are built.

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Java 21 | Core language |
| Spring Boot 3 | Application framework |
| Spring Security | Password encryption (BCrypt) |
| Spring Data JPA (Hibernate) | ORM & database access |
| PostgreSQL | Relational database |
| Jakarta Validation | Request validation (`@Valid`, `@NotBlank`, `@Email`) |
| Lombok | Boilerplate reduction |
| Maven | Build tool |

### Frontend
| Technology | Purpose |
|---|---|
| React.js | UI library |
| React Router v6 | Client-side routing |
| Context API | Global player session state |
| Tailwind CSS | Utility-first styling |
| Vite | Build tool & dev server |

---

## 🏗️ Backend Architecture

The backend follows a strict **Controller → Service → Repository → Entity** layered pattern with a dedicated **Mapper layer** for DTO conversion.

```
Request (JSON)
      │
      ▼
┌─────────────────┐
│   Controller    │  ← HTTP handling, @Valid, ApiResponse wrapping
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Service      │  ← Business logic, @Transactional, exception throwing
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│     Mapper      │  ← Entity ↔ DTO conversion (PlayerMapper, TweetMapper)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Repository    │  ← Spring Data JPA queries
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   PostgreSQL    │  ← Persistent storage
└─────────────────┘

GlobalExceptionHandler (@RestControllerAdvice)
  └── Catches all exceptions → returns standardized ApiResponse
```

---

## 🌟 Key Features

### 🔐 Authentication & Session Persistence
- Player registration with BCrypt password encryption
- Login with credential validation
- Frontend session persistence via `localStorage`
- Automatic profile restoration on page refresh

### 🏟️ The Pitch — Community Broadcast Feed
- Players post live match updates (280-character limit)
- Chronological feed sorted by `createdAt`
- **Cheer** system — like-style engagement tracking with integer counters
- Real-time optimistic UI update after broadcast

### 🔍 Scouting Department
- Debounced search (300ms) by jersey number
- Partial match search using `LIKE` query (`findByJerseyNoContainingIgnoreCase`)
- Direct navigation to player profiles from results

### 🧥 Locker Room — Profile Management
- Edit player name, jersey number, and team colour
- Changes persisted to PostgreSQL via `@Transactional` service method
- Global UI update via React Context API

---

## 📐 API Contract

All endpoints return a **standardised response wrapper**:

```json
{
  "success": true,
  "message": "Player fetched successfully",
  "data": { ... },
  "timestamp": "2026-03-27T10:00:00"
}
```

Error responses follow the **same structure**:

```json
{
  "success": false,
  "message": "Player not found with id: 999",
  "data": null,
  "timestamp": "2026-03-27T10:01:00"
}
```

---

## 📋 API Endpoints

### Players
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/players/register` | Register a new player |
| `POST` | `/api/players/login` | Login with email + password |
| `GET` | `/api/players/{id}` | Get player by ID |
| `POST` | `/api/players/update` | Update player profile |
| `GET` | `/api/players/search?q={jerseyNo}` | Search players by jersey number |

### Tweets (Broadcasts)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/tweets/broadcast` | Post a new broadcast |
| `GET` | `/api/tweets/all` | Fetch all broadcasts (latest first) |
| `PATCH` | `/api/tweets/{id}/cheer` | Increment cheer count |
| `DELETE` | `/api/tweets/{id}` | Delete a broadcast |

### Matches & News
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/matches/{filter}` | Get matches by filter (live/upcoming/recent) |
| `GET` | `/api/matches/standings` | Get team standings |
| `GET` | `/api/news/latest` | Get latest news articles |

---

## 🔧 Exception Handling

Centralized exception handling via `@RestControllerAdvice`:

| Exception | HTTP Status | Scenario |
|---|---|---|
| `PlayerNotFoundException` | 404 Not Found | Player ID doesn't exist |
| `TweetNotFoundException` | 404 Not Found | Tweet ID doesn't exist |
| `DuplicatePlayerException` | 400 Bad Request | Email already registered |
| `InvalidCredentialsException` | 401 Unauthorized | Wrong email or password |
| `MethodArgumentNotValidException` | 400 Bad Request | Validation failure (field-level errors) |
| `Exception` | 500 Internal Server Error | Unexpected server error |

---

## ⚙️ Getting Started

### Prerequisites
- JDK 21+
- Node.js 20+ & npm
- PostgreSQL 14+
- Maven 3.9+

### 1. Clone the Repository

```bash
git clone https://github.com/OMD-24/Cricket-Fever.git
cd Cricket-Fever
```

### 2. PostgreSQL Setup

```sql
CREATE DATABASE crickipedia_db;
```

### 3. Backend Setup

Update `cricket-backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/crickipedia_db
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

Run the backend:

```bash
cd cricket-backend
./mvnw spring-boot:run
```

Backend starts at: `http://localhost:8080`

### 4. Frontend Setup

```bash
cd cricket-frontend
npm install
npm run dev
```

Frontend starts at: `http://localhost:5173`

---

## 📁 Project Structure

```
Cricket-Fever/
├── cricket-backend/
│   └── src/main/java/com/cricket/fever/
│       ├── common/response/     # ApiResponse<T> wrapper
│       ├── config/              # SecurityConfig, WebConfig (CORS)
│       ├── controller/          # REST controllers
│       ├── dto/                 # Request & Response DTOs
│       ├── Entity/              # JPA entities
│       ├── exception/           # Custom exceptions + GlobalExceptionHandler
│       ├── mapper/              # Entity ↔ DTO mappers
│       ├── repository/          # Spring Data JPA repositories
│       └── service/             # Business logic layer
│
└── cricket-frontend/
    └── src/
        ├── components/
        │   ├── Layout/          # Navbar, ProfileDrawer, BottomNav
        │   └── Sections/        # CricketFeed, PostBoard, SearchFeed
        ├── context/             # PlayerContext (global auth state)
        └── pages/               # Auth, Home, Community, Matches, News, Profile
```

---

## 🎯 Key Engineering Decisions

**DTO Pattern** — Request and Response DTOs are separate from JPA entities. This prevents internal database structure from leaking through the API and allows both layers to evolve independently.

**Mapper Layer** — `PlayerMapper` and `TweetMapper` handle all entity↔DTO conversion, keeping service classes focused purely on business logic.

**BCrypt Password Encoding** — Passwords are hashed using `BCryptPasswordEncoder` before persistence. Plain-text comparison is never used.

**Centralized Exception Handling** — `@RestControllerAdvice` catches all exceptions globally. Controllers contain zero try-catch blocks. Every error — including validation failures — returns the same `ApiResponse` structure.

**`@Transactional` Service Methods** — All write operations use Spring's transaction management to ensure data integrity during profile updates and tweet operations.

**CORS inside Spring Security** — CORS is configured directly in the `SecurityFilterChain` (not just `WebMvcConfigurer`) so that Spring Security's filter passes CORS headers before any authentication check.

---

## 📈 Roadmap

- [ ] JWT Authentication (stateless token-based security)
- [ ] `ADMIN` role — protected delete endpoints with `@PreAuthorize`
- [ ] Pagination for broadcast feed (`Pageable`)
- [ ] Swagger / OpenAPI documentation
- [ ] Live score API integration
- [ ] Deploy to Railway (backend) + Vercel (frontend)

---

## 👨‍💻 Author

**OMD-24**  
[GitHub](https://github.com/OMD-24) ·

---

