
# Random Journal

# Project Name

Random Journal is a journaling app that connects users through shared experiences. Write a journal entry to receive one from another user.


## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js
- Yarn
- PostgreSQL

## Setting Up

To set up the project, follow these steps:

### Clone the repository

```bash
git@github.com:oscar-mugambi/RandomJournalShare.git
cd RandomJournalShare
```

### Install dependencies in both client and server directories

```bash
yarn install
```

### Set up the PostgreSQL Database

1. Install PostgreSQL on your machine.
2. Create a database for the project. The DB schema is inside of the server directory.
3. Use the `.env.example` file in the project root to create a `.env` file and update it with your database credentials.

### Running the project

To run both the frontend (React) and backend (Node.js) in development mode, execute:

```bash
yarn run dev
```

This command concurrently starts both the React development server and the Node.js backend server.

### Building the project

To build both the frontend and backend for production, run:

```bash
yarn run build
```

This command builds the React application to the `dist` folder and compiles the Node.js innto a `dist` file as well

## Using the Application

After starting the application with `yarn run dev`, visit `http://localhost:XXXX` in your browser to view the React application and interact with the backend server.
