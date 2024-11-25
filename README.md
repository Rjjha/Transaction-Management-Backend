## Transaction Management Frontend

A React.js frontend application for managing transactions, including user authentication (register/login), transaction search, and dashboard features. The frontend integrates with a backend API to fetch, filter, and display transaction data. It also supports secure routes for authorized users.

---

### **Features**
- **User Authentication**: Register and log in users securely.
- **Transaction Dashboard**: Display a table of transactions with filters and search options.
- **Protected Routes**: Ensure authenticated access to the dashboard.
- **API Integration**: Communicate with the backend to manage transactions and generate reports.

---

### **Technologies Used**
- React.js
- Vite (Development server and build tool)
- Tailwind CSS (Styling)
- Axios (HTTP requests)
- Environment Variables (`dotenv`) for API configuration

---

### **Folder Structure**
```plaintext
frontend/
├── public/
│   ├── vite.svg              # Vite logo
│   └── index.html            # Main HTML file
├── src/
│   ├── assets/
│   │   └── react.svg         # React logo
│   ├── components/
│   │   ├── AuthForm.jsx      # Handles login and registration forms
│   │   ├── DashboardNavbar.jsx # Navbar for dashboard navigation
│   │   ├── Filters.jsx       # Filters for transactions
│   │   ├── ProtectedRoute.jsx # HOC for protected routes
│   │   └── TableSection.jsx  # Transaction table display
│   ├── pages/
│   │   ├── Dashboard.jsx     # Dashboard for viewing transactions
│   │   ├── Login.jsx         # Login page
│   │   └── Register.jsx      # Registration page
│   ├── services/
│   │   └── api.js            # API service for backend communication
│   ├── App.css               # Application styles
│   ├── App.jsx               # Main React app component
│   ├── index.css             # Global styles
│   └── main.jsx              # Application entry point
├── .gitignore                # Files to ignore in version control
├── eslint.config.js          # ESLint configuration
├── package-lock.json         # Lockfile for npm dependencies
├── package.json              # Project metadata and scripts
├── postcss.config.js         # PostCSS configuration for Tailwind CSS
├── README.md                 # Project documentation
├── tailwind.config.js        # Tailwind CSS configuration
└── vite.config.js            # Vite configuration
```

---

### **Setup and Installation**

#### **Prerequisites**
- **Node.js** (>= 14.0.0)
- **npm** (>= 6.0.0)

#### **Steps to Run Locally**

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Build for Production**
   ```bash
   npm run build
   ```
   This will create an optimized production build in the `dist/` folder.

5. **Preview the Production Build**
   ```bash
   npm run preview
   ```
   This will serve the production build locally.

---

Now you're ready to work with the frontend of the Transaction Management System!
