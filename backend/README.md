# CineRate Backend

This is the backend API for the CineRate movie review application.

## Features

- User authentication (registration, login)
- JWT token-based authentication
- MongoDB database integration
- RESTful API design

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- Bcrypt.js for password hashing
- Express Validator for input validation

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected route)

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file with the following variables:
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/cinerate
   JWT_SECRET=your_jwt_secret_here
   ```

3. Run the server:
   ```
   npm run dev
   ```

## Folder Structure

```
backend/
├── config/
│   └── db.js          # Database configuration
├── controllers/
│   └── authController.js  # Authentication controller
├── middleware/
│   └── auth.js        # Authentication middleware
├── models/
│   └── User.js        # User model
├── routes/
│   └── auth.js        # Authentication routes
├── .env               # Environment variables
├── server.js          # Main server file
└── package.json       # Project dependencies
```