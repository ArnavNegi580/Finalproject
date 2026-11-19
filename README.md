
# BlogSpace - Full Stack Blog Application

A modern and responsive blogging platform built using
the MERN Stack (MongoDB, Express.js, React.js, Node.js).

## Features

- User Registration and Login
- JWT Authentication
- Secure Password Hashing
- Protected Dashboard
- Create Blog Posts
- Read All Blog Posts
- Update Existing Blogs
- Delete Blog Posts
- Personal User Dashboard
- Responsive Mobile-Friendly Design
- User Profile API
- Logout Functionality

## Technologies Used

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3
- React Router DOM
- Axios
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

## Project Structure

blog-application/
- client/
- server/
- README.md
- .gitignore

## Installation

### 1. Clone Repository

git clone YOUR_GITHUB_REPOSITORY_URL

cd blog-application

### 2. Backend Setup

cd server

npm install

Create a .env file.

Add:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173

Start backend:

npm run dev

### 3. Frontend Setup

Open another terminal.

cd client

npm install

Create a .env file.

Add:

VITE_API_URL=http://localhost:5000

Start frontend:

npm run dev

## Application URLs

Frontend:
http://localhost:5173

Backend:
http://localhost:5000

## API Endpoints

Authentication:
POST /api/auth/register
POST /api/auth/login
GET /api/auth/profile

Blogs:
GET /api/blogs
GET /api/blogs/my
GET /api/blogs/:id
POST /api/blogs
PUT /api/blogs/:id
DELETE /api/blogs/:id

## Database

MongoDB Atlas is used to store
user information and blog posts.

## Deployment

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

## Developer

Arnav Negi

Full Stack Developer

## License

This project is created for educational purposes.
