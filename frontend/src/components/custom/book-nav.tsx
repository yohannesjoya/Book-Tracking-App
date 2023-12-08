"use client";
import { Skeleton } from "@/components/ui/skeleton";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookRow } from "./book-row";

import { Book } from "../../app/types/book";
import { useState, useEffect } from "react";

type BookTabsProps = {
  books: Book[];
};

export const BookTabs = ({ books }: BookTabsProps) => {
  const completedBooks = books.filter((book) => book.status === "completed");
  const toReadBooks = books.filter((book) => book.status === "to-read");
  const inProgressBooks = books.filter((book) => book.status === "in-progress");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Tabs
      id="book-tab"
      defaultValue="to-read"
      className="w-[95%] md:w-5/6 lg:w-3/4"
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="to-read">To Read</TabsTrigger>
        <TabsTrigger value="in-progress">In Progress</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>
      <TabsContent value="completed">
        <div>
          {loading && (
            <div className="h-[400px] w-full flex flex-col justify-center items-start">
              {Array.from({ length: 6 }, (_, index) => (
                <Skeleton
                  key={index}
                  className="w-full h-[35px] my-1 bg-slate-200"
                />
              ))}
            </div>
          )}
          {completedBooks.length === 0 && !loading && (
            <div className=" h-[400px] my-8 flex justify-center items-start">
              You haven't completed any books yet
            </div>
          )}
          {completedBooks.map((book, idx) => (
            <BookRow index={idx} book={book} key={idx} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="to-read">
        {loading && (
          <div className=" h-[400px] w-full flex flex-col justify-center items-start">
            {Array.from({ length: 6 }, (_, index) => (
              <Skeleton
                key={index}
                className="w-full h-[35px] my-1 bg-slate-200"
              />
            ))}
          </div>
        )}
        {toReadBooks.length === 0 && !loading && (
          <div className=" h-[400px] my-8 flex justify-center items-center">
            You haven't added any books to read yet
          </div>
        )}
        <div className="flex flex-col justify-center items-center">
          {toReadBooks.map((book, idx) => (
            <BookRow index={idx} book={book} key={idx} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="in-progress">
        <div>
          {loading && (
            <div className="h-[400px] my-8 flex justify-center items-center">
              {Array.from({ length: 6 }, (_, index) => (
                <Skeleton
                  key={index}
                  className="w-full h-[35px] my-1 bg-slate-200"
                />
              ))}
            </div>
          )}
          {inProgressBooks.length === 0 && !loading && (
            <div className=" h-[400px] my-8 flex justify-center items-center">
              You haven't started reading any books yet
            </div>
          )}
          {inProgressBooks.map((book, idx) => (
            <BookRow index={idx} book={book} key={idx} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default BookTabs;
