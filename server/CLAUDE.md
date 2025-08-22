# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### MongoDB Database
- `brew services start mongodb/brew/mongodb-community` - Start MongoDB service
- `brew services stop mongodb/brew/mongodb-community` - Stop MongoDB service
- `brew services restart mongodb/brew/mongodb-community` - Restart MongoDB service
- `mongosh` - Connect to MongoDB shell (optional, for database inspection)

### Server (Backend)
- `npm run dev` - Start development server with nodemon (runs on port 3001)
- `npm run debug` - Start server with debugging enabled
- `npm test` - Run test suite using Mocha (with 30s timeout)
- `npm run auth` - Start auth routes with nodemon

### Client (Frontend)
Navigate to `../client` directory:
- `npm start` - Start React development server (runs on port 3000)
- `npm test` - Run React tests in interactive watch mode
- `npm run build` - Build React app for production

### Development Workflow
1. Start MongoDB: `brew services start mongodb/brew/mongodb-community`
2. Start backend: `npm run dev` (from server directory)
3. Start frontend: `npm start` (from client directory)

## Architecture Overview

This is a full-stack Kanban board application with a Node.js/Express backend and React frontend.

### Backend Architecture
- **Framework**: Express.js with MongoDB (Mongoose ODM)
- **Authentication**: JWT tokens with bcrypt password hashing
- **File Uploads**: AWS S3 integration for attachments
- **Email Service**: Twilio SendGrid for user notifications
- **Database**: MongoDB with local connection (dev-kanban database on localhost:27017)

### API Structure
The server follows RESTful API patterns with versioned endpoints under `/api/v1/`:
- `/api/v1/auth` - Authentication (login, register, password reset)
- `/api/v1/user` - User management
- `/api/v1/boards` - Board operations and initialization data
- `/api/v1/columns` - Column CRUD operations
- `/api/v1/cards` - Card CRUD operations with file uploads

### Data Models
- **Board**: Contains title, columns array (refs), owner (user ref), createAt timestamp
- **Column**: References cards and belongs to boards
- **Card**: Task items with descriptions, deadlines, attachments
- **User**: Authentication and profile data

### Key Middleware
- `authorization.js` - JWT token validation
- `database.js` - MongoDB connection management
- `S3.js` - AWS S3 file upload handling
- `asyncHandler.js` - Async error handling wrapper

### Environment Setup
Required environment variables (see `.env.example`):
- `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET` for JWT
- `SENDGRID_API_KEY` and `FROM_EMAIL` for email notifications
- MongoDB runs locally without authentication in development

### Frontend Integration
- Client proxy configured to `http://localhost:3001` for API requests
- Authentication state managed by React Context in client
- File uploads handled through express-fileupload middleware

### Testing
- Test framework: Mocha with Chai and Chai-HTTP
- Tests located in `test/` directory
- Run with `NODE_ENV=test` to avoid conflicts with development data