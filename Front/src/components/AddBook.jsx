import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import '../assets/css/addbook.css';


const categoryNames = [
  "Adventure", "Romance", "Thriller", "Memoir", 
  "Travel", "Health", "Poetry", "Cooking"
];

const AddBook = () => {
  const [bookImage, setBookImage] = useState("");
  const [bookName, setBookName] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookDescription, setBookDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const newBook = {
        title: bookName,
        author: bookAuthor,
        description: bookDescription,
        cover: bookImage, // This will just be the URL string now
        id: Date.now() // Generate a unique ID
      };

      const response = await fetch(`http://localhost:8000/${category}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      });

      if (!response.ok) {
        throw new Error("Failed to add book");
      }

      // Clear form after successful submission
      setBookImage("");
      setBookName("");
      setBookAuthor("");
      setBookDescription("");
      setCategory("");

      alert("Book added successfully!");
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to add book. Please try again.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Form className="addbook shadow p-4 bg-white rounded" style={{ width: "100%", maxWidth: "400px" }} onSubmit={handleSubmit}>
        <h2 className="text-center mb-4" style={{ color: '#333', fontWeight: 'bold' }}>Add New Book</h2>
        <Form.Group className="mb-3" controlId="formBookImage">
          <Form.Label>Book Cover</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter image URL"
            value={bookImage}
            onChange={(e) => setBookImage(e.target.value)} 
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBookName">
          <Form.Label>Book Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Write book name" 
            value={bookName}
            onChange={(e) => setBookName(e.target.value)} 
            required 
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBookAuthor">
          <Form.Label>Book Author</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Write book author" 
            value={bookAuthor}
            onChange={(e) => setBookAuthor(e.target.value)} 
            required 
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBookDescription">
          <Form.Label>Book Description</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={3} 
            placeholder="Write descreption Description" 
            value={bookDescription}
            onChange={(e) => setBookDescription(e.target.value)} 
            required 
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBookCategory">
          <Form.Label>Book Category</Form.Label>
          <Form.Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {categoryNames.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button style={{ backgroundColor: "#E74C3C", borderColor: "#E74C3C" }} variant="primary" type="submit" className="w-100">
          Add Book
        </Button>
      </Form>
    </Container>
  );
};

export default AddBook;