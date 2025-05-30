# 🚀 Request Management Server

A lightweight and efficient Node.js + Express backend API for handling user support requests. Built with TypeScript, Sequelize ORM, and SQLite for persistence. Ideal for small apps or internal tools.

---

## 📦 Tech Stack

- **Node.js** (TypeScript)
- **Express** (REST API framework)
- **Sequelize** (ORM)
- **SQLite** (File-based database)
- **Jest + Supertest** (For testing)
- **Docker** (Containerization)

---

## 📂 Folder Structure

```text
<pre> ```plaintext . ├── src/ │ ├── controllers/ │ ├── models/ │ ├── routes/ │ └── server.ts ├── tests/ │ └── requests.test.ts ├── Dockerfile ├── docker-compose.yml ├── package.json └── README.md ``` </pre>
```

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/request-system.git
cd request-system
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Create a .env File
Create a .env file in the root of the project with the following content:

```env
PORT=3000
DATABASE_URL=sqlite://./dev.db
```
You can change the port if needed.

### 4. Run the Server
```bash
npm run dev
```
Or with debugging:

```bash
node --inspect-brk -r ts-node/register src/server.ts
```
The server will start on:

```arduino
http://localhost:3000
```

### 📡 API Endpoints
## GET /requests
Retrieve requests with optional filters.

Query Parameters:
status - Filter by request status (New, In progress, Completed, Cancelled)

date - Filter by a specific date (YYYY-MM-DD)

startDate and endDate - Filter by a date range (YYYY-MM-DD)

Example:
```bash
http://localhost:3000/requests?status=New
http://localhost:3000/requests?date=2025-05-28
http://localhost:3000/requests?startDate=2025-05-01&endDate=2025-05-28
```

## 🧪 Running Tests
Tests are written using Jest and Supertest.

To run all tests:

```bash
npm test
```

## 🐳 Docker Setup
1. Build & Run the App
```bash
docker compose up --build
```
This will:

Build the image using Dockerfile

Run the app container on port 3000

Mount the project as a volume for live code changes

2. Access the API
Visit http://localhost:3000

## 🗃️ Database
Uses SQLite for simplicity. The schema is automatically created via Sequelize on server start.