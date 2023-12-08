# Book Tracking Exercise

This repository contains a simple web application for tracking book reading. The application includes both a frontend developed with NextJS and a backend implemented using Python with FastAPI.


<img height="260px" src="[https://jolly-donut-0f00f9.netlify.app/motto.jpeg](https://res.cloudinary.com/doew4ampi/image/upload/v1702069392/photo_6023967468780896558_y_wv8gsc.jpg)" width="80%"/>



## Project Structure

The project is structured with separate directories for the frontend and backend:

- **frontend:** Contains the NextJS application developed with React and TypeScript. Styling and layout are done using the `shadcn/ui` library.

- **backend:** Implements the backend using Python with the FastAPI framework. The repository pattern is used for data storage and retrieval, interacting with a PostgreSQL database.

## Frontend (NextJS)

### Features:

- Users can add new books,update and delete a book entry.
- Users can transition books between the three columns: "to-read", "in-progress", and "completed".
- Books are fetched from the backend via a RESTful API.
- Single-page app with a 3-column layout.
- User actions update the backend via a RESTful API.
- User notifications display if the backend service encounters errors.

### Testing:

- Incorporates frontend test.

## Backend (Python + FastAPI)

### Features:

- Implements the GET, POST, PUT, and DELETE methods for the book resource.
- Resources interact with the database via the `BookRepository` class.
- Uses the repository pattern for data storage and retrieval.
- The database is MySQL.

### Testing:

- Incorporates API test.

### Deployment:

A Docker Compose file is provided to initiate the entire stack. To run the application, use the following commands:

```bash
docker compose up -d
start http://localhost:3000
```

The website should be accessible at [http://localhost:3000](http://localhost:3000) and fully functional.

