# Service Request Board - Backend

This directory contains the backend server for the Service Request Board application. It is built with Node.js, Express, and MongoDB.

## Features

- REST API for managing job requests
- JWT-based authentication for users (Register/Login)
- Protected endpoints for creating and deleting jobs
- Unit tests with Jest and Supertest

---

## Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (or a MongoDB Atlas account)

### 2. Setup Instructions

1.  **Clone the repository and navigate to the backend directory:**
    ```sh
    git clone https://github.com/your-username/service-request-board.git
    cd service-request-board/backend
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env` in this directory and add the following variables.

    ```env
    # The port the server will run on
    PORT=5000

    # Your MongoDB connection string.
    # For local development, the following URL is typically used.
    # For production, replace this with your cloud database (e.g., MongoDB Atlas) connection string.
    MONGODB_URI=mongodb://127.0.0.1:27017/service-request-board

    # A strong, secret key for signing JSON Web Tokens (JWT)
    JWT_SECRET=your_super_secret_jwt_key_that_is_at_least_32_characters_long
    ```

---

## Available Scripts

### `npm run dev`

Runs the app in development mode using `nodemon`, which automatically restarts the server on file changes.

### `npm start`

Runs the app in production mode.

### `npm run seed`

Populates the database with 5-10 sample job requests. This script will first delete all existing jobs before inserting the new ones.

### `npm run test`

Runs the complete unit test suite using Jest. Tests are run against an in-memory MongoDB database to avoid affecting your development data.
