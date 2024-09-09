# Todo Task Manager

A simple backend project for managing tasks using Node.js, Express, EJS as a template engine, and Tailwind CSS for styling. Each task is saved as a file, with functionality to create, edit, and read task files.

## Features

- **Add Task**: Create a new task by providing a title and details.
- **Save Task**: Each task is saved as a text file in the `/files` folder, with the filename corresponding to the task title (e.g., `work.txt`).
- **Edit Task**: Change the title and details of any existing task.
- **Read Task**: View the content of any saved task.

## Technologies Used

- **Backend**: Node.js, Express
- **Frontend**: EJS, Tailwind CSS
- **File System**: Node.js `fs` module to read and write task files
- **Template Engine**: EJS for rendering dynamic views

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ahmadawais666/todo-task-manager.git
   ```
   cd todo-task-manager
   npm install
   USAGE
   npm start
   Project structure

/files # Directory where task files are saved
/views # EJS views for the frontend
/public # Static files like CSS (Tailwind)
app.js # Main Express application file
package.json # Project configuration and dependencies
