const getAppended = document.getElementById('book-container');
class AwesomeBooks {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }

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
    const books = AwesomeBooks.getData();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static remove(id) {
    const books = AwesomeBooks.getData();
    books.forEach((book, index) => {
      if (book.id === id) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }

  static displayBooks() {
    const books = AwesomeBooks.getData();
    const myBooks = books;
    myBooks.forEach((book) => {
      AwesomeBooks.addBookToList(book);
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
document.addEventListener('DOMContentLoaded', AwesomeBooks.displayBooks());
document.getElementById('form').addEventListener('submit', (e) => {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const id = Math.floor(Math.random() * 1000) + 1;
  id.toString();
  e.preventDefault();
  const newBook = new AwesomeBooks(title, author, id);
  AwesomeBooks.addBookToList(newBook);
  AwesomeBooks.clearFields();
  AwesomeBooks.addition(newBook);
});
getAppended.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.remove();
  }
  const tity = parseInt(e.target.parentElement.children[2].innerText, 10);
  AwesomeBooks.remove(tity);
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
const displayDate = document.querySelector('.time');
const realTime = () => {
  const date = new Date();
  const dateOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };

  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  };

  const currentDate = date.toLocaleDateString('en-GB', dateOptions);
  const currentTime = date.toLocaleTimeString('en-GB', timeOptions);
  displayDate.innerHTML = `${currentDate} ${currentTime}`;

  setTimeout(() => { realTime(); }, 1000);
};

realTime();
