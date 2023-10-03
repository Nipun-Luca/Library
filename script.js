const Library = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

const addBookButton = document.getElementById("addBook");
const addBookForm = document.getElementById("showForm");
const closeButton = document.getElementById("closeButton");

addBookButton.addEventListener("click", () => {
    addBookForm.showModal();
});

closeButton.addEventListener("click", () => {
    addBookForm.close();
});

// Close the dialog when clicking outside of the popup
window.addEventListener("click", (e) => {
    if (e.target === addBookForm) {
        addBookForm.close();
    }
});

const form = document.querySelector("#showForm #formContainer form");
form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form values
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = parseInt(document.getElementById("pages").value);
    const read = document.getElementById("read").checked;

    // Create a new book and add it to the library
    const book = new Book(title, author, pages, read);
    Library.push(book);

    // Hide the form
    addBookForm.close();

    // Clear the form inputs
    form.reset();

    displayBooks();
});

function displayBooks() {
    const booksContainer = document.querySelector(".books-container");

    // Clear booksContainer
    booksContainer.innerHTML = '';

    // Loop through the library and display each book
    Library.forEach(book => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");

        bookDiv.innerHTML = `
            <div class="property">Title: ${book.title}</div>
            <div class="property">Author: ${book.author}</div>
            <div class="property">Pages: ${book.pages}</div>
            <div class="property">Read: ${book.read ? 'Yes' : 'No'}</div>
        `;

        booksContainer.appendChild(bookDiv);
    });
}