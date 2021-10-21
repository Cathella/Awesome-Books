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
    button.textContent = 'Remove';
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

  // show date function
  static showDate() {
    const { DateTime } = luxon; // eslint-disable-line
    const myDate = document.querySelector('#date');
    const showMyDate = document.createElement('div');
    showMyDate.innerHTML = DateTime.now().toLocaleString(DateTime.DATETIME_MED);
    myDate.appendChild(showMyDate);
  }
}

// display books list on window load
window.addEventListener('DOMContentLoaded', () => {
  Book.displayBooks();
  Book.showDate(); // Show date
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
  e.target.reset();
  return false;
});

// To remove a book event
document.getElementById('books-data').addEventListener('click', (e) => {
  Book.deleteBook(e.target);
  Book.removeBook(e.target.previousElementSibling.textContent);
});

const homeSection = document.getElementById('homeSection');
const listSection = document.getElementById('listSection');
const formSection = document.getElementById('formSection');
const contactSection = document.getElementById('contactSection');

const homeLink = document.getElementById('home');
const listLink = document.getElementById('list-books');
const formLink = document.getElementById('books-form');
const contactLink = document.getElementById('contact');

function homeLinkClick() {
  homeSection.style.display = 'block';
  listSection.style.display = 'none';
  formSection.style.display = 'none';
  contactSection.style.display = 'none';
  listLink.setAttribute('class', 'off');
  formLink.setAttribute('class', 'off');
  contactLink.setAttribute('class', 'off');
}

function listLinkClick() {
  homeSection.style.display = 'none';
  listSection.style.display = 'flex';
  formSection.style.display = 'none';
  contactSection.style.display = 'none';
  listLink.setAttribute('class', 'active');
  formLink.setAttribute('class', 'off');
  contactLink.setAttribute('class', 'off');
}

function formLinkClick() {
  homeSection.style.display = 'none';
  listSection.style.display = 'none';
  formSection.style.display = 'flex';
  contactSection.style.display = 'none';
  listLink.setAttribute('class', 'off');
  formLink.setAttribute('class', 'active');
  contactLink.setAttribute('class', 'off');
}

function contactLinkClick() {
  homeSection.style.display = 'none';
  listSection.style.display = 'none';
  formSection.style.display = 'none';
  contactSection.style.display = 'flex';
  listLink.setAttribute('class', 'off');
  formLink.setAttribute('class', 'off');
  contactLink.setAttribute('class', 'active');
}

homeLink.addEventListener('click', homeLinkClick);
listLink.addEventListener('click', listLinkClick);
formLink.addEventListener('click', formLinkClick);
contactLink.addEventListener('click', contactLinkClick);
