# 🔗 URL Shortener

A full-stack URL shortening service built with **Spring Boot**, **Spring Security**, **JWT authentication**, and a **React** frontend. Users can register, log in, shorten URLs, track click analytics, and manage their links — all secured behind role-based access control.

---

## ✨ Features

### Backend
- 🔐 **JWT Authentication** — stateless login with signed tokens, no server-side sessions
- 👤 **Role-based Access Control** — protected endpoints via `@PreAuthorize("hasRole('USER')")`
- 🔗 **URL Shortening** — generates unique short codes for any long URL
- ↩️ **HTTP 302 Redirect** — proper redirect semantics with `Location` header
- 📊 **Click Analytics** — per-URL click event tracking with date-range filtering
- 📅 **Daily Click Totals** — aggregated daily clicks across all user URLs

### Frontend
- 🛡️ **Protected Routes** — unauthenticated users are automatically redirected to login
- 🌐 **Context API** — global auth state (JWT token + user info) shared across all components via `useContext`
- 🧾 **Dashboard Page** — view and manage all shortened URLs in one place
- 📈 **Analytics Page** — visualise click data with date-range filtering
- 🔑 **Login & Register Pages** — complete auth flow with form handling and error states
- ⚛️ **React Hooks** — `useState` and `useEffect` throughout for local state and API calls

---

## 🛠️ Tech Stack

### Backend
| Layer | Technology |
|---|---|
| Language | Java 8 |
| Framework | Spring Boot, Spring MVC |
| Security | Spring Security, JWT |
| ORM | Hibernate / JPA |
| Database | MySQL |
| Utilities | Lombok |
| Build Tool | Maven |

### Frontend
| Layer | Technology |
|---|---|
| Framework | React.js |
| Routing | React Router (with Protected Routes) |
| State Management | Context API + useContext |
| Local State | useState, useEffect hooks |
| HTTP Client | Axios |

---

## 📁 Project Structure

```
Url-shorter/
├── URL-Shoter-SB/                  # Spring Boot backend
│   └── src/main/
│       ├── java/com/url/shorter/
│       │   ├── controller/
│       │   │   ├── AuthController.java        # /api/auth endpoints
│       │   │   ├── UrlMappingController.java  # /api/urls endpoints
│       │   │   └── RedirectController.java    # /{shortUrl} redirect
│       │   ├── models/                        # JPA entities (User, UrlMapping, ClickEvent)
│       │   ├── dtos/                          # Request/Response DTOs
│       │   ├── service/                       # Business logic layer
│       │   └── repository/                    # Spring Data JPA repositories
│       └── resources/
│           └── application.properties
└── URL-Shorter-React/              # React frontend
    └── src/
        ├── context/
        │   └── AuthContext.js      # Global auth state via Context API
        ├── components/
        │   └── ProtectedRoute.js   # Redirects to login if no token in context
        └── pages/
            ├── Login.js            # Login page
            ├── Register.js         # Register page
            ├── Dashboard.js        # URL management dashboard
            └── Analytics.js        # Click analytics with date-range filtering
```

---

## 🔌 API Endpoints

### Auth — `/api/auth`
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/public/register` | Public | Register a new user |
| POST | `/api/auth/public/login` | Public | Login and receive JWT token |

### URL Management — `/api/urls`
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/urls/shorten` | 🔒 USER | Shorten a long URL |
| GET | `/api/urls/myurls` | 🔒 USER | Get all URLs for logged-in user |
| GET | `/api/urls/analytics/{shortUrl}` | 🔒 USER | Get click events for a URL (date range) |
| GET | `/api/urls/totalClicks` | 🔒 USER | Get daily click totals (date range) |

### Redirect
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/{shortUrl}` | Public | Redirect to original URL (HTTP 302) |

---

## 🔐 Authentication Flow

```
POST /api/auth/public/register   →   User created with hashed password
POST /api/auth/public/login      →   Returns signed JWT token
All /api/urls/** requests        →   Require Authorization: Bearer <token>
@PreAuthorize("hasRole('USER')")  →   Role validated on every protected route
```

---

## 🖥️ Frontend Flow

```
User visits /dashboard or /analytics
        │
        ▼
ProtectedRoute checks AuthContext for JWT token
        │
   ┌────┴────────────────────┐
   │ No token                │ Token exists
   ▼                         ▼
Redirect to /login      Render the page
        │                    │
        ▼                    ▼
User logs in         Axios sends request with
        │            Authorization: Bearer <token>
        ▼                    │
Token stored in              ▼
AuthContext            Spring Boot validates
        │              JWT + role → returns data
        ▼
Redirect to /dashboard
```

---

## 🚀 Getting Started

### Prerequisites
- Java 8+
- Maven 3.6+
- MySQL 8+
- Node.js 16+ & npm

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/githubSivaji/Url-shorter.git
   cd Url-shorter/URL-Shoter-SB
   ```

2. **Configure the database**

   Create a MySQL database:
   ```sql
   CREATE DATABASE url_shortener;
   ```

   Update `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/url_shortener
   spring.datasource.username=your_mysql_username
   spring.datasource.password=your_mysql_password
   spring.jpa.hibernate.ddl-auto=update

   app.jwt.secret=your_jwt_secret_key
   app.jwt.expiration=86400000
   ```

3. **Run the backend**
   ```bash
   mvn spring-boot:run
   ```
   Backend starts at `http://localhost:8080`

### Frontend Setup

```bash
cd ../URL-Shorter-React
npm install
npm start
```
Frontend starts at `http://localhost:3000`

---

## 📊 Analytics Usage

**Get click events for a specific short URL:**
```
GET /api/urls/analytics/{shortUrl}?startDate=2024-01-01T00:00:00&endDate=2024-12-31T23:59:59
Authorization: Bearer <your_jwt_token>
```

**Get daily click totals across all your URLs:**
```
GET /api/urls/totalClicks?startDate=2024-01-01&endDate=2024-12-31
Authorization: Bearer <your_jwt_token>
```

---

## 🗺️ Architecture

```
React Frontend (Port 3000)
        │
        │  HTTP + JWT in Authorization header
        ▼
Spring Boot Backend (Port 8080)
        │
   ┌────┴────────────────────┐
   │                         │
AuthController         UrlMappingController
   │                         │
   └────────┬────────────────┘
            │
       Service Layer
            │
    Repository (JPA)
            │
         MySQL DB
```

---

## 🔮 Planned Improvements

- [ ] **Redis caching** on `/{shortUrl}` redirect — eliminate repeated DB reads for high-traffic links
- [ ] **Custom aliases** — let users choose their own short code
- [ ] **URL expiry** — set TTL on short links
- [ ] **QR code generation** per short URL
- [ ] **Swagger/OpenAPI docs** for the REST API

---

## 👨‍💻 Author

**Devarakonda Venkata Sivaji**
- GitHub: [@githubSivaji](https://github.com/githubSivaji)
- LinkedIn: [linkedin.com/in/devarakonda-venkata-sivaji](https://linkedin.com/in/devarakonda-venkata-sivaji)
