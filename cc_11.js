// Task 1 - Created Book Class
class Book {
    constructor(title, author, isbn, copies) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.copies = copies;
    }

    getDetails() {
        return `Title: ${this.title}, Author: ${this.author}, ISBN: ${this.isbn}, Copies: ${this.copies}`;
    }

    updateCopies(quantity) {
        this.copies += quantity;
    }
}

// Test Cases
const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 123456, 5);
console.log(book1.getDetails());

book1.updateCopies(-1);
console.log(book1.getDetails());

// Task 2 - Created Borrower Class
class Borrower {
    constructor(name, borrowerId) {
        this.name = name;
        this.borrowerId = borrowerId;
        this.borrowedBooks = [];
    }

    borrowBook(bookTitle) {
        this.borrowedBooks.push(bookTitle);
    }

    returnBook(bookTitle) {
        this.borrowedBooks = this.borrowedBooks.filter(title => title !== bookTitle);
    }
}

// Test Cases
const borrower1 = new Borrower("Alice Johnson", 201);
borrower1.borrowBook("The Great Gatsby");
console.log(borrower1.borrowedBooks);

borrower1.returnBook("The Great Gatsby");
console.log(borrower1.borrowedBooks);

// Task 3 - Created Library Class
class Library {
    constructor() {
        this.books = [];
        this.borrowers = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    listBooks() {
        this.books.forEach(book => console.log(book.getDetails()));
    }
}

// Test Cases
const library = new Library();
library.addBook(book1);
library.listBooks();

// Task 4 - Implemented Book Borrowing
Library.prototype.lendBook = function(borrowerId, isbn) {
    let book = this.books.find(b => b.isbn === isbn);
    let borrower = this.borrowers.find(b => b.borrowerId === borrowerId);

    if (book && book.copies > 0 && borrower) {
        book.updateCopies(-1);
        borrower.borrowBook(book.title);
    }
};

// Adding borrower to library for testing
library.borrowers.push(borrower1);

// Test Cases
library.lendBook(201, 123456);
console.log(book1.getDetails());
console.log(borrower1.borrowedBooks);

// Task 5 - Implemented Book Returns
Library.prototype.returnBook = function(borrowerId, isbn) {
    let book = this.books.find(b => b.isbn === isbn);
    let borrower = this.borrowers.find(b => b.borrowerId === borrowerId);

    if (book && borrower) {
        book.updateCopies(1);
        borrower.returnBook(book.title);
    }
};

// Test Cases
library.returnBook(201, 123456);
console.log(book1.getDetails());
console.log(borrower1.borrowedBooks);
