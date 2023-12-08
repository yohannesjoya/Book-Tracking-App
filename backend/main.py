from fastapi import FastAPI
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from repository.book_repository import BookRepository
from database.models import Book
import mysql.connector

db = mysql.connector.connect(
    user='root', password='root', host='mysql', port="3306", database='db')
print("DB connected")
book_repo = BookRepository(db)


app = FastAPI()

# Setup cors
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Post route
@app.post("/books")
def create_book(book: Book):
    return book_repo.create_book(book)

# Get route
@app.get("/books")
def get_books():
    # Get all books from the database
    return book_repo.get_books()

# Get route for a specific book
@app.get("/books/{book_id}")
def get_book(book_id: int):
    return book_repo.get_book(book_id)

# Update book status
@app.put("/books/{book_id}")
def update_book(book_id:int, book: dict):
    return book_repo.update_book(book_id, book)
    
# Delete route
@app.delete("/books/{book_id}")
def delete_book(book_id: int):
    return book_repo.delete_book(book_id)