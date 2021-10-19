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
        books = []; } 
        else { 
            books = JSON.parse(localStorage.getItem('books')); 
    } 
    return books; 
} 
