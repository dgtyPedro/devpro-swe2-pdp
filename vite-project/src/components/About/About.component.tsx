export const AboutComponent = () => {
    return (
        <>
            <h1>Professional Development Project (PDP) - Dev.Pro</h1>

            <h2>About the Project</h2>
            <p>This PDP is designed to enhance my React.js skills through planned learning and hands-on practice. The
                goal was to build a complete web application using React for the frontend and PHP with a chosen
                framework
                for the backend.</p>

            <h2>Phase 1: Learning & Practice</h2>
            <p>To strengthen my understanding of React, I:</p>
            <ul>
                <li>Watched the majority of the classes in the React course by Maximilian Schwarzmüller on Udemy.</li>
                <li>Revisited previously learned React features and old React projects.</li>
                <li>Read some documentations and articles about:</li>
                <ul>
                    <li>Redux;</li>
                    <li>RTK;</li>
                    <li>React Router;</li>
                    <li>React Hooks;</li>
                    <li>Laravel;</li>
                    <li>JWT Authentication;</li>
                    <li>Restful API's;</li>
                    <li>Relationships in Relational Databases;</li>
                </ul>
            </ul>

            <h2>Phase 2: Full-Stack Application Development</h2>
            <p>In this phase, I developed a web application with the following stack:</p>
            <ul>
                <li><strong>Backend:</strong> Laravel.</li>
                <li><strong>Frontend:</strong> React.js for the user interface.</li>
                <li><strong>Database:</strong> PostgreSQL for data storage.</li>
            </ul>

            <h2>Key Features</h2>
            <ul>
                <li>User management with registration and authentication.</li>
                <li>Multiple user roles with specific permissions.</li>
                <li>JWT token-based authentication for security.</li>
                <li>Responsive design for various devices.</li>
                <li>Functionalities such as account creation, project creation, custom team schemas, etc.</li>
                <li>Dynamic content loading via React (SPA) with the backend serving as a REST API.</li>
            </ul>

            <p>This project helped solidify my skills in full-stack development and provide real-world experience in
                building modern web applications.</p>
            <hr />
            <h2>Project Setup Guide</h2>

            <p>This repository contains two main directories:</p>
            <ul>
                <li><strong>laravel-api</strong> (Backend - Laravel API)</li>
                <li><strong>vite-project</strong> (Frontend - React with Vite)</li>
            </ul>

            <p>Follow the steps below to install and run the project on your local machine.</p>

            <h2>Prerequisites</h2>

            <p>Ensure you have the following installed:</p>
            <ul>
                <li>PHP {"(>=8.0)"} & Composer</li>
                <li>Node.js {"(>= 20.00)"} & Yarn</li>
                <li>MySQL or PostgreSQL (or another relational supported database)</li>
                <li>Redis (optional, if used in the Laravel application)</li>
                <li>Laravel CLI</li>
            </ul>

            <h2>Backend (Laravel API) Setup</h2>

            <ol>
                <li>Navigate to the backend directory:
                    <pre style={{background: '#f4f4f4', padding: '10px', borderRadius: '5px'}}>cd laravel-api</pre>
                </li>
                <li>Install dependencies:
                    <pre style={{background: '#f4f4f4', padding: '10px', borderRadius: '5px'}}>composer install</pre>
                </li>
                <li>Copy the environment file and configure it:
                    <pre
                        style={{background: '#f4f4f4', padding: '10px', borderRadius: '5px'}}>cp .env.example .env</pre>
                    <p>- Update the <code>.env</code> file with your database credentials and other necessary
                        configurations.</p>
                </li>
                <li>Generate the application key:
                    <pre style={{
                        background: '#f4f4f4',
                        padding: '10px',
                        borderRadius: '5px'
                    }}>php artisan key:generate</pre>
                </li>
                <li>Run database migrations and seeders:
                    <pre style={{background: '#f4f4f4', padding: '10px', borderRadius: '5px'}}>php artisan migrate --seed</pre>
                </li>
                <li>Generate the JWT Secret:
                    <pre style={{
                        background: '#f4f4f4',
                        padding: '10px',
                        borderRadius: '5px'
                    }}>php artisan jwt:secret</pre>
                </li>
                <li>Start the Laravel development server:
                    <pre style={{background: '#f4f4f4', padding: '10px', borderRadius: '5px'}}>php artisan serve</pre>
                    <p>- The API should now be running at <code>http://127.0.0.1:8000</code></p>
                </li>
            </ol>

            <h2>Frontend (Vite + React) Setup</h2>

            <ol>
                <li>Navigate to the frontend directory:
                    <pre style={{background: '#f4f4f4', padding: '10px', borderRadius: '5px'}}>cd vite-project</pre>
                </li>
                <li>Install dependencies:
                    <pre style={{background: '#f4f4f4', padding: '10px', borderRadius: '5px'}}>yarn install</pre>
                </li>
                <li>Copy the environment file and configure it:
                    <pre
                        style={{background: '#f4f4f4', padding: '10px', borderRadius: '5px'}}>cp .env.example .env</pre>
                    <p>- Update the <code>.env</code> file with the correct API base URL.</p>
                </li>
                <li>Start the development server:
                    <pre style={{background: '#f4f4f4', padding: '10px', borderRadius: '5px'}}>yarn dev</pre>
                    <p>- The frontend should now be running at <code>http://localhost:5173</code></p>
                </li>
            </ol>

            <h2>Notes</h2>

            <ul>
                <li>Make sure both backend and frontend are running simultaneously.</li>
                <li>The <code>.env.example</code> files in both projects provide a base configuration that should be
                    customized before running the application.
                </li>
                <li>If you encounter issues, ensure your database is correctly set up and all dependencies are installed
                    properly.
                </li>
            </ul>
        </>
    )
}

