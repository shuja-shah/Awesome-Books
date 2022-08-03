const getAppended = document.getElementById("book-container");

class awesomeBooks {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

class userInterface {
  static displayBooks() {
    let books = storage.getData();

    const myBooks = books;
    myBooks.forEach((book) => {
      userInterface.addBookToList(book);
    });
  }
  static addBookToList(book) {
    const beAppended = document.createElement("div");
    beAppended.className = "kitab";
    beAppended.innerHTML = `
       <h4>${book.title}</h4> <span class = 'creator'>${book.author}</span>
       <p class="identity-book">${book.id}</p> 
       <button class = 'delete'>Delete</button>
       `;
    getAppended.appendChild(beAppended);
  }
  static clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
  }
}
class storage {
  static getData() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  static addition(book) {
    const books = storage.getData();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
  static remove(id) {
    const books = storage.getData();
    books.forEach((book, index) => {
      if (book.id === id) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

document.addEventListener("DOMContentLoaded", userInterface.displayBooks);

document.getElementById("form").addEventListener("submit", (e) => {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  let id = Math.floor(Math.random() * 1000) + 1;
  id.toString();
  e.preventDefault();
  const newBook = new awesomeBooks(title, author, id);
  userInterface.addBookToList(newBook);
  userInterface.clearFields();
  storage.addition(newBook);
});

getAppended.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  }

  const tity = parseInt(e.target.parentElement.children[2].innerText);
  storage.remove(tity);
});
