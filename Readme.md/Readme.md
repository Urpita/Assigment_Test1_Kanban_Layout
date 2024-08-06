# Task Management App

This project is a Task Management application built using React for the frontend and Express.js with MongoDB for the backend. It includes functionalities for adding, deleting, searching, and managing tasks across different statuses. The app also incorporates drag-and-drop functionality to move tasks between statuses.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [License](#license)

## Prerequisites

Ensure you have the following installed on your system:

- Node.js
- npm (Node Package Manager)
- MongoDB

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/your-project.git
    cd ASSIGMENT_TEST
    ```

2. Install the backend dependencies:

    ```bash
    npm install
    ```

3. Navigate to the `client` directory and install the frontend dependencies:

    ```bash
    cd client
    npm install
    ```

## Environment Variables

Create a `.env` file in the root directory of the project and add the following environment variables:

    ```env
   MONGODB_URI=mongodb+srv://dasurpita:o576UekaYibNZugC@cluster0.tdzaobp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

    ```


## Running the Application

1. Start the backend server:

    ```bash
    node server.js
    ```

    This command will start the server .

2. Start the frontend development server:

    ```bash
    cd client
    npm run dev
    ```

    The frontend server will run on `http://localhost:3000` and will automatically open in your default web browser.

## Project Structure

    your-project/
    │
    ├── .env
    ├── db.js
    ├── server.js
    ├── models/
    │   └── Task.js
    ├── routes/
    │   └── tasks.js
    ├── client/
    │   ├── public/
    │   └── src/
    │       ├── App.jsx
    │       ├── App.css
    │       ├── Components/
    │       │   ├── Done/Done.jsx
    │       │   ├── Inprogress/Inprogress.jsx
    │       │   ├── PeerReview/PeerReview.jsx
    │       │   ├── Searchbar/Search.jsx
    │       │   ├── ToDo/Todo.jsx
    │       │   └── TaskItem/TaskItem.jsx
    │       ├── Constants/
    │       │   └── ItemTypes.js
    │       └── index.js
    └── package.json

## Backend Setup

### 1. Database Connection (db.js)

This file establishes a connection to the MongoDB database.

```js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
