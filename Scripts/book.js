*/ eslint-disable max-classes-per-file */

const getAppended = document.getElementById('book-container');
class AwesomeBooks {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}
class storage {
  static getData() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }
  static addition(book) {
    const books = storage.getData();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }
  static remove(id) {
    const books = storage.getData();
    books.forEach((book, index) => {
      if (book.id === id) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}
class userInterface {
  static displayBooks() {
    const books = storage.getData();
    const myBooks = books;
    myBooks.forEach((book) => {
      userInterface.addBookToList(book);
    });
  }
  static addBookToList(book) {
    const beAppended = document.createElement('div');
    beAppended.className = 'kitab';
    beAppended.innerHTML = `
       <h4>${book.title}</h4> <span class = 'creator'>${book.author}</span>
       <p class="identity-book">${book.id}</p>
       <button class = 'delete'>Delete</button>
       `;
    getAppended.appendChild(beAppended);
  }
  static clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
  }
}
document.addEventListener('DOMContentLoaded', userInterface.displayBooks);
document.getElementById('form').addEventListener('submit', (e) => {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const id = Math.floor(Math.random() * 1000) + 1;
  id.toString();
  e.preventDefault();
  const newBook = new AwesomeBooks(title, author, id);
  userInterface.addBookToList(newBook);
  userInterface.clearFields();
  storage.addition(newBook);
});
getAppended.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.remove();
  }
  const tity = parseInt(e.target.parentElement.children[2].innerText, 10);
  storage.remove(tity);
});
const getList = document.querySelector('.list');
const getAddNew = document.querySelector('.add_new');
const getContact = document.querySelector('.contact');
getList.addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('.add-block').style.visibility = 'hidden';
  document.querySelector('.add-block').style.position = 'absolute';
  document.querySelector('.contactsection').style.visibility = 'hidden';
  document.querySelector('.contactsection').style.position = 'absolute';
  document.querySelector('.list-block').style.position = 'relative';
  document.querySelector('.list-block').style.visibility = 'visible';
  document.querySelectorAll('header a').forEach((item) => {
    item.classList.remove('active');
  });
  e.target.classList.toggle('active');
});
getAddNew.addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('.list-block').style.visibility = 'hidden';
  document.querySelector('.list-block').style.position = 'absolute';
  document.querySelector('.contactsection').style.visibility = 'hidden';
  document.querySelector('.contactsection').style.position = 'absolute';
  document.querySelector('.add-block').style.position = 'relative';
  document.querySelector('.add-block').style.visibility = 'visible';
  document.querySelectorAll('header a').forEach((item) => {
    item.classList.remove('active');
  });
  e.target.classList.toggle('active');
});
getContact.addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('.list-block').style.visibility = 'hidden';
  document.querySelector('.list-block').style.position = 'absolute';
  document.querySelector('.add-block').style.visibility = 'hidden';
  document.querySelector('.add-block').style.position = 'absolute';
  document.querySelector('.contactsection').style.position = 'relative';
  document.querySelector('.contactsection').style.visibility = 'visible';
  document.querySelectorAll('header a').forEach((item) => {
    item.classList.remove('active');
  });
  e.target.classList.toggle('active');
});