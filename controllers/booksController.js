function booksController(Book) {
  function post(req, res) {
    /* insert a books into book db */
    const book = new Book(req.body);
    if (!req.body.title) {
      res.status(400);
      return res.send("Title is required");
    }
    book.save();
    res.status(201);
    return res.json(book);
  }

  function get(req, res) {
    /* filter books by query string */
    const query = {};
    // this condtion for manage default books if query entered worng in url
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    Book.find(query, (err, books) => {
      if (err) {
        return res.send(err);
      }
      return res.json(books);
    });
  }

  return { get, post };
}

module.exports = booksController;
