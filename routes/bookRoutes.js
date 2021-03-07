const express = require("express");
const booksController = require("../controllers/booksController");
function routes(Book) {
  const bookRouter = express.Router();
  const contoller = booksController(Book);
  //get all books
  bookRouter
    .route("/books") /* get all books from db */
    .post(contoller.post)
    .get(contoller.get);
  // Code cleanup by middleware for particular router
  bookRouter.use("/books/:bookId", (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        return res.send(err);
      }
      if (book) {
        req.book = book;
        return next();
      }
      return res.sendStatus(404);
    });
  });
  bookRouter
    .route("/books/:bookId")
    .get((req, res) => res.json(req.book)) // after code cleanup  /* get one book item from  mongoDb by qruer params */

    //befor code clean
    // .get((req, res) => {
    //   // const { query } = req;
    //   const { bookId } = req.params;
    //   console.log("--------get--------------");
    //   Book.findById(bookId, (err, book) => {
    //     if (err) {
    //       return res.send(err);
    //     }
    //     return res.json(book);
    //   });
    // })
    .put((req, res) => {
      /* update books details*/
      console.log("----------Put replace an item---------");
      const { title, author, read, genre } = req.body;
      const { book } = req;
      book.title = title;
      book.author = author;
      book.read = read;
      book.genre = genre;
      // book.save();
      // return res.json(book);
      book.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(book);
      });
    })
    .patch((req, res) => {
      /* update one or manay books details pas keys and values into body */
      console.log("----------patch only chnages a piece-----------");
      const { book } = req;
      if (req.body._id) {
        delete req.body._id;
      }
      Object.keys(req.body).forEach((key) => {
        book[key] = req.body[key];
      });

      book.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(book);
      });
    })
    .delete((req, res) => {
      req.book.remove((err) => {
        if (err) {
          return res.send(err);
        }
        return res.sendStatus(204);
      });
    });

  return bookRouter;
}

// eslint-disable-next-line no-undef
module.exports = routes;
