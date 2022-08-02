const getAppended = document.getElementById("book-container");

class awesomeBooks {
  constructor(title,author,id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

class userInterface{
  static displayBooks(){
    let books= storage.getData();
  
  
  const myBooks = books;
  myBooks.forEach((book) => {
    userInterface.addBookToList(book)}
    );
  }
    static addBookToList(book) {
      const beAppended = document.createElement('div');
      beAppended.className = 'kitab';
      beAppended.innerHTML = `
       <h2>${book.title}</h2> <span class = 'creator'>${book.author}</span>
       <p>${book.id}</p> 
       <button class = 'delete'>Delete</button>
       `;
      getAppended.appendChild(beAppended);
    } 
    static clearFields() {
      document.getElementById('title').value += '';
      document.getElementById('author').value += '';
    }
}
  class storage{
    static getData (){
      let books;
      if(localStorage.getItem('books') === null){
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }
      return books;
    }
    static addition (book){
      const books = storage.getData();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }
    static remove(id){
      const books = storage.getData();
      books.forEach((book, index) => {
        if(book.id === id){
          books.splice(index, 1);
        }
      }
      );
      localStorage.setItem('books', JSON.stringify(books));
    }
  }

  document.addEventListener('DOMContentLoaded', userInterface.displayBooks);

  //Now we utilize displaybooks methods to display added books.

  document.getElementById('form').addEventListener('submit', (e) => {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    let id = Math.floor(Math.random() * 1000) + 1;
    e.preventDefault();
    // Now we use our constructor from the book class.
    const newBook = new awesomeBooks(title, author ,id);
    
    // Now lets add this to our UserInterface.
    userInterface.addBookToList(newBook);
    userInterface.clearFields();
    storage.addition(newBook);
  });

  // Now we add a delete button to our list.
  getAppended.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
      e.target.parentElement.remove();
    }
    storage.remove(e.target.parentElement.previousElementSibling.textContent);
  }
  );
  
  
