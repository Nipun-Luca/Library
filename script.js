const Library = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

const addBookButton = document.getElementById("addBook");
const showForm = document.getElementById("showForm");
const closeButton = document.getElementById("closeButton");
const booksContainer = document.querySelector(".books-container");

addBookButton.addEventListener("click", () => {
    showForm.showModal();
});

closeButton.addEventListener("click", () => {
    showForm.close();
});

// Close the dialog when clicking outside of the popup
showForm.addEventListener("click", (e) => {
    const dialogDimensions = showForm.getBoundingClientRect();
    if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
    ) {
        showForm.close();
    }
});

const form = document.querySelector("#showForm form");
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
    showForm.close();

    // Clear the form inputs
    form.reset();

    // Display the newly added book
    displayBook(book);
});

function displayBook(book) {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");

    const titleDiv = document.createElement("div");
    titleDiv.classList.add("property");
    titleDiv.textContent = `Title: ${book.title}`;
    bookDiv.appendChild(titleDiv);

    const authorDiv = document.createElement("div");
    authorDiv.classList.add("property");
    authorDiv.textContent = `Author: ${book.author}`;
    bookDiv.appendChild(authorDiv);

    const pagesDiv = document.createElement("div");
    pagesDiv.classList.add("property");
    pagesDiv.textContent = `Pages: ${book.pages}`;
    bookDiv.appendChild(pagesDiv);

    const readDiv = document.createElement("div");
    readDiv.classList.add("property");
    const readButton = document.createElement("button");
    readButton.classList.add("read-toggle");
    readButton.textContent = book.read ? 'Yes' : 'No';
    readButton.addEventListener("click", () => {
        book.read = !book.read;
        readButton.textContent = book.read ? 'Yes' : 'No';
    });
    readDiv.appendChild(readButton);
    bookDiv.appendChild(readDiv);

    const deleteDiv = document.createElement("div");
    deleteDiv.classList.add("property");
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-book");
    deleteButton.textContent = "X";
    deleteButton.addEventListener("click", () => {
        const index = Library.indexOf(book);
        if (index !== -1) {
            Library.splice(index, 1);
            booksContainer.removeChild(bookDiv);
        }
    });
    deleteDiv.appendChild(deleteButton);
    bookDiv.appendChild(deleteDiv);

    booksContainer.appendChild(bookDiv);
}

// Function to display all books in the Library
function displayBooks() {
    booksContainer.innerHTML = '';
    Library.forEach((book) => {
        displayBook(book);
    });
}

// Initial display of books
displayBooks();
