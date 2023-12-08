import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import React, { useState, useEffect } from "react";
import useBooksStore from "@/app/zustand/books";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { EnvelopeOpenIcon } from "@radix-ui/react-icons";

const FormSchema = z.object({
  title: z.string().min(1, {
    message: "Title must be at least 1 characters.",
  }),
});

interface AddBookDialogProps {
  active: boolean;
  setActive: (value: boolean) => void;
}

const AddBookDialog: React.FC<AddBookDialogProps> = ({ active, setActive }) => {
  const [visible, setvisible] = useState(false);

  useEffect(() => {
    active && setvisible(true);
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const url = process.env.NEXT_PUBLIC_BASEURL as string;

      const book = { title: data.title };
      const response = await axios.post(url, book);

      // console.log(response);
      bookStore.addBook(response.data);

      toast({
        title: "Success @ Book Add:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <div className="text-white">
              {JSON.stringify(
                `Book with the title: ${data.title} Added`,
                null,
                2
              )}
            </div>
          </pre>
        ),
      });

      setvisible(false);
      form.reset({
        title: "",
      });
    } catch (err) {
      toast({
        title: "Error @ Book Add:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <div className="text-white">
              {JSON.stringify(
                `Error with Adding a Book with the title: ${data.title}`,
                null,
                2
              )}
            </div>
          </pre>
        ),
      });
    }
  }

  const bookStore = useBooksStore();

  return (
    <AlertDialog open={visible} onOpenChange={setvisible}>
      <AlertDialogTrigger>
        <Button className="w-48">Add a Book</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Welcome to Book Tracker</AlertDialogTitle>
          <AlertDialogDescription>
            "A reader lives a thousand lives before he dies. The man who never
            reads lives only one." - George R.R. Martin
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* <AlertDialogContent> */}

        <Form {...form}>
          <form className="w-full space-y-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="title"
                      className="no-focus"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={form.handleSubmit(onSubmit)}>
                Add
              </AlertDialogAction>
              {/* <Button type="submit">Add</Button> */}
            </AlertDialogFooter>
          </form>
        </Form>

        {/* </AlertDialogContent> */}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddBookDialog;
