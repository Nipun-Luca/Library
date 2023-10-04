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


//Button to show modal containing the form
addBookButton.addEventListener("click", () => {
    showForm.showModal();
});

closeButton.addEventListener("click", () => {
    showForm.close();
});


//Clicking outside of dialog also closes it
//Reference: https://blog.webdevsimplified.com/2023-04/html-dialog/
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
//Reference


const form = document.querySelector("#showForm form");
form.addEventListener("submit", (e) => {
    e.preventDefault();

    //Get form values
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = parseInt(document.getElementById("pages").value);
    const read = document.getElementById("read").checked;

    //Create a new book and add it to the library
    const book = new Book(title, author, pages, read);
    Library.push(book);

    //Hide the form
    showForm.close();

    //Clear the form inputs
    form.reset();

    //Display the books in the table
    displayBooks();
});

function displayBooks() {
    //Clear the existing rows
    while (booksContainer.firstChild) {
        booksContainer.removeChild(booksContainer.firstChild);
    }

    //Loop through the library and display each book as a table row
    Library.forEach((book, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td><button class="read-button" data-index="${index}">${book.read ? 'READ' : 'UNREAD'}</button></td>
            <td><button class="delete" onclick="deleteBook(${index})">DELETE</button></td>
        `;

        //Add event listener to the read button
        const readButton = row.querySelector('.read-button');
        readButton.addEventListener('click', () => toggleReadStatus(index));

        //Style the read button
        if (book.read) {
            readButton.classList.add('read');
        } else {
            readButton.classList.add('unread');
        }

        booksContainer.appendChild(row);
    });
}

function toggleReadStatus(index) {
    //Toggle the read status for the book at the given index
    Library[index].read = !Library[index].read;

    //Update the displayed books
    displayBooks();
}

function deleteBook(index) {
    //Remove the book from the library
    Library.splice(index, 1);

    //Update the displayed books
    displayBooks();
}

//Initial display of books
displayBooks();

//Handle window resize
window.addEventListener('resize', displayBooks);
