# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Quick Start (Development)
1. Start MongoDB: `brew services start mongodb/brew/mongodb-community`
2. Start backend: `cd server && npm run dev` (runs on port 3001)
3. Start frontend: `cd client && npm start` (runs on port 3000)

### Server (Backend) Commands
- `npm run dev` - Start development server with nodemon
- `npm run debug` - Start server with debugging enabled  
- `npm test` - Run Mocha test suite with 30s timeout
- `npm run auth` - Start auth routes with nodemon

### Client (Frontend) Commands
- `npm start` - Start React development server
- `npm test` - Run React tests in interactive watch mode
- `npm run build` - Build React app for production

### Database Commands
- `brew services start mongodb/brew/mongodb-community` - Start MongoDB
- `brew services stop mongodb/brew/mongodb-community` - Stop MongoDB
- `mongosh` - Connect to MongoDB shell for inspection

## Architecture Overview

This is a full-stack Kanban board application with separate client and server directories.

### Project Structure
- **Frontend**: React app in `client/` directory using Create React App
- **Backend**: Express.js API in `server/` directory with MongoDB
- **Database**: MongoDB (local development on localhost:27017, database: dev-kanban)

### Frontend Architecture (client/)
- **State Management**: React Context + useReducer pattern (no Redux)
  - `AuthProvider` in `src/context/auth/` - Authentication state and user data
  - `DashboardProvider` in `src/context/dashboard/` - Boards, columns, cards data
- **UI Framework**: Material-UI (@mui/material) with custom theming
- **Drag & Drop**: @hello-pangea/dnd (replacement for react-beautiful-dnd)
- **Calendar**: FullCalendar integration for task deadline visualization
- **Routing**: React Router v6 with ProtectedRoute wrapper for authentication

### Backend Architecture (server/)
- **Framework**: Express.js with Mongoose ODM for MongoDB
- **Authentication**: JWT tokens with bcrypt password hashing
- **File Storage**: AWS S3 integration for task attachments
- **Email**: Twilio SendGrid for welcome emails and notifications
- **API Structure**: RESTful endpoints under `/api/v1/` namespace

### Key API Endpoints
- `/api/v1/auth/*` - Authentication (login, register, password reset)
- `/api/v1/user/*` - User profile management
- `/api/v1/boards/*` - Board operations and dashboard initialization
- `/api/v1/columns/*` - Column CRUD operations
- `/api/v1/cards/*` - Card CRUD with file upload support

### Data Models
- **Board**: Container for columns, owned by user
- **Column**: Contains ordered cards, belongs to board
- **Card**: Task items with title, description, deadline, color tags, attachments
- **User**: Authentication and profile data

### Environment Configuration
Server requires `.env` file with:
- `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET` for JWT
- `SENDGRID_API_KEY` and `FROM_EMAIL` for email service
- AWS credentials for S3 file uploads (optional in development)

### Development Notes
- Frontend proxies API requests to `http://localhost:3001` (configured in client/package.json)
- Authentication persisted in localStorage and managed by AuthProvider
- Initial dashboard data fetched from `/api/v1/boards/init` endpoint
- Test environment uses `NODE_ENV=test` to avoid development data conflicts