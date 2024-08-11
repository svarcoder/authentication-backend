# Authentication Backend

## Overview

This document serves as the README for the Authentication Backend. It provides detailed information on how to set up, configure, and run the backend server, including a description of its structure, dependencies, environment variables, and usage instructions.

## Table of Contents

1. [Introduction](#introduction)
2. [Technologies Used](#technologies-used)
3. [Requirements](#requirements)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Running the Server](#running-the-server)
7. [Directory Structure](#directory-structure)

## Introduction

The Authentication Backend is a RESTful API server designed to manage administrative tasks for the corresponding front-end application. This server handles data management operations.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database.
- **Mongoose**: MongoDB object modeling tool.
- **TypeScript**: Typescript for data types.
- **dotenv**: For managing environment variables.

## Requirements

- Node.js (version 14 or higher)
- npm (Node package manager)
- MongoDB (local or remote instance)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/svarcoder/authentication-backend.git
   cd authentication-backend
   ```

2. **Install dependencies:**

   ```bash
   yarn
   ```

## Configuration

1. **Environment Variables:**

   Create a `.env` file in the root directory and add the following environment variables:

   ```plaintext
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=secret
   EMAIL_USER=your_email
   EMAIL_PASSWORD=email_password
   ```

## Running the Server

1. **Start the development server:**

   ```bash
   yarn run dev
   ```

   This will start the server on the port specified in the `.env` file (default is 5000).

## Directory Structure

```plaintext
skinyou-backend/
├── src/
|   ├── config/
|   ├── controllers/
|   ├── middlewares.ts/
|   ├── models/
|   ├── routes/
|   ├── app.ts/
|   ├── server.ts/
|   ├── utils.ts/
├── .env
├── .gitignore
├── package.json
└── README.md
```
