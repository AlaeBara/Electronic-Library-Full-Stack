```markdown
# 📚 EBook - Online Book Store and Community

[Technologies Getting Started](#technologies-getting-started)

A comprehensive web application for book enthusiasts to discover, read, delete and and share their favorite books while building a vibrant reading community online.

## 👥  Authors
- Hafsa [ (Login/Sign Up Pages never been delivered) ]
- Yasser Assou [ Footer + About Us + Book page ]
- Youssef El Melh( Add Book page / (Contact us page not delivered yet))
- Abdennacer Kaddouri

## 🎨 Layout
![Project Layout](https://drive.google.com/uc?export=view&id=1Vmk5e9yD3z4DftCYspCQJoYYvZcLjYOx)

## 🖥️ Technologies Getting Started

### Technologies Used
- React.js
- React Router
- React Bootstrap
- Bootstrap
- CSS3
- React Icons

## 🚀 Getting Started

### Prerequisites
- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

### Installation
1. Clone the repo:
   ```bash
   git clone https://github.com/nacceree/lib-team.git
   ```
2. Navigate to the project directory:
   ```bash
   cd lib-team
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Visit http://localhost:3000 in your browser.

## 📦 Features
- User authentication (Login functionality) // not added yet 
- Add new books to the platform // not added yet 
- Responsive design for seamless mobile experience
- Interactive navigation bar with search functionality
- Footer with social media integration and quick links
- Browes books based on their categories

## 🏗️ Project Structure
```
Lib-team/
├── public/
├── src/
│   ├── assets/
│   │   ├── css/
│   │   │   ├── navbar.css
│   │   │   ├── footer.css
│   │   │   ├── index.css
│   │   │   ├── login.css
│   │   │   ├── bookcard.css
│   │   └── images/
│   │       ├── logowa.png
│   │       └── logowacopy.png
│   ├── components/
│   │   ├── Aboutus.jsx
│   │   ├── addbook.jsx
│   │   ├── bookcard.jsx
│   │   ├── bookspage.jsx
│   │   ├── categories.jsx
│   │   ├── category.jsx
│   │   ├── footer.jsx
│   │   ├── navbar.jsx
│   │   ├── login.jsx
│   │   ├── onebook.jsx
│   │   ├── searchresults.jsx
│   │   ├── jsx
│   ├── App.jsx
│   └── index.jsx
├── package.json
└── README.md
```

## 🧩 Components

## 🧩 Components

### Aboutus
- Provides information about the library team and its mission
- Engaging layout with team member profiles and descriptions

### AddBook
- Form for adding new books to the library collection
- Input fields for book image, name, author, and description
- Validation for required fields

### BookCard
- Displays individual book details in a card format
- Includes book image, name, author, and a short description
- Custom styling for a polished look

### BooksPage
- Lists all books available in the library
- Integrates the `BookCard` component for each book
- Pagination for easy navigation through the book collection

### Categories
- Displays different book categories available in the library
- Links to filtered views of books by category

### Category
- Shows books belonging to a selected category
- Integrates the `BookCard` component for each book in the category

### Footer
- Comprehensive footer with quick links to essential pages
- Social media integration (Instagram, Facebook, Twitter)
- Consistent branding with logo display

### CustomNavbar
- Sleek navigation bar with integrated search functionality
- Dynamic links for "Add Book" and "Login" pages
- Responsive design for various screen sizes

### Login
- User login form with fields for email and password
- Validation for required fields
- Redirects to the homepage upon successful login

### OneBook
- Detailed view of a single book's information
- Displays book image, name, author, full description, and additional details

### SearchResults
- Displays search results based on user queries
- Integrates the `BookCard` component for each result

## 🎨 Styling

The project utilizes a combination of React Bootstrap and custom CSS for a polished look:

- `navbar.css`: Custom styles for the navigation component
- `footer.css`: Dedicated styles for the footer component
- `index.css`: General styles for the entire application
- `login.css`: Styles for the login form
- `bookcard.css`: Custom styles for the book cards

Color Palette:
- Primary Background: #2B3A42
- Accent Color: #BF4F36
- Call-to-Action: #E74C3C

## 📚 Documentation
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [React Bootstrap Documentation](https://react-bootstrap.github.io/)
- [React Router Documentation](https://reactrouter.com/web/guides/quick-start)
