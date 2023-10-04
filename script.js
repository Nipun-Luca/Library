const Library = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
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

    // Display the books in the table
    displayBooks();
});

function displayBooks() {
    // Clear the existing rows
    while (booksContainer.firstChild) {
        booksContainer.removeChild(booksContainer.firstChild);
    }

    // Loop through the library and display each book as a table row
    Library.forEach((book, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td>${book.read ? 'Yes' : 'No'}</td>
            <td><button onclick="deleteBook(${index})">Delete</button></td>
        `;
        booksContainer.appendChild(row);
    });
}

function deleteBook(index) {
    // Remove the book from the library
    Library.splice(index, 1);
    
    // Update the displayed books
    displayBooks();
}

// Initial display of books
displayBooks();
