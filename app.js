// book class - represents a book
class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }

  // get books from localstorage
  static getBooks = () => {
    let books;

    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  };

  // display books
  static displayBooks = () => {
    const books = Book.getBooks();
    books.forEach((book) => Book.addBookToList(book));
  };

  // add submitted book to browser view
  static addBookToList = (book) => {
    const list = document.getElementById('books-data');
    const button = document.createElement('button');
    const li = document.createElement('li');
    li.innerHTML = `
   <p>"${book.title}"  by  ${book.author}</p>
   <div hidden>${book.id}</div>`;
    list.append(li);
    li.append(button);
    button.setAttribute('class', 'delete');
    button.textContent = 'Delete';
    list.appendChild(li);
  };

  // delete book from the browser view
  static deleteBook = (el) => {
    if (el.classList.contains('delete'));
    el.parentElement.remove();
  };

  // function to add a new book to the collection, with title and author.
  static addBook = (book) => {
    const books = Book.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  };

  // delete book from local storage
  static removeBook = (id) => {
    const books = Book.getBooks();

    books.forEach((book, index) => {
      if (book.id === id) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  };
}

// display books list on window load
window.addEventListener('DOMContentLoaded', () => {
  Book.displayBooks();
});

// Add book Event
document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const id = `${title}${author}`;

  const book = new Book(id, title, author);
  Book.addBookToList(book);
  Book.addBook(book);
});

// To remove a book event
document.getElementById('books-data').addEventListener('click', (e) => {
  Book.deleteBook(e.target);
  Book.removeBook(e.target.previousElementSibling.textContent);
});
