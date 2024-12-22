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



### Project Overview

- **Frontend**: A React.js application to manage books.
- **Backend**: A Spring Boot application that handles book data and stores it in a database.

---

### Purpose of the Project

**Readify** is a simple book catalog application that allows users to add and view books stored in a database.

