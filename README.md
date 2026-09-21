# CashFlow 💸

A full-stack MERN web application for managing cash-to-digital transaction requests with user authentication, transaction tracking, and separate user/admin dashboards.

## 🚀 Overview

CashFlow is a web application designed to manage cash-to-digital transaction requests through a structured workflow.

Users can create and track requests, while administrators can manage requests and monitor transaction activity through a dedicated dashboard.

The application follows a client-server architecture with a React frontend and Node.js/Express backend connected to MongoDB.

## ✨ Features

### 👤 Authentication
- User registration and login
- Password hashing with bcrypt
- JWT-based authentication
- Protected routes

### 💰 Request Management
- Create transaction requests
- Track request status
- View request history
- Update request status

### 📊 Dashboards
- User dashboard
- Admin dashboard
- Transaction/request overview
- Status-based tracking

### 🔐 Backend
- REST API architecture
- Express.js routes and controllers
- MongoDB database
- Mongoose models
- Authentication middleware
- Environment-based configuration

## 🏗️ Project Structure

```text
cashflow-web/
│
├── client/
│   ├── public/
│   └── src/
│       ├── AdminDashboard.js
│       ├── Dashboard.js
│       ├── Login.js
│       ├── Signup.js
│       ├── SubmitRequest.js
│       ├── UserDashboard.js
│       └── ...
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── index.js
│   └── server.js
│
├── .gitignore
└── package-lock.json