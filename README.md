# WTWR (What to Wear?): Back End

## About the Project
WTWR (What to Wear) is a full-stack web application designed to simplify daily outfit choices. This back-end repository serves as the project's RESTful API, managing user authentication, secure item storage, and outfit suggestions. By integrating real-time weather logic with a cloud-hosted MongoDB database, the server provides a seamless experience for users to manage their personal wardrobe and interact with the community through 'likes' and item sharing."

## Deployed Project
- **Frontend:** [https://clothing-app-2026.thedesktop.com](https://clothing-app-2026.thedesktop.com)
- **API Subdomain:** [https://api.clothing-app-2026.thedesktop.com](https://api.clothing-app-2026.thedesktop.com)


##  Project Pitch Video
Check out [this video]( ), where I describe my project, the technologies used, and the challenges I overcame during deployment.

## 💻 Technologies and Techniques

- **Node.js & Express.js** – Robust back-end framework for handling RESTful API requests.
- **MongoDB Atlas & Mongoose** – NoSQL cloud database for persistent storage and schema-based data modeling.
- **JWT (JSON Web Tokens)** – Secure user authentication with 7-day expiration for protected routes.
- **Bcrypt.js** – Industry-standard password hashing to ensure database security.
- **Celebrate & Joi** – Comprehensive request validation for incoming data before it hits the database.
- **Winston** – Integrated request and error logging stored in `request.log` and `error.log`.
- **ESLint (Airbnb-base)** – Strict code quality and style consistency maintained throughout the project.
- **MVC Architecture** – Clean separation of concerns through Models, Controllers, and Routes.

---

## 🛠️ Project Features & Deployment

- **User Authentication**: Secure registration and login systems with hidden password hashes in responses.
- **Wardrobe Management**: Full CRUD operations for clothing items, including weather-based category filtering.
- **Engagement System**: Interactive "like" and "unlike" functionality for community clothing pieces.
- **Centralized Error Handling**: Custom error constructors (400, 401, 403, 404, 409, 500) for consistent client-side feedback.
- **Automated Deployment**: Hosted on a **Google Cloud VM** using **Nginx** as a reverse proxy with **SSL (Certbot)** encryption.
- **Self-Healing Server**: Managed by **PM2** to ensure the application automatically recovers from crashes.
- **Environment Security**: Production secrets (JWT, Mongo URI) are securely managed via `.env` variables.

## 🔗 Frontend Repository
[https://github.com/Raquel-LT3/se_project_react](https://github.com/Raquel-LT3/se_project_react)