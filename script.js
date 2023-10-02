const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

const addBookButton = document.getElementById("addBook");
const addBookForm = document.getElementById("addBookForm");
const booksContainer = document.querySelector(".books-container");

addBookButton.addEventListener("click", () => {
    // Show the form
    addBookForm.style.display = "block";
});

const form = document.querySelector("#addBookForm form");
form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form values
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = parseInt(document.getElementById("pages").value);
    const read = document.getElementById("read").checked;

    // Create a new book and add it to the library
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);

    // Hide the form
    addBookForm.style.display = "none";

    // Clear the form inputs
    form.reset();

    // Display the updated library
    displayBooks();
});

function displayBooks() {
    // Clear the booksContainer
    booksContainer.innerHTML = '';

    // Loop through the library and display each book
    myLibrary.forEach(book => {
        // Create a new div for each book
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book"); // Add the "book" class to the div

        // Create a single line for book properties
        bookDiv.innerHTML = `
            <div class="property">Title: ${book.title}</div>
            <div class="property">Author: ${book.author}</div>
            <div class="property">Pages: ${book.pages}</div>
            <div class="property">Read: ${book.read ? 'Yes' : 'No'}</div>
        `;

        // Append the book div to the booksContainer
        booksContainer.appendChild(bookDiv);
    });
}

