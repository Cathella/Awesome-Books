class Book { 
  constructor(id, title, author) { 
    this.id = id; 
    this.title = title; 
    this.author = author;
  } 
}

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
