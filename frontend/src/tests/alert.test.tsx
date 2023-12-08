import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import AddBookDialog from "@/components/custom/add-book-dialog";


describe("AddBookDialog", () => {
  test("renders AddBookDialog component", async () => {


    render(<AddBookDialog active={true} setActive={() => {}} />);

    // Check if the dialog content is rendered
    const dialogTitle = screen.getByText("Welcome to Book Tracker");
    expect(dialogTitle).toBeInTheDocument();

    // Enter a title in the input field
    const titleInput = screen.getByPlaceholderText("title");
    userEvent.type(titleInput, "Mocked Book");

    // Click the "Add" button
    const addButton = screen.getByText("Add");
    userEvent.click(addButton);
  });
});
