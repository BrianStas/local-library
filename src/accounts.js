const { partitionBooksByBorrowedStatus } = require("./books");

function findAccountById(accounts, id) {
  const result = accounts.find((element) => element.id === id);
  return result;
  }


function sortAccountsByLastName(accounts = []) {
  accounts.sort((accountA, accountB) => accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1);
  return accounts;
}

function getTotalNumberOfBorrows(account, books) {
  const matchedId = account.id;
  let borrowCount = 0;
  for (let book of books){
    for (let borrows of book.borrows){
      if (borrows.id === matchedId) borrowCount++;
    }
  }
return borrowCount;
}

function getBooksPossessedByAccount(account, books, authors) {
  //pull the account id
  const {id} = account;
  //filter the books by checked out status
  const checkedBooks = partitionBooksByBorrowedStatus(books);
  //further filter the books by account Id in 0 index
  accountBooks = checkedBooks[0].filter((book)=>{
    const {borrows} = book;
    return borrows[0].id === id;
  })
  //map in the author property
for (let element of accountBooks){
  const {authorId} = element;
  const matchedAuthor = authors.find((author)=> author.id ===authorId)
  element.author = matchedAuthor;
}
  //return the array
  return accountBooks;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
