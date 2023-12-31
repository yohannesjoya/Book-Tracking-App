"use client";

import { Book } from "@/app/types/book";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";
import {useState} from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import useBooksStore from "@/app/zustand/books";
import { useToast } from "../ui/use-toast";
import { Input } from "../ui/input";
import { Button } from "../ui/button";


interface BookRowProps {
  index: number;
  book: Book;
}



export const BookRow = ({ index, book }: BookRowProps) => {
  const { toast } = useToast();

  const [editVisible, setEditVisible] = useState(true)
  const [new_title, setNewTitle] = useState("")

  const bookStore = useBooksStore();

  const handleDelete = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_BASEURL;
      const book_id = book.id;
      const response = await axios.delete(`${apiUrl}/${book_id}`);
      bookStore.removeBook(book_id);

      toast({
        title: "Book deleted",
        variant: "default",
      });
    } catch (err) {
      toast({
        title: "Error deleting book",
        variant: "destructive",
      });
    }
  };

  const handleStatusChange = (
    new_status: "completed" | "to-read" | "in-progress"
  ) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_BASEURL;

      const book_id = book.id;
      const response = axios.put(`${apiUrl}/${book_id}`, {
        status: new_status,
      });
      bookStore.updateBookStatus(book_id, new_status);

      toast({
        title: "Status updated",
        variant: "default",
      });
    } catch (err) {
      toast({
        title: "Error updating status",
        variant: "destructive",
      });
    }
  };


    const handleNewTitleUpdate = (
      new_title:string
    ) => {


      setEditVisible(true)
      setNewTitle("")
      try {
        const apiUrl = process.env.NEXT_PUBLIC_BASEURL;

        const book_id = book.id;
        const response = axios.put(`${apiUrl}/update/${book_id}`, {
          title: new_title,
        });



        console.log(book,new_title)

        bookStore.updateBookTitle(book_id, new_title);

        toast({
          title: "title updated",
          variant: "default",
        });
      } catch (err) {
        toast({
          title: "Error updating title",
          variant: "destructive",
        });
      }
    };









  const statusOptions = ["completed", "to-read", "in-progress"].filter(
    (status) => status !== book.status
  );

  return (
    <div
      className={`
      w-full 
      p-4 
      flex 
      flex-row 
      justify-between 
      text-start 
      items-center
    `}
    >
      <div className="flex flex-row gap-2">

        {!editVisible && <Button onClick={()=> handleNewTitleUpdate(new_title)}>Update</Button>}
        {book.status !== "completed" && <Button onClick={()=> setEditVisible(!editVisible)} >{editVisible ? "edit" : "x"}</Button>}
        {!editVisible && <Input className="" placeholder="new title" onChange={(e) => setNewTitle(e.target.value)} />}
        <div>{index + 1}.</div>
        <div>{book.title}</div>
      </div>
      <div className={"flex flex-row gap-2 items-center"}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button>
              <BsThreeDotsVertical />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Book</DropdownMenuLabel>
            <DropdownMenuGroup>
              {statusOptions.map((item: string) => (
                <DropdownMenuItem key={item}>
                  <span
                    className="cursor-pointer"
                    onClick={() =>
                      handleStatusChange(
                        item as "completed" | "to-read" | "in-progress"
                      )
                    }
                  >
                    {item}
                  </span>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span
                  className="text-red-600 cursor-pointer"
                  onClick={handleDelete}
                >
                  Delete
                </span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
