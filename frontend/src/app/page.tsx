"use client";

import BookTabs from "@/components/custom/book-nav";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import useBooksStore from "./zustand/books";

import AddBookDialog from "@/components/custom/add-book-dialog";
import { toast, useToast } from "@/components/ui/use-toast";

export default function Home() {
  const [title, setTitle] = useState("");
  const [addingBook, setAddingBook] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const bookStore = useBooksStore();

  const getBooks = async () => {
    const url = process.env.NEXT_PUBLIC_BASEURL as string;

    const response = await axios.get(url);
    const data = response.data;
    return JSON.stringify(data);
  };
  const [active, setActive] = useState(false);

  useEffect(() => {
    setLoading(true);
    getBooks()
      .then((data) => {
        const books = JSON.parse(data);
        bookStore.setBooks(books);
      })
      .catch((err) => {
        toast({
          title: "Error getting books",
          variant: "destructive",
        });
      });
    setLoading(false);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-2 md:p-5">
      <div className="w-full flex justify-center items-center mt-5">
        <BookTabs books={bookStore.books} />
      </div>

      <div onClick={() => setActive(true)}>
        <AddBookDialog active={active} setActive={setActive} />
      </div>
    </div>
  );
}
