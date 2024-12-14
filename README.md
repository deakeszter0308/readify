## Readify - Application Setup and Run Guide

### 1. Prerequisites

To run this project, you need the following:

- **Java 17** or higher
- **Maven** (for `mvn` command)
- **Node.js** and **npm** for the frontend

### 2. Running the Backend (Spring Boot Application)

1. **Clone the repository**:

    ```bash
    git clone https://github.com/username/readify.git
    cd readify
    ```

2. **Backend configuration**: The default database is a `testdb.mv.db` file located in the `data/` folder. If you want to use a different database, modify the `application.properties` file.

3. **Running the backend application**:

   To run the Spring Boot backend, use the following command in the backend directory (where the `pom.xml` file is located):

    - **Using Maven**:

      ```bash
      ./mvnw spring-boot:run
      ```

   The backend will be available at `http://localhost:8080`.

### 3. Running the Frontend (React Application)

1. **Install frontend dependencies**:

   The frontend is located in the `frontend/` directory. First, you need to install the required dependencies.

    ```bash
    cd frontend
    npm install
    ```

2. **Running the frontend application**:

   To run the frontend, use the following command:

    ```bash
    npm start
    ```

   The frontend will be available at `http://localhost:3000`.

### 4. Adding Books

Once the backend and frontend are running, follow these steps to add a new book:

1. Open the frontend in your browser at `http://localhost:3000`.
2. On the **Add Book** page, fill in the form with the book details.
3. Click the "Add Book" button. The book details will be saved to the backend database, and the frontend will automatically update the list of books.

### 5. CORS and Proxy Setup

Since the frontend and backend run on different ports, you might encounter CORS issues. You can bypass these issues by using the **local-cors-proxy** package:

1. **Install local-cors-proxy**:

   If it's not already installed, use the following command:

    ```bash
    npm install -g local-cors-proxy
    ```

2. **Run the proxy**:

   Start the proxy with the following command:

    ```bash
    lcp --proxyUrl http://localhost:8080 
    ```

   This allows the frontend application at `http://localhost:3000` to communicate with the backend without encountering CORS issues.

### 6. Troubleshooting

- If the frontend cannot connect to the backend, make sure the backend is running at `http://localhost:8080`.
- If the backend is not accessible, check that the Spring Boot application started correctly.
- If you encounter CORS issues, try running **local-cors-proxy** to forward requests through the local proxy.

---

### Project Overview

- **Frontend**: A React.js application to manage books.
- **Backend**: A Spring Boot application that handles book data and stores it in a database.

---

### Purpose of the Project

**Readify** is a simple book catalog application that allows users to add and view books stored in a database.

