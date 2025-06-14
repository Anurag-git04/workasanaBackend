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


---

## 🧪 Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **bcryptjs** for password hashing
- **jsonwebtoken** for JWT-based authentication
- **dotenv** for environment config
- **cors** for enabling frontend-backend connection

---

## 🔧 Installation

### Prerequisites
- Node.js (v14+)
- MongoDB instance (local or cloud)

### Steps

```bash
# Clone the repository
git clone https://github.com/Anurag-git04/workasanaBackend.git

# Navigate into the folder
cd workasanaBackend

# Install dependencies
npm install

# Create .env file
touch .env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5080
npm start
http://localhost:5080
```
## 📡 API Endpoints

### 🔐 Authentication

| Method | Endpoint   | Description            |
|--------|------------|------------------------|
| POST   | `/signup`  | Register a new user    |
| POST   | `/login`   | Login with credentials |

### 📁 Project

| Method | Endpoint   | Description         |
|--------|------------|---------------------|
| GET    | `/project` | Get all projects     |
| POST   | `/project` | Add new project      |

### 👥 Team

| Method | Endpoint   | Description          |
|--------|------------|----------------------|
| GET    | `/teams`   | Get all teams        |
| POST   | `/teams`   | Create a new team    |

### ✅ Task

| Method | Endpoint           | Description          |
|--------|--------------------|----------------------|
| POST   | `/task`            | Create a new task    |
| GET    | `/tasks`           | Get all tasks        |
| GET    | `/tasksbyid/:id`   | Get task by ID       |
| PUT    | `/tasks/:id`       | Update task by ID    |
| DELETE | `/tasks/:id`       | Delete task by ID    |
### 🌐 Deployment Link : https://workasana-backend-ecru.vercel.app/tasks
### Loom Video : 
https://drive.google.com/file/d/1H1by4NN4Nf3VECB9xf8kkYZPBpnuQ0FO/view?usp=sharing 
