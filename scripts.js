let myLibrary = [];

function Book(title, author, pages, read) {
  this.Title = title;
  this.Author = author;
  this.Pages = pages;
  this.Read = read ? "Already read" : "Not read yet";
}

Book.prototype.info = function () {
  const r = read ? "already read" : "not read yet";
  return `${title} by ${author}, ${pages} pages, ${r}`;
};

function addBookToLibrary(data) {
  const b = new Book(data[0], data[1], data[2], data[3]);
  myLibrary.push(b);
  displayBooks(myLibrary);
}

const btn = document.querySelector(".addBtn");

function displayBooks(colection) {
  if (document.querySelector(".bookContainer") != null) {
    const d = document.querySelector(".bookContainer");
    d.remove();
  }
  const body = document.querySelector("body");
  const container = document.createElement("div");
  container.classList.toggle("bookContainer");
  myLibrary.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.toggle("bookCard");
    const removeBtn = document.createElement("button");
    removeBtn.classList.toggle("removeBtn");
    removeBtn.id = book.Title;
    removeBtn.textContent = "Remove";
    const readBtn = document.createElement("button");
    readBtn.classList.toggle("toogleBtn");
    readBtn.textContent = "Read";
    bookCard.appendChild(readBtn);
    bookCard.appendChild(removeBtn);
    const infoList = document.createElement("ul");
    const datos = ["Title", "Author", "Pages", "Read"];
    datos.forEach((key) => {
      const li = document.createElement("li");
      li.textContent = `${key}: ${book[key]}`;
      infoList.appendChild(li);
    });
    bookCard.appendChild(infoList);
    container.appendChild(bookCard);
  });
  body.insertBefore(container, btn);
  addListeners();
  addReadToggle();
}

btn.addEventListener("click", toggleForm);

function toggleForm() {
  const form = document.querySelector(".newBookForm");
  if (form.style.display === "none") {
    form.style.display = "";
  } else {
    form.style.display = "none";
  }
}

const cancelBtn = document.querySelector("#cancelBtn");
cancelBtn.addEventListener("click", (event) => {
  toggleForm();
  cleanForm();
});

function cleanForm() {
  const form = document.querySelector(".newBookForm");
  const inputs = form.querySelectorAll("input");
  inputs.forEach((element) => {
    element.value = "";
  });
  const nop = document.querySelector("#noOption");
  nop.selected = true;
}

const saveBtn = document.querySelector("#saveBtn");
saveBtn.addEventListener("click", (event) => {
  const form = document.querySelector(".newBookForm");
  const inputs = form.querySelectorAll("input");
  const selection = form.querySelectorAll("option");
  const options = Array.from(selection);
  const data = [];
  inputs.forEach((element) => {
    data.push(element.value);
  });
  const n = options.filter((element) => element.selected == true);
  data.push(n);
  const selector = form.querySelectorAll("select");
  data.push(selector.value);
  addBookToLibrary(data);
  toggleForm();
  cleanForm();
});

function addListeners() {
  const removeBtns = document.querySelectorAll(".removeBtn");
  removeBtns.forEach((element) => {
    element.addEventListener("click", (event) => {
      myLibrary = myLibrary.filter((book) => book.Title != element.id);
      displayBooks(myLibrary);
    });
  });
}

function addReadToggle() {
  const toggleBtns = document.querySelectorAll(".toogleBtn");
  toggleBtns.forEach((element) => {
    element.addEventListener("click", (event) => {
      const title = element.parentNode
        .querySelectorAll("li")[0]
        .textContent.split(":")[1]
        .trim();
      myLibrary.forEach((book) => {
        if (book.Title == title) {
          if (book.Read == "Already read") {
            book.Read = "Not read yet";
          } else {
            book.Read = "Already read";
          }
        }
        displayBooks(myLibrary);
      });
    });
  });
}

function checkValid() {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("input", () => {});
  });
}
