const Library = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

const addBookButton = document.getElementById("addBook");
const modal = document.getElementById("myModal");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementsByClassName("close")[0];

// Display form
addBookButton.addEventListener("click", () => {
    modal.style.display = "block";
    overlay.style.display = "block";
});

// Close the form when clicking outside of it or the close button
overlay.addEventListener("click", closeModal);
closeBtn.addEventListener("click", closeModal);

function closeModal() {
    modal.style.display = "none";
    overlay.style.display = "none";
}

const form = document.querySelector("#myModal form");
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
    closeModal();

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
