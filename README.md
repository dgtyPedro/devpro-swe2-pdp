# Dev.Pro Personal Development Plan Project for Software Engineer Intermediate II 

This repository is a study project to prepare for my second seniority assessment at Dev.Pro, some technical gaps in React.js were identified and this application serves as a major review of the technology.

The project consists of a very simple application for managing teams and projects.

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
- Redis (optional, if used in the Laravel application)
- Laravel CLI

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
   - Update the `.env` file with your database credentials and other necessary configurations.
4. Generate the application key:
   ```sh
   php artisan key:generate
   ```
5. Run database migrations and seeders:
   ```sh
   php artisan migrate --seed
   ```
6. Start the Laravel development server:
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

## Notes
- Make sure both backend and frontend are running simultaneously.
- The `.env.example` files in both projects provide a base configuration that should be customized before running the application.
- If you encounter issues, ensure your database is correctly set up and all dependencies are installed properly.
