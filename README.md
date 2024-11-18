# Notes Taking App
Before getting started, make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (or use MongoDB Atlas for a cloud database)

## Setting Up the Project
Follow the steps below to set up the app on your local machine:

### 1. Clone the Repository
First, clone the repository to your local machine:

```bash
git clone https://github.com/your-username/notes-taking-app.git
cd notes-taking-app
```
### 2. Install Dependencies
Install the required dependencies for both the client and server.
- For the backend (server-side), install the required Node.js dependencies:
```bash
cd server
npm install
```
- For the frontend (client-side), the HTML, CSS, and JS files are already set up in the `public` directory, so no additional dependencies are needed here.

### 3. Set Up MongoDB
If you're using a local MongoDB instance:
- Make sure MongoDB is installed and running on your machine. You can start MongoDB with the following command:
  ```bash
  mongod
  ```

If you're using [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for cloud storage:

- Create a MongoDB Atlas cluster and get your connection string.
- Replace the connection string in `server/server.js` with your own MongoDB Atlas connection URL.

### 4. Start the Backend Server
From the `server` folder, run the following command to start the backend server:

```bash
npm start
```
This will start the server on `http://localhost:5000`.

### 5. Open the Frontend in a Browser

Open `public/index.html` in a web browser to start using the app.
