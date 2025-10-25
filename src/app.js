import express, { json } from "express";

const app = express();
app.use(json());

const books = [
  { id: 1, title: "Top Gun" },
  { id: 2, title: "Spider Man" },
  { id: 3, title: "Matrix" },
];

function getBook(id) {
  const numericId = Number(id);
  return books.findIndex((book) => book.id === numericId);
}

app.get("/", (req, res) => {
  res.status(200).send("Curso de MongoDB");
});

app.get("/books", (req, res) => {
  res.status(200).json(books);
});

app.get("/books/:id", (req, res) => {
  const id = req.params.id;
  const index = getBook(id);

  res.status(200).json(books[index]);
});

app.post("/books", (req, res) => {
  books.push(req.body);
  res.status(201).send("book registered");
});

app.put("/books/:id", (req, res) => {
  const idParam = req.params.id;
  const index = getBook(idParam);

  if (index !== -1) {
    books[index].title = req.body.title;
    res.status(200).send("updated book!");
  } else {
    res.status(404).send("book not fould.");
  }
});

app.delete("/books/:id", (req, res) => {
  const idParam = req.params.id;
  const index = getBook(idParam);

  books.splice(index, 1);
  res.status(200).send("deleted book");
});

export default app;
