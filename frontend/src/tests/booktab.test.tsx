import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BookTabs from "@/components/custom/book-nav";

import { Book } from "@/app/types/book";

// Mock the BookRow component
// jest.mock("./book-row", () => {
//   return {
//     __esModule: true,
//     BookRow: jest.fn(() => <div>Mocked BookRow</div>),
//   };
// });

const mockBooks: Book[] = [
  { id: 1, title: "Book 1", status: "completed" },
  { id: 2, title: "Book 2", status: "to-read" },
  { id: 3, title: "Book 3", status: "in-progress" },
];

test("renders BookTabs component with mock data", () => {
  render(<BookTabs books={mockBooks} />);


  // Check if the component renders the correct content after loading
  setTimeout(() => {
    const completedBooks = screen.getAllByText(/Book/i);
    expect(completedBooks.length).toBe(6); // Assuming you have 6 books in the mock data
  }, 0);
});
