# Courses Frontend (React)

A simple React frontend for your Spring Boot backend (no auth, no users).

## Backend endpoints used
- GET  http://localhost:8080/courses/allCourses
- POST http://localhost:8080/courses/
- GET  http://localhost:8080/courses/{courseId}
- PUT  http://localhost:8080/courses/{courseId}
- DELETE http://localhost:8080/courses/{courseId}

## Course schema assumed
- courseId: Integer
- courseName: String
- courseDescription: String
- tags: String
- duration: Integer
- listedOn: LocalDate (YYYY-MM-DD)
- price: Double

## Run
```bash
npm install
npm run dev
```

Vite runs on http://localhost:5173

## CORS
Allow http://localhost:5173 in your backend (Spring Boot).
