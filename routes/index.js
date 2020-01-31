module.exports = (app, Book) => {
    // GET
    app.get("/api/books", (req, res) => {
        Book.find((err, books) => {
            if (err) return res.status(500).send({ error: "database failure" });

            res.json(books);
        });
    });

    app.get("/api/books/:book_id", (req, res) => {
        Book.findOne({ _id: req.params.book_id }, (err, books) => {
            if (err) return res.status(500).send({ error: err });

            if (!book) return res.status(404).send({ error: "book not found" });
            res.json(book);
        });
    });

    app.get("/api/books/author/:author", (req, res) => {
        Book.find({ author: req.params.author }, (err, books) => {
            if (err) return res.status(500).send({ error: err });

            if (books.length === 0)
                return res.status(404).send({ error: "book not found" });
            res.json(books);
        });
    });

    // POST
    app.post("/api/books", (req, res) => {
        let book = new Book();
        book.title = req.body.name;
        book.author = req.body.author;
        book.published_date = new Date(req.body.published_date);

        book.save(err => {
            if (err) {
                console.log(err);
                res.json({ result: 0 });
                return;
            }

            res.json({ result: 1 });
        });
    });

    //PUT
    app.put("/api/books/:book_id", (req, res) => {
        // Book.findById(req.params.book_id, (err, book) => {
        //     if (err) return res.status(500).send({ error: "database failure" });
        //     if (!book) return res.status(404).send({ error: "book not found" });

        //     let { title, author, published_date } = req.body;
        //     if (title) book.title = title;
        //     if (author) book.author = author;
        //     if (published_date) book.published_date = published_date;

        //     book.save(err => {
        //         if (err)
        //             return res.status(500).send({ error: "failed to upload" });
        //         res.json({ message: "book upload" });
        //     });
        // });

        Book.upadte(
            { _id: req.parmas.book_id },
            { $set: req.body },
            (err, output) => {
                if (err)
                    return res.status(500).send({ error: "database failure" });
                if (!output.n)
                    return res.status(404).send({ error: "book not found" });

                console.log(output);
                res.json({ message: "book upload" });
            }
        );
    });

    //DELETE
    app.delete("/api/books/:book_id", (req, res) => {
        Book.remove({ _id: req.params.book_id }, (err, output) => {
            if (err) return res.status(500).send({ error: "database failure" });
            if (!output.n)
                return res.status(404).send({ error: "book not found" });

            res.json({ message: "book deleted" });
            res.status(204).end();
        });
    });
};
