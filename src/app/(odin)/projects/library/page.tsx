"use client";

import Card from "@/components/shared/Card";
import MyDrawer from "@/components/shared/Drawer";
import { Button } from "@/components/SignUpForm/Button";
import classNames from "@/functions/classNames";
import { useToast } from "@/hooks/use-toast";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Book } from "@/types/Book";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

type AddBookFormProps = {
  addBook: (book: Book) => void;
  setDrawerOpen: (open: boolean) => void;
};

const AddBookForm = ({ addBook, setDrawerOpen }: AddBookFormProps) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [pages, setPages] = useState(0);
  const [read, setRead] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addBook({
      id: Math.floor(Math.random() * 1000),
      title,
      author,
      description,
      pages,
      read,
    });
    setDrawerOpen(false);
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <div className="text-lg font-semibold text-gray-800">Title</div>
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded-lg"
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="text-lg font-semibold text-gray-800">Author</div>
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded-lg"
        onChange={(e) => setAuthor(e.target.value)}
      />
      <div className="text-lg font-semibold text-gray-800">Description</div>

      <textarea
        className="w-full p-2 border border-gray-300 rounded-lg"
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="text-lg font-semibold text-gray-800">Pages</div>
      <input
        type="number"
        min={0}
        className="w-full p-2 border border-gray-300 rounded-lg"
        onChange={(e) => setPages(parseInt(e.target.value))}
      />
      <div className="flex gap-2 items-center my-3">
        <div className="text-lg font-semibold text-gray-800">Read</div>
        <input
          type="checkbox"
          className="p-2 w-5 h-5 border border-gray-300 rounded-lg"
          onChange={(e) => setRead(e.target.checked)}
        />
      </div>

      <Button
        type="submit"
        className="bg-emerald-600 hover:bg-emerald-700 text-xl py-6"
      >
        Add book
      </Button>
    </form>
  );
};

const BookCard = ({
  book,
  updateReadStatus,
  deleteBook,
}: {
  book: Book;
  updateReadStatus: (id: number) => void;
  deleteBook: (id: number) => void;
}) => {
  return (
    <div
      key={book.id}
      className={classNames(
        "bg-white shadow-lg rounded-lg   h-full min-h-fit flex flex-col border border-gray-200"
      )}
    >
      <div
        className={classNames(
          "w-full h-12 rounded-t-lg",
          book?.read ? "bg-emerald-200" : "bg-gray-100"
        )}
      />
      <div className={classNames("flex flex-col  p-8 rounded-lg gap-2 w-full")}>
        <div className="w-full flex justify-end">
          <TrashIcon
            className="h-6 w-6 text-gray-800 cursor-pointer"
            onClick={() => deleteBook(book.id)}
          />
        </div>
        <div className="text-lg font-semibold text-gray-800">{book.title}</div>
        <div className="text-md text-gray-600">{book.author}</div>
        <div className="text-sm text-gray-500">{book.description}</div>
        <div className="text-md text-gray-600">{book.pages} pages</div>

        <Button
          className={classNames(
            book.read
              ? "bg-gray-700 hover:bg-gray-800"
              : "bg-emerald-600 hover:bg-emerald-700",
            "text-white w-fit"
          )}
          onClick={() => updateReadStatus(book.id)}
        >
          {book.read ? "Mark as not read" : "Mark as read"}
        </Button>
      </div>
    </div>
  );
};

const Library = () => {
  const { toast } = useToast();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [books, setBooks] = useLocalStorage<Book[]>("books", [
    {
      id: 1,
      title: "The Hobbit",
      description:
        "The Hobbit, or There and Back Again is a children's fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction. The book remains popular and is recognized as a classic in children's literature.",
      author: "J.R.R. Tolkien",
      pages: 310,
      read: false,
    },
    {
      id: 2,
      title: "The Great Gatsby",
      description:
        "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.",
      author: "F. Scott Fitzgerald",
      pages: 180,
      read: false,
    },
    {
      id: 3,
      title: "The Catcher in the Rye",
      description:
        "The Catcher in the Rye is a novel by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951. It was originally intended for adults but is often read by adolescents for its themes of angst, alienation, and as a critique on superficiality in society.",
      author: "J.D. Salinger",
      pages: 220,
      read: false,
    },
  ]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Prevent rendering on the server
    return null;
  }

  const updateReadStatus = (id: number) => {
    setBooks(
      books.map((book) =>
        book.id === id ? { ...book, read: !book.read } : book
      )
    );
    toast({
      title: "Read status updated",
      description: "The status of the book has been updated",
    });
  };

  const deleteBook = (id: number) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      setBooks(books.filter((book) => book.id !== id));
      toast({
        title: "Book deleted",
        description: "The book has been deleted",
      });
    }
  };

  const addBook = (book: Book) => {
    setBooks([...books, book]);
    toast({
      title: "Book added",
      description: "The book has been added to the library",
    });
  };

  return (
    <Card>
      <div className="w-full h-full flex flex-col">
        <h1 className="text-center text-3xl font-bold italic text-gray-600">
          Library
        </h1>

        <div className="w-full flex justify-end">
          <div className="flex flex-col gap-2">
            <div className="text-center text-xl font-bold italic text-gray-600">
              Books: {books.length}
            </div>
            <div>
              <div className="text-center text-xl font-bold italic text-gray-600">
                Read: {books.filter((book) => book.read).length}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-end mt-8">
          <Button onClick={() => setDrawerOpen(true)}>Add a new book</Button>
        </div>

        <div className="flex w-full mt-8">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
            {books &&
              books.length > 0 &&
              books.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  updateReadStatus={updateReadStatus}
                  deleteBook={deleteBook}
                />
              ))}
          </div>
        </div>

        {drawerOpen && (
          <MyDrawer
            open={drawerOpen}
            setOpen={setDrawerOpen}
            title="Add a new book"
          >
            <AddBookForm addBook={addBook} setDrawerOpen={setDrawerOpen} />
          </MyDrawer>
        )}
      </div>
    </Card>
  );
};

export default Library;
