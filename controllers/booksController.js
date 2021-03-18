const catchAsync = require("../error/catchAsync");

function booksController(Book) {
  // function saveNewBook(req, res) {
  //   /* insert a books into book db */
  //   const book = new Book(req.body);
  //   if (!req.body.title) {
  //     res.status(400);
  //     return res.send("Title is required");
  //   }
  //   book.save();
  //   res.status(201);
  //   return res.json(book);
  // }
  const saveNewBook = catchAsync(async (req, res, next) => {
    const book = new Book(req.body);
    if (!req.body.title) {
      return res.status(400).json({
        message: "Title is required",
        status: "Bad Request",
        data: [],
      });
    }
    const booksDetails = await book.save();
    res.status(201);
    return res.json(booksDetails);
  });
  const getAllBooks = catchAsync(async (req, res, next) => {
    /* filter books by query string */
    const query = {};
    // this condtion for manage default books if query entered worng in url
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    const books = await Book.find(query, (err, books) => {
      if (err) {
        return next(new AppError("No book found with that ID", 404));
      }
      const returnBooks = books.map((book) => {
        const newBook = book.toJSON();
        newBook.links = {};
        newBook.links.self = `http://${req.headers.host}/api/books/${book._id}`;
        return newBook;
      });
      return res.status(200).json({
        status: "success",
        data: returnBooks,
      });
      // return res.json(returnBooks);
    });
    // console.log("------------- testing......", books);
  });
  //   /* filter books by query string */
  //   const query = {};
  //   // this condtion for manage default books if query entered worng in url
  //   if (req.query.genre) {
  //     query.genre = req.query.genre;
  //   }
  //   Book.find(query, (err, books) => {
  //     if (err) {
  //       return res.send(err);
  //     }
  //     console.log("------------- getting error ", err);
  //     const returnBooks = books.map((book) => {
  //       const newBook = book.toJSON();
  //       newBook.links = {};
  //       newBook.links.self = `http://${req.headers.host}/api/books/${book._id}`;
  //       return newBook;
  //     });
  //     return res.json(null);
  //   });
  // }

  return { getAllBooks, saveNewBook };
}

module.exports = booksController;
