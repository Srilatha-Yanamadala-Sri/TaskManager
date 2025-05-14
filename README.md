# TaskManager

TaskManager is a simple task management application built with React for the frontend and a backend API for managing tasks.

---

## **Project Structure**

The project is divided into two main parts:

1. **Frontend**: A React-based client application located in the `frontend` folder.
2. **Backend**: A Node.js and Express-based API server located in the `backend` folder.

```
TaskManager-App/
├── backend/          # Backend API server
│   ├── controllers/  # Controller logic for handling requests
│   ├── models/       # Mongoose models
│   ├── routes/       # API routes
│   ├── .env          # Environment variables
│   ├── db.js         # MongoDB connection logic
│   ├── index.js      # Entry point for the backend server
│   └── package.json  # Backend dependencies and scripts
├── frontend/         # Frontend React application
│   ├── public/       # Static files
│   ├── src/          # React source code
│   ├── build/        # Production build (generated after `npm run build`)
│   ├── .gitignore    # Ignored files for the frontend
│   ├── package.json  # Frontend dependencies and scripts
│   └── tsconfig.json # TypeScript configuration
└── README.md         # Project documentation
```

---

## **Setup Instructions**

### **1. Clone the Repository**
   ```bash
   git clone https://github.com/Srilatha-Yanamadala-Sri/TaskManager.git
   cd TaskManager-App
   ```

### **2. Backend Setup**
   Navigate to the `backend` directory and install the required dependencies:
   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the `backend` folder and add your MongoDB connection string:
   ```
   MONGO_URI=mongodb://localhost:27017/task-manager
   ```

   Start the backend server:
   ```bash
   npm run dev
   ```
   The backend server will run at [http://localhost:5000](http://localhost:5000).

### **3. Frontend Setup**
   Navigate to the `frontend` directory and install the required dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

   Start the React development server:
   ```bash
   npm start
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

---

## **Build for Production**

To create an optimized production build for the frontend, run:
```bash
npm run build
```
This will generate a `build` folder containing the production-ready files.

---

## **Running Both Frontend and Backend Together**

You can run both the frontend and backend servers simultaneously using the root `package.json` script:
```bash
npm start
```
This will:
- Start the backend server at [http://localhost:5000](http://localhost:5000).
- Start the frontend server at [http://localhost:3000](http://localhost:3000).

---

## **Deploying to Netlify and Render**

### **Frontend Deployment (Netlify)**
1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```
2. Deploy the `build` folder to Netlify.

### **Backend Deployment (Render)**
1. Push the backend code to a GitHub repository.
2. Connect the repository to Render and set the `MONGO_URI` environment variable.

---

## **Contributing**

Feel free to fork this repository and submit pull requests. Contributions are welcome!

---

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
