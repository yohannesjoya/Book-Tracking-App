from fastapi import HTTPException
from database.models import Book
import mysql.connector


class BookRepository:
    def __init__(self,):
        self.config = None
        # self.config = db
        # self.cursor = db.cursor()
        
        # # Create the books table if it doesn't exist
        # self.cursor.execute("CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY, title TEXT, status TEXT)")
        # self.db.commit()

    def create_book(self, book: Book):
        db = mysql.connector.connect(user='root', password='YOHANNESdesta1@', host='localhost', port="3306", database='db')
        cursor = db.cursor()
        # Create book in the database
        
        title,status = book.title,book.status
        cursor.execute(f"INSERT IGNORE INTO books (title, status) VALUES ('{title}', '{status}');")
        
        db.commit()
        db.close()
        # return the created book not the message
        return {"id": cursor.lastrowid, "title": book.title, "status": book.status}


    def get_books(self):
        db = mysql.connector.connect(user='root', password='YOHANNESdesta1@', host='localhost', port="3306", database='db')
        cursor = db.cursor()
        # Get all books from the database
        # get the books as dictionaries
        res = cursor.execute("SELECT * FROM books")
        books = cursor.fetchall()
        db.close()
        # return as a list of dictionaries
        return [{"id": book[0], "title": book[1], "status": book[2]} for book in books]

    def get_book(self, book_id: int):
        # Get a book with the di
        
        db = mysql.connector.connect(user='root', password='YOHANNESdesta1@', host='localhost', port="3306", database='db')
        cursor = db.cursor()
        res = cursor.execute(f"SELECT * FROM books WHERE id = ('{book_id}')")
        book = cursor.fetchone()
        db.close()
        if book is None:
            raise HTTPException(status_code=404, detail="Book not found")
        return {"id": book[0], "title": book[1], "status": book[2]}

    def update_book(self, book_id:int, book: dict):
        # Update book in the database
        db = mysql.connector.connect(user='root', password='YOHANNESdesta1@', host='localhost', port="3306", database='db')
        cursor = db.cursor()
        new_status = book["status"]
        cursor.execute(f"UPDATE books SET status = ('{new_status}') WHERE id = ('{book_id}')")
        db.commit()
        db.close()
        # return the book
        return {"message": "Book updated successfully"}
    def update_book_title(self, book_id:int, book: dict):
        # Update book in the database
        db = mysql.connector.connect(user='root', password='YOHANNESdesta1@', host='localhost', port="3306", database='db')
        cursor = db.cursor()
        new_title = book["title"]
        cursor.execute(f"UPDATE books SET title = ('{new_title}') WHERE id = ('{book_id}')")
        db.commit()
        db.close()
        # return the book
        return {"message": "Book updated successfully"}

    def delete_book(self, book_id: int):
        db = mysql.connector.connect(user='root', password='YOHANNESdesta1@', host='localhost', port="3306", database='db')
        cursor = db.cursor()
        # Delete book from the database
        cursor.execute(f"DELETE FROM books WHERE id = ('{book_id}')")

        db.commit()
        db.close()
        return {"message": "Book deleted successfully"}