# Dev.Pro Personal Development Plan Project for Software Engineer Intermediate II 

This repository is a study project to prepare for my second seniority assessment at Dev.Pro, some technical gaps in React.js were identified and this application serves as a major review of the technology.

The project consists of a very simple application for managing teams and projects.

<img width="1511" alt="image" src="https://github.com/user-attachments/assets/cd8a7558-004b-4585-bebf-1c52524ad6d5" />
<img width="1509" alt="image" src="https://github.com/user-attachments/assets/ca2ed658-c71c-4ef7-bf5e-37e44f141124" />

# Team Management Portal  

The **Team Management Portal** is a **comprehensive team and project management system** designed to help organizations structure their workforce efficiently.
The application is built using **React.js (Vite.js) on the frontend** and **Laravel on the backend**, providing a modern, fast, and scalable architecture. **JWT authentication** secures user access, while **Redux** ensures efficient state management for a smooth user experience.  

## Features  

### User Roles & Permissions  
The portal follows a **role-based access control (RBAC)** model with five distinct roles:  

- **Admin** – Has full access to manage projects, teams, users, and permissions.  
- **Collaborator** – Limited to read-only access across projects and team information.  
- **Manager** – Can create and manage teams within projects but cannot modify users.  
- **HR** – Responsible for creating and managing users but has no control over teams.  
- **Onboarding** – A newly created user without permissions until credentials are assigned.  

### Core Functionalities  
- ** Collaborators Page** – Lists all team members with detailed profiles, accessible based on user permissions.  
- ** Projects Page** – Displays all projects, allowing authorized users to create and delete them.  
- ** Project Dashboard** – A dedicated space for managing project details, tracking progress, and handling teams.  
- ** Team Management** – Features a **hierarchical tree structure**, visually organizing team relationships and reporting lines.  
- ** Secure Role-Based Access Control** – Ensures users interact only with the features permitted by their role, enhancing security and compliance.  
- ** Scalability & Performance** – Designed to support organizations of various sizes, ensuring smooth operation as data and users grow.  

# Project Setup Guide

This repository contains two main directories:
- `laravel-api` (Backend - Laravel API)
- `vite-project` (Frontend - React with Vite)

Follow the steps below to install and run the project on your local machine.

## Prerequisites
Ensure you have the following installed:
- PHP (>=8.0) & Composer
- Node.js (>= 20.00) & Yarn
- MySQL or PostgreSQL (or another relational supported database)

## Backend (Laravel API) Setup

1. Navigate to the backend directory:
   ```sh
   cd laravel-api
   ```
2. Install dependencies:
   ```sh
   composer install
   ```
3. Copy the environment file and configure it:
   ```sh
   cp .env.example .env
   ```
   - Update the `.env` file with your database credentials `(DB_CONNECTION, DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD)`.
4. Generate the application key:
   ```sh
   php artisan key:generate
   ```
5. Run database migrations and seeders:
   ```sh
   php artisan migrate --seed
   ```

6. Generate the JWT Secret:
   ```sh
   php artisan jwt:secret
   ```
   
7. Start the Laravel development server:
   ```sh
   php artisan serve
   ```
   - The API should now be running at `http://127.0.0.1:8000`

## Frontend (Vite + React) Setup

1. Navigate to the frontend directory:
   ```sh
   cd vite-project
   ```
2. Install dependencies:
   ```sh
   yarn install
   ```
3. Copy the environment file and configure it:
   ```sh
   cp .env.example .env
   ```
   - Update the `.env` file with the correct API base URL.
4. Start the development server:
   ```sh
   yarn dev
   ```
   - The frontend should now be running at `http://localhost:5173`

### Admin Credentials
- username: admin@admin.com 
- password: password

## Notes
- Make sure both backend and frontend are running simultaneously.
- The `.env.example` files in both projects provide a base configuration that should be customized before running the application.
- If you encounter issues, ensure your database is correctly set up and all dependencies are installed properly.
