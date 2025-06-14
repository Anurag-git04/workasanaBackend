# 🛠️ Workasana Backend

Workasana is a project and task management system built using **Node.js**, **Express.js**, and **MongoDB**. This backend handles core functionality for managing users, projects, teams, tasks, and reporting features used in the Workasana web application.

---

## 🚀 Features

- 👤 User Authentication (Signup, Login)
- 🗂️ Project Management (Add, Get)
- 👥 Team Management (Add, Get)
- ✅ Task Management (CRUD, Assign Owners, Tags)
- 📊 Report Generation (Task status-wise breakdown)
- 📎 API endpoints for fetching related resources (Projects, Teams, Owners)

---

## 📁 Folder Structure

<pre>
  workasanaBackend/
├── db/ # MongoDB connection
│ └── db.connect.js
├── models/ # Mongoose schemas
│ ├── project.model.js
│ ├── team.model.js
│ ├── task.model.js
│ └── user.model.js
├── .env # Environment variables
├── index.js # Entry point for Express server
└── package.json # Project metadata and dependencies
</pre>
