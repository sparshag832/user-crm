# user-crm

USER-CRM is a Node.js-based CRM backend system built with Express.js, modular architecture, environment-based config management, and rate limiting for security.

## Tech Stack

- Node.js
- Express.js
- PostgreSQL (or any SQL-based DB via Sequelize / pg)
- dotenv
- express-rate-limit
- password protected
- cookie-parser
- jwt + cookies (session management)
- modular folder structure (controllers, services, models, routes, middlewares)

## Folder Strcture

USER-CRM/
├── config/ # DB config or environment setup
├── controllers/ # Logic for route handlers
├── middlewares/ # Custom middlewares like auth, rate limiter
├── models/ # DB models / table structure
├── routes/ # Express route definitions
├── services/ # Business logic layer
├── utils/ # Helper functions
├── views/ # Templating 
├── .env.dev # Environment variables
├── app.js # App entry point
├── package.json
└── README.md

## Steps To Run

1. Clone the repository
2. Install dependencies
   
 npm install -y
 
4. Create Environment File .env.dev
   
PORT=3000

#PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=crmdb

#JWT
JWT_SECRET=am_tech_jwt_secret_token

#GOOGLE RECAPTCHA
RECAPTCHA_SECRET=6LcZ4DIrAAAAAPPwTbcp3DlrBFUd4CNQIj1teKH-

5.Run the server
node app.js
