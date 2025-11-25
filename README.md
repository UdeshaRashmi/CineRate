# CineRate - Movie Review Application

A full-stack movie review application with user authentication, movie management, and review capabilities.

## Features

- User authentication (registration, login, logout)
- Movie browsing and searching
- Movie rating and review system
- User profiles with review history
- Responsive design for all devices

## Technologies Used

### Frontend
- React.js
- React Router
- Tailwind CSS
- Axios
- Lucide React Icons

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- Bcrypt.js for password hashing
- Express Validator for input validation

## Project Structure

```
CineRate/
├── frontend/          # React frontend application
│   ├── public/        # Static assets
│   ├── src/           # Source code
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Page components
│   │   ├── services/   # API service functions
│   │   ├── contexts/   # React context providers
│   │   ├── hooks/      # Custom React hooks
│   │   └── ...
│   └── ...
├── backend/           # Node.js backend API
│   ├── controllers/   # Request handlers
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   ├── middleware/    # Custom middleware
│   ├── config/        # Configuration files
│   └── ...
└── README.md          # This file
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/cinerate
   JWT_SECRET=your_jwt_secret_here
   ```

4. Start the development server:
   ```
   npm run dev
   ```

### Database Setup

1. Make sure MongoDB is running on your system

2. Run the database setup script:
   ```
   npm run setup-db
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected route)

## Authentication Flow

1. Users can register for a new account or login with existing credentials
2. Upon successful authentication, a JWT token is returned and stored in localStorage
3. The token is used to authenticate subsequent requests to protected routes
4. Protected routes include:
   - Add Movie
   - Edit Movie
   - My Profile
   - My Reviews

## Development

### Running Tests

Backend tests can be run with:
```
cd backend
npm test
```

Frontend tests can be run with:
```
cd frontend
npm test
```

## Contributing

1. Fork the repository
2. Create a new branch for your feature
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License.