# Natours API

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey?logo=express)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-brightgreen?logo=mongodb)](https://www.mongodb.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Deployment](https://img.shields.io/badge/Deployed%20on-Render-blue?logo=render)](https://render.com)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](#)

A complete, modern **RESTful API** built with **Node.js**, **Express**, and **MongoDB (Mongoose)**.  
Implements authentication, authorization, data population, aggregation, filtering, and more.  

---

## Tech Stack

**Backend:** Node.js, Express  
**Database:** MongoDB with Mongoose ODM  
**Template Engine:** Pug  
**Authentication:** JSON Web Tokens (JWT)  
**Utilities:** bcrypt, dotenv, nodemailer, multer, Stripe (optional)

---

## Features

### Core API
- RESTful architecture (Tours, Users, Reviews)
- CRUD operations with **Mongoose models**
- **Nested routes** (`/tours/:tourId/reviews`)
- **Handler factory functions** for reusable CRUD logic
- **APIFeatures** class for filtering, sorting, pagination & field limiting

### Database & Models
- Schema validation and virtual properties
- **Pre/Post middleware** for data integrity
- **Populate & virtual populate** for relationships
- **Aggregation pipelines** for analytics
- Cross-model referencing (`Tour`, `User`, `Review`)

### Authentication & Security
- JWT-based authentication and route protection
- Role-based authorization (admin, guide, user)
- Password hashing with **bcrypt**
- Secure password reset via email
- Data sanitization, rate limiting & CORS protection

### Server-Side Rendering
- Built with **Pug templates**
- Views for tours, login/signup, account settings
- Protected routes for authenticated users

---

## API Endpoints

| Resource | Method | Endpoint | Description |
|-----------|---------|-----------|--------------|
| **Tours** | GET | `/api/v1/tours` | Get all tours |
|  | GET | `/api/v1/tours/:id` | Get a specific tour |
|  | POST | `/api/v1/tours` | Create a new tour |
|  | PATCH | `/api/v1/tours/:id` | Update a tour |
|  | DELETE | `/api/v1/tours/:id` | Delete a tour |
| **Reviews** | GET | `/api/v1/tours/:tourId/reviews` | Nested: Get reviews for a tour |
| **Users** | POST | `/api/v1/users/signup` | Sign up new user |
|  | POST | `/api/v1/users/login` | Login existing user |

---

## Folder Structure

```
natours
┣ controllers/
┃ ┣ tourController.js
┃ ┣ userController.js
┃ ┣ reviewController.js
┃ ┗ authController.js
┣ models/
┃ ┣ tourModel.js
┃ ┣ userModel.js
┃ ┗ reviewModel.js
┣ routes/
┃ ┣ tourRoutes.js
┃ ┣ userRoutes.js
┃ ┗ reviewRoutes.js
┣ utils/
┃ ┣ apiFeatures.js
┃ ┣ appError.js
┃ ┗ catchAsync.js
┣ public/
┣ views/
┣ app.js
┗ server.js
```

---

## Core Concepts

| Concept | Description |
|----------|-------------|
| **Handler Factory** | Reusable CRUD controllers for all models |
| **APIFeatures** | Parses query parameters for filtering, sorting, limiting, pagination |
| **Mongoose Middleware** | Hooks that run before/after DB operations |
| **Populate** | Replace ObjectIds with related document data |
| **Virtual Populate** | Dynamically link docs without storing references |
| **Aggregation** | Perform analytics and transformations |
| **Auth Middleware** | Protect routes using JWT validation |

---

## Key Code Snippets

### Auto-populate in Middleware
```js
tourSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt'
  });
  next();
});
```

### Virtual Populate (Reviews on Tours)
```js
tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id'
});
```

Aggregation Example
```js
const stats = await Tour.aggregate([
  { $match: { ratingsAverage: { $gte: 4.5 } } },
  { $group: { _id: '$difficulty', numTours: { $sum: 1 }, avgRating: { $avg: '$ratingsAverage' } } },
  { $sort: { avgRating: -1 } }
]);
```

---

## Security & Performance

- Rate limiting with express-rate-limit
- Data sanitization against NoSQL injection & XSS
- Secure HTTP headers via Helmet
- Response compression
- CORS enabled for cross-origin requests

---

## Testing

- API testing via Postman collection

---

## Setup & Installation

Clone the repository
```bash
git clone https://github.com/<your-username>/natours.git
cd natours
```

Install dependencies
```bash
npm install
```

Set environment variables
```bash
NODE_ENV=development
PORT=3000
DATABASE=mongodb+srv://<username>:<password>@cluster0.mongodb.net/natours
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=90d
EMAIL_USERNAME=your_email
EMAIL_PASSWORD=your_password
```

Start the app
```bash
npm start
```

App will run at 👉 http://localhost:3000

---

## Deployment

### Deployed using:
- Render for Node backend hosting
- MongoDB Atlas for the cloud database

Live URL:
➡️ https://natours-api.onrender.com

---

## License
This project is licensed under the MIT License.
You’re free to use, modify, and distribute it for learning or commercial purposes.
