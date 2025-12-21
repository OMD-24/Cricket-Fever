# 🏏 CricketFever: Full-Stack Scouting & Community Platform

**CricketFever** is a modern, high-performance web application designed for cricket enthusiasts and scouts. It bridges the gap between real-time match data and community interaction, allowing users to "broadcast" match updates, scout players by jersey numbers, and manage their own professional cricket profiles.

---

## 🚀 Technical Highlights

* **Full-Stack Integration:** Built with a decoupled architecture using **Spring Boot (Java)** for the backend and **React** for the frontend.
* **Data Persistence:** Implements **Spring Data JPA** with a **PostgreSQL** database to manage persistent user profiles and community interactions.
* **Real-time Interaction:** Features a "Pitch" feed with live "Cheers" (likes) and global broadcast capabilities via RESTful APIs.
* **Professional UI:** Designed with a "Neo-Brutalist" aesthetic using **Tailwind CSS**, featuring responsive layouts and dynamic themes.

---

## 🛠️ The Tech Stack

### **Backend (The Engine)**

* **Framework:** Spring Boot
* **Database:** PostgreSQL
* **ORM:** Spring Data JPA
* **Architecture:** Layered Pattern (Controller -> Service -> Repository -> Entity)

### **Frontend (The Stadium)**

* **Library:** React
* **Routing:** React Router v6
* **State Management:** React Context API (for global player session)
* **Styling:** Tailwind CSS

---

## 🌟 Key Features

### 🔐 1. Authentication & Persistence

Users can "Enter the Draft" by registering or logging in. The system utilizes **Local Storage** to persist sessions, ensuring that your profile data (Jersey No, Team Color, Role) is fetched from the database immediately upon refresh.

### 🏟️ 2. The Pitch (Community)

A real-time broadcast system where players can share match updates. The backend handles data sanitization and manages a "Cheers" system to track community engagement.

### 🔍 3. Scouting Department

A debounced search system that allows scouts to find players by their unique Jersey Number. It provides a "Quick Scout" experience by navigating directly to detailed player profiles.

### 🧥 4. The Locker Room (Profile Customization)

A dynamic profile editor where users can update their "Gear." Changes to Jersey Number, Role, and Team Color are synced instantly to the PostgreSQL database and reflected globally across the UI.

---

## 🏗️ Getting Started

### Prerequisites

* JDK 17 or higher
* Node.js & npm
* PostgreSQL

### Installation

1. **Clone the Repository:**
```bash
git clone https://github.com/your-username/cricket-fever.git

```


2. **Backend Setup:**
* Update `src/main/resources/application.properties` with your PostgreSQL credentials.
* Run the application using Maven or your IDE.


3. **Frontend Setup:**
```bash
cd frontend
npm install
npm run dev

```



---

## 📈 Future Enhancements

* **Live Score API Integration:** Connecting `MatchService` to external providers for real-time international scores.
* **Spring Security:** Implementing BCrypt password hashing and JWT for enterprise-grade security.
* **Follow System:** Enabling users to follow specific players and build a custom feed.

---

