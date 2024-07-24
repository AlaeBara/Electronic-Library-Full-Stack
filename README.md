# API Documentation

### Authentication

#### Auth
- `POST /auth/signup`: Register a new user
- `POST /auth/singin`: Login a user
- `POST /auth/logout`: Logout


### Book Management

#### Book
- `GET /books`: Get all books
- `POST /books/:category`: Add a new book to a category
- `GET /categories/:category`: Get books by category
- `PATCH /books/:id`: Update a book
- `DELETE /books/:id`: Delete a book

## Features

- Browse all books
- View books by category
- Search for books
- Add new books (authenticated users only)
- Manage favorites (authenticated users only)
- User profiles (authenticated users only)

## Technologies Used

- React
- React Router
- Context API for state management
- Bootstrap for styling
