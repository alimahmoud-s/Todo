// Get references to various HTML elements by their IDs
var bookName = document.getElementById("bookName");
var submitButton = document.getElementById("submitButton");
var bookLink = document.getElementById("bookSiteLink");
var warning = document.getElementById("warning");

// Initialize an array to store book data, and declare a variable for displaying messages
var booksArr = displayFromLocalST();
var message;

// Function to retrieve and display book data from local storage
function displayFromLocalST() {
  // Retrieve stored book data from local storage or initialize an empty array if no data is found
  var storedBooks = JSON.parse(localStorage.getItem("books"));
  booksArr = Array.isArray(storedBooks) ? storedBooks : [];

  // Display the retrieved book data in a table
  displayQouteInTable(booksArr);

  // Remove the "d-none" class from an element with the ID "hideTable" to make it visible
  document.getElementById("hideTable").classList.remove("d-none");

  // Return the retrieved or initialized array
  return booksArr;
}

// Function to handle adding new book information
function getbookInfo(bookList) {
  // Check if both book name and book link are provided
  if (bookName.value.trim() !== "" && bookLink.value.trim() !== "") {
    // Create a new book object and push it to the booksArr array
    booksArr.push({
      book: bookName.value,
      status: "Pending",
      link: bookLink.value,
    });

    // Store the updated book data in local storage
    localStorage.setItem("books", JSON.stringify(booksArr));

    // Display the updated book list in a table
    displayQouteInTable(bookList);

    // Clear the input fields
    clearInputs();
    removeErr();
  } else {
    // Display a warning message for missing or invalid input
    message = `<p class="lead">Please enter valid book name and link</p>`;
    warning.innerHTML = message;
    warning.classList.remove("d-none");
  }
}

// Function to display book data in a table
function displayQouteInTable(bookList) {
  var items = "";

  // Iterate through the bookList array and generate table rows
  for (let i = 0; i < bookList.length; i++) {
    items += `<tr>
      <td class="fs-3 text-dark-emphasis lead text-center">
        <p>${bookList[i].book}</p>
      </td>
      <td class="fs-3 text-dark-emphasis lead text-center">
        <p>${bookList[i].link}</p>
      </td>
      <td class="fs-3 text-dark-emphasis lead text-center">
        <p>${bookList[i].status}</p>
      </td>
      <td class="fs-4 lead text-center">
        <button class="btn btn-outline-success" onclick="updateStatus(${i})">Done</button>
        <button class="btn btn-outline-danger" onclick="deleteBook(${i})">Delete</button>
        <button class="btn btn-outline-info" onclick="updateBook(${i})">Update</button>
      </td>
    </tr>`;
  }

  // Set the generated table rows as HTML content of an element with the ID "displayTable"
  document.getElementById("displayTable").innerHTML = items;
}

// Function to update the status of a book
function updateStatus(index) {
  if (booksArr[index].status === "Pending") {
    booksArr[index].status = "Done";
    localStorage.setItem("books", JSON.stringify(booksArr));
    displayQouteInTable(booksArr);
  }
}

// Function to delete a book entry
function deleteBook(indexOfBook) {
  // Remove the book at the specified index from the booksArr array
  booksArr.splice(indexOfBook, 1);

  // Update the local storage with the modified book data
  localStorage.setItem("books", JSON.stringify(booksArr));

  // Refresh the displayed book table
  displayQouteInTable(booksArr);
}

// Function to update book information
function updateBook(indexOfBook) {
  // Retrieve the book at the specified index in the booksArr array
  var bookToUpdate = booksArr[indexOfBook];

  // Set the input fields with the book's name and link
  bookName.value = bookToUpdate.book;
  bookLink.value = bookToUpdate.link;

  // Configure the submit button to call the saveUpdate function with the index for updating the book
  submitButton.setAttribute("onclick", `saveUpdate(${indexOfBook})`);
  submitButton.setAttribute("class", "btn shadow btn-success");
  submitButton.innerHTML = "Save";
}

// Function to save updated book information
function saveUpdate(indexOfBook) {
  // Retrieve the book at the specified index in the booksArr array
  var bookToUpdate = booksArr[indexOfBook];

  // Update the book's name and link based on the input field values
  bookToUpdate.book = bookName.value;
  bookToUpdate.link = bookLink.value;
  // Update the local storage with the modified book data
  localStorage.setItem("books", JSON.stringify(booksArr));
  // Refresh the displayed book table
  displayQouteInTable(booksArr);
  // Configure the submit button to call the getbookInfo function for adding new books
  submitButton.setAttribute("onclick", "getbookInfo(booksArr)");
  submitButton.setAttribute("class", "btn shadow btn-primary");
  submitButton.innerHTML = "Submit";
  if (booksArr[indexOfBook].status === "Done") {
    booksArr[indexOfBook].status = "Pending";
    localStorage.setItem("books", JSON.stringify(booksArr));
    displayQouteInTable(booksArr);
  }

  // Clear the input fields
  clearInputs();
}

// Function to clear input fields
function clearInputs() {
  bookName.value = "";
  bookLink.value = "";
}

// Function to remove error messages
function removeErr() {
  warning.classList.add("d-none");
}
