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

// Close the form when clicking outside of it
document.addEventListener("click", (event) => {
    if (!addBookForm.contains(event.target) && event.target !== addBookButton) {
        // Clicked outside the form, close it
        addBookForm.style.display = "none";
    }
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
    const booksContainer = document.querySelector(".books-container");

    // Clear the booksContainer
    booksContainer.innerHTML = '';

    // Loop through the library and display each book
    myLibrary.forEach(book => {
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
