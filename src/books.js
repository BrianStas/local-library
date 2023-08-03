function findAuthorById(authors, id) {
  const result = authors.find((author) => author.id === id);
  return result;
}

function findBookById(books, id) {
  const result = books.find((book) => book.id === id);
  return result;
}

function partitionBooksByBorrowedStatus(books) {
  const available = [];
  const checkedOut = [];
  for (let book of books){
    const currentCheck = book.borrows[0];
    currentCheck.returned ? available.push(book) : checkedOut.push(book);
  }
  const result = [checkedOut, available];
  return result;
}

function getBorrowersForBook(book, accounts) {
  const result = [];
  //look at the borrows array for the book
  const {borrows} = book;
  //pull the list of ids and returned status
  borrows.forEach((borrow)=> {
    const {id, returned} = borrow;
  //loop through the accounts page
  const matchedUser = accounts.find((account)=> account.id ===id );
  //add the returned status
  matchedUser.returned = returned;
  //push each matched account ID to the result array
  result.push(matchedUser);
})
  //return the first 10 entries in the array
  return result.slice(0,10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
