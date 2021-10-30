let myLibrary = []

function Book(title, author, pages, read){
    this.Title = title
    this.Author = author
    this.Pages = pages
    this.Read = read ? "Already read" : "Not read yet"
}

Book.prototype.info =  function() {
    let r = read ? "already read" : "not read yet"
    return `${title} by ${author}, ${pages} pages, ${r}`
}

function addBookToLibrary(data) {
    let b = new Book(data[0],data[1],data[2],data[3])
    myLibrary.push(b)
    displayBooks(myLibrary)
}

let btn = document.querySelector(".addBtn")

function displayBooks(colection) {
    if (document.querySelector(".bookContainer") != null) {
        let d = document.querySelector(".bookContainer")
        d.remove()
    }
    let body = document.querySelector("body")
    let container = document.createElement("div")
    container.classList.toggle("bookContainer")
    myLibrary.forEach(book => {
        let bookCard = document.createElement("div")
        bookCard.classList.toggle("bookCard")
        let removeBtn = document.createElement("button")
        removeBtn.classList.toggle("removeBtn")
        removeBtn.id = book.Title
        removeBtn.textContent = "Remove"
        let readBtn = document.createElement("button")
        readBtn.classList.toggle("toogleBtn")
        readBtn.textContent = "Read"
        bookCard.appendChild(readBtn)
        bookCard.appendChild(removeBtn)
        let infoList = document.createElement("ul")
        let datos = ["Title","Author","Pages","Read"]
        datos.forEach(key => {
            let li = document.createElement("li")
            li.textContent = `${key}: ${book[key]}`
            infoList.appendChild(li)
        });
        bookCard.appendChild(infoList)
        container.appendChild(bookCard)
    });
    body.insertBefore(container,btn)
    addListeners()
    addReadToggle()
}

btn.addEventListener("click", toggleForm)

function toggleForm() {
    let form = document.querySelector(".newBookForm")
    if (form.style.display === "none") {
        form.style.display = "";
    } else {
    form.style.display = "none";
    }
}

let cancelBtn = document.querySelector("#cancelBtn")
cancelBtn.addEventListener("click", event => {
    toggleForm()
    cleanForm()
})

function cleanForm() {
    let form = document.querySelector(".newBookForm")
    let inputs = form.querySelectorAll("input")
    inputs.forEach(element => {
        element.value = ""
    });
    let nop = document.querySelector("#noOption")
    nop.selected = true
}

let saveBtn = document.querySelector("#saveBtn")
saveBtn.addEventListener("click", event => {
    let form = document.querySelector(".newBookForm")
    let inputs = form.querySelectorAll("input")
    let data = []
    inputs.forEach(element => {
        data.push(element.value)
    });
    let selector = form.querySelectorAll("select")
    data.push(selector.value)
    addBookToLibrary(data)
    toggleForm()
    cleanForm()
})


function addListeners() {
    let removeBtns = document.querySelectorAll(".removeBtn")
    removeBtns.forEach(element => {
    element.addEventListener("click", event => {
        myLibrary = myLibrary.filter(book => book.Title != element.id)
        displayBooks(myLibrary)
        })
    });
};

function addReadToggle() {
    let toggleBtns = document.querySelectorAll(".toogleBtn")
    toggleBtns.forEach(element => {
        element.addEventListener("click", event => {
            let title = element.parentNode.querySelectorAll("li")[0].textContent.split(":")[1].trim()
            myLibrary.forEach(book => {
                if (book.Title == title){
                    if(book.Read == "Already read") {
                        book.Read = "Not read yet"
                    }
                    else {
                        book.Read = "Already read"
                    }
                }
            displayBooks(myLibrary)
            })
        }) 
    });
}