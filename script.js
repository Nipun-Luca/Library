const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

const addBookButton = document.getElementById("addBook");
const addBookForm = document.getElementById("addBookForm");

addBookButton.addEventListener("click", () => {
    // Show the form
    addBookForm.style.display = "block";
});

const form = document.querySelector("#addBookForm form");
form.addEventListener("submit", (e) => {
    // Get form values
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = parseInt(document.getElementById("pages").value);
    const read = document.getElementById("read").checked;

    // Validate form fields manually
    if (!title || !author || isNaN(pages)) {
        alert("Please fill in all required fields.");
    } else {
        // Create a new book and add it to the library
        const book = new Book(title, author, pages, read);
        myLibrary.push(book);

        // Hide the form
        addBookForm.style.display = "none";

        // Clear the form inputs
        form.reset();

        // Display the updated library
        displayBooks();
    }

    e.preventDefault(); // Prevent the default form submission
});

function displayBooks() {
    const booksContainer = document.querySelector(".books-container");

    // Clear the booksContainer
    booksContainer.innerHTML = "";

    // Loop through the library and display each book
    myLibrary.forEach(book => {
        const bookInfo = document.createElement("div");
        bookInfo.textContent = `Title: ${book.title}, Author: ${book.author}, Pages: ${book.pages}, Read: ${book.read ? 'Yes' : 'No'}`;
        booksContainer.appendChild(bookInfo);
    });
}
