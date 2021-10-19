// book class and constructor
class Book { 
  constructor(id, title, author) { 
    this.id = id; 
    this.title = title; 
    this.author = author;
  } 
}

// get books from localstorage
const getBooks = () => { 
  let books;

  if (localStorage.getItem('books') === null) { 
    books = []; 
	} else { 
    books = JSON.parse(localStorage.getItem('books')); 
  } 
  
	return books; 
}

// function to add a new book to the collection, with title and author.
const addBook = (book) => {
  const books = getBooks();
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
}

// add submit book to browser view
const addBookToList = (book) => {
  const list = document.getElementById("bookList");

  const row = document.createElement("div");
  row.innerHTML = `
    <div>
    <div>${book.title}</div>
    <div>${book.author}</div>
    <div class="hidden">${book.id}</div>
    <button class="delete">Remove</button>
    <hr>
    </div>
  `;

  list.appendChild(row);
}

// display books
const displayBooks = () => {
  const books = getBooks();
  books.forEach((book) => addBookToList(book));
}

// remove book from browser view
const deleteBook = (el) => {
  if (el.classList.contains('delete'));
  el.parentElement.remove();
}

// delete book from local storage
const removeBook = (id) => {
  const books = getBooks();

  books.forEach((book, index) => {
    if(book.id === id) {
      books.splice(index, 1);
    }
  });

  localStorage.setItem('books', JSON.stringify(books));
}

// display books list on window load
window.addEventListener('DOMContentLoaded', function() {
  displayBooks();
})

// Add book Event
document.getElementById("form").addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const id = `${title}${author}`;

  const book = new Book(id, title, author);
  addBookToList(book);
  addBook(book);
})

// To remove a book event
document.getElementById("bookList").addEventListener("click",  (e) => {
  deleteBook(e.target);
  removeBook(e.target.previousElementSibling.textContent);
});
