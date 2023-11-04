
## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Configuration](#configuration)
- [Usage](#usage)
- [Authentication](#authentication)

## Project Overview

This To-Do App is a web application built with a tech stack that includes ReactJS for the frontend, Express for the backend, and MongoDB as the database. The purpose of this application is to provide users with a platform to manage their tasks and to-do lists effectively. It is designed to help users keep track of their tasks, set deadlines, mark completed tasks, and organize their work or personal schedules efficiently.



## Technologies Used

- Frontend:
  - ReactJS
  - Vite

- Backend:
  - Node.js
  - Express
  - MongoDB

- Authentication:
  - JSON Web Tokens (JWT)


### Installation

1. Clone the repository to your local machine.

2. Navigate to the project's root directory.

3. Install dependencies for both the frontend and backend:

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
npm install
```

## Configuration

Before running the project, you need to set up your environment variables. Create a `.env` file in the backend directory and add the following variables:

```dotenv
# MongoDB connection URL
username: <mongoatlas_username>
password: <mongoatlas_password>

# JWT Secret key for authentication
JWT_SECRET= <yourSecretKey>
```

Replace `username`, `password`, and `yourSecretKey` with your MongoDB credentials and a secret key for JWT.

## Usage

To run the project on your local machine, follow these steps:

1. Start the backend server. Open a terminal in the `backend` directory and run:

```bash
npm start
```

2. Start the frontend development server. Open a terminal in the `frontend` directory and run:

```bash
npm run dev
```

 Application should now be accessible at `http://localhost:5173`.

## Authentication

Explain how the authentication using JWT works in your project. For example:

- To access protected routes, include a valid JWT token in the `Authorization` header of your HTTP requests.
