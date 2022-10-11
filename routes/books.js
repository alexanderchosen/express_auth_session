const express = require('express')
const bookModel = require('../models/books')

const bookRouter = express.Router()

// get all books
bookRouter.get('/', (req, res) => {
    bookModel.find()
        .then(books => {
            res.render('books', { user: req.user, books })
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
})

// get a specific book by ID
bookRouter.get('/:id', (req, res) => {
    const id = req.params.id
    bookModel.findById(id)
        .then(book => {
            res.status(200).send(book)
        }).catch(err => {
            console.log(err)
            res.status(404).send(err)
        })
})

// create a new book
bookRouter.post('/', (req, res) => {
    const book = req.body
    book.lastUpdateAt = new Date() // set the lastUpdateAt to the current date
    bookModel.create(book)
        .then(book => {
            res.status(201).send(book)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
})

// update a book by ID
bookRouter.put('/:id', (req, res) => {
    const id = req.params.id
    const book = req.body
    book.lastUpdateAt = new Date() // set the lastUpdateAt to the current date
    bookModel.findByIdAndUpdate(id, book, { new: true })
        .then(newBook => {
            res.status(200).send(newBook)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
})

// delete a book by ID
bookRouter.delete('/:id', (req, res) => {
    const id = req.params.id
    bookModel.findByIdAndRemove(id)
        .then(book => {
            res.status(200).send(book)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
})


module.exports = bookRouter


