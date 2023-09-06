const main = document.querySelector("main");

const myLibrary = [
  {
    title: "The Xenon's",
    author: "SpectreXen",
    pages: 69,
    read: true,
    index: 0,
  },
];

function Book(title, author, pages, read, index) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.index = index;
}

function createCards() {
  main.textContent = "";
  for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];

    const bookCard = document.createElement("div");
    const bookCardLeft = document.createElement("div");
    const bookCardTitle = document.createElement("p");
    const bookCardAuthor = document.createElement("p");
    const bookCardPages = document.createElement("p");
    const bookCardReadDiv = document.createElement("div");
    const bookCardReadText = document.createElement("p");
    const bookCardReadInput = document.createElement("input");
    const bookCardRemoveButt = document.createElement("button");
    const bookCardRemoveButtSpan = document.createElement("span");

    bookCard.classList.add("book");
    bookCardLeft.classList.add("left");
    bookCardReadDiv.classList.add("read");
    bookCardRemoveButt.classList.add("removeBook");
    bookCardRemoveButtSpan.classList.add("material-symbols-rounded");

    bookCard.appendChild(bookCardLeft);
    bookCard.appendChild(bookCardRemoveButt);

    bookCardLeft.appendChild(bookCardTitle);
    bookCardLeft.appendChild(bookCardAuthor);
    bookCardLeft.appendChild(bookCardPages);
    bookCardLeft.appendChild(bookCardReadDiv);
    bookCardReadDiv.appendChild(bookCardReadText);
    bookCardReadDiv.appendChild(bookCardReadInput);

    bookCardRemoveButt.appendChild(bookCardRemoveButtSpan);

    bookCardTitle.textContent = `Title: ${book.title}`;
    bookCardAuthor.textContent = `Author: ${book.author}`;
    bookCardPages.textContent = `Pages: ${book.pages}`;
    bookCardReadText.textContent = "Read";
    bookCardReadInput.setAttribute("type", "checkbox");
    if (book.read) {
      bookCardReadInput.setAttribute("checked", "");
    } else {
      bookCard.style.borderColor = "var(--not-read)";
    }
    bookCardReadInput.addEventListener("change", (e) => {
      if (bookCardReadInput.checked) {
        bookCard.style.borderColor = "var(--accent)";
        return;
      }
      bookCard.style.borderColor = "var(--not-read)";
    });

    bookCardRemoveButt.addEventListener("click", (event) => {
      event.preventDefault();
      myLibrary.splice(book.index, 1);
      myLibrary.forEach((book) => {
        if (book.index === 0) return;
        book.index--;
      });
      createCards();
    });
    bookCardRemoveButtSpan.textContent = "close";

    main.appendChild(bookCard);
  }
}

// Dialog
const dialog = document.getElementById("addBook");
const showDialogButt = document.getElementById("showDialog");
const closeDialogButt = document.getElementById("closeDialog");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readInput = document.getElementById("read");
const createBookButt = document.getElementById("createBook");

showDialogButt.addEventListener("click", () => {
  dialog.showModal();
  dialog.style.display = "block";
});

function closeDialog() {
  dialog.close();
  dialog.style.display = "none";
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  readInput.checked = false;
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeDialog();
});

closeDialogButt.addEventListener("click", (event) => {
  event.preventDefault();
  closeDialog();
});

createBookButt.addEventListener("click", (event) => {
  if (document.querySelector("form").checkValidity()) {
    event.preventDefault();
    myLibrary.push(
      new Book(
        titleInput.value,
        authorInput.value,
        parseInt(pagesInput.value),
        readInput.checked
      )
    );
    createCards();
    closeDialog();
  }
});

createCards();
