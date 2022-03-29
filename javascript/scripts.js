let myLibrary = [];

let lastLib = "";

const container = document.querySelector(".contents");
const formToggle = document.querySelector(".addBook");
const popForm = document.querySelector(".popForm");
const submit = document.querySelector(".submit");
const titleF = document.querySelector("#title");
const authorF = document.querySelector("#author");
const pagesF = document.querySelector("#pages");
const readF = document.querySelector("#read");

formToggle.addEventListener("click", () => {
  if (popForm.style.display === "none") {
    popForm.style.display = "";
  } else {
    popForm.style.display = "none";
  }
});

function book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function createBox() {
  const newDiv = document.createElement("div");
  newDiv.classList.add("testitem");
  newDiv.setAttribute("data-locate", lastLib.title);

  for (const [key, value] of Object.entries(lastLib)) {
    if (key === "read") {
      const innerDiv = document.createElement("div");
      const inText = document.createElement("label");
      const checkBox = document.createElement("INPUT");
      checkBox.setAttribute("type", "checkbox");
      checkBox.setAttribute("name", "checkRead");
      inText.setAttribute("for", "checkRead");
      inText.textContent = "Read";
      innerDiv.appendChild(inText);
      innerDiv.appendChild(checkBox);
      newDiv.appendChild(innerDiv);
      if (value === "Yes") {
        checkBox.checked = true;
      }
    } else {
      const innerDiv = document.createElement("div");
      const inText = document.createTextNode(`${value}`);
      innerDiv.appendChild(inText);
      newDiv.appendChild(innerDiv);
    }
  }
  const delButton = document.createElement("button");
  delButton.textContent = "Delete";
  delButton.classList.add("delButton");
  newDiv.appendChild(delButton);
  container.appendChild(newDiv);
}
//take user input and store thew new book object into myLibrary
submit.addEventListener("click", () => {
  if (readF.checked === true) {
    readF.value = "Yes";
  } else {
    readF.value = "No";
  }
  const books = new book(
    titleF.value,
    authorF.value,
    pagesF.value,
    readF.value
  );
  myLibrary.push(books);
  lastLib = myLibrary[myLibrary.length - 1];
  updateDisplay();
  clearForm();
  popForm.style.display = "none";
});

function updateDisplay() {
  for (let key of myLibrary) {
    if (key === myLibrary[myLibrary.length - 1]) {
      createBox();
      removeBook();
    }
  }
}

function removeBook() {
  const remButton = document.querySelectorAll(".delButton");
  remButton.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.target.parentNode.remove();
    });
  });
}

document.addEventListener("mouseup", function (e) {
  if (!popForm.contains(e.target)) {
    popForm.style.display = "none";
    clearForm();
  }
});

function clearForm() {
  titleF.value = "";
  authorF.value = "";
  pagesF.value = "";
  readF.checked = false;
}

window.addEventListener("load", () => {
  popForm.style.display = "none";
});
