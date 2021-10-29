let myLibrary = []

function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read ? "Already read" : "Not read yet"
}

Book.prototype.info =  function() {
    let r = read ? "already read" : "not read yet"
    return `${title} by ${author}, ${pages} pages, ${r}`
}

function addBookToLibrary(t, a, p, r) {
    let b = new Book(t,a,p,r)
    myLibrary.push(b)
}

function displayBooks(colection) {
    let body = document.querySelector("body")
    let container = document.createElement("div")
    myLibrary.forEach(book => {
        let bookCard = document.createElement("div")
        let infoList = document.createElement("ul")
        let datos = ["title","author","pages","read"]
        datos.forEach(key => {
            let li = document.createElement("li")
            li.textContent = book[key]
            infoList.appendChild(li)
        });
        bookCard.appendChild(infoList)
        container.appendChild(bookCard)
    });
    body.appendChild(container)
}