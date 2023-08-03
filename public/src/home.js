function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let borrowCount = 0;
  for (let bookObj of books){
    const {borrows} = bookObj;
    if (borrows[0].returned === false) borrowCount ++;
  }
  return borrowCount;
}

function getMostCommonGenres(books) {
  //create array to hold genre count Object
  const genreCount = [];
  //loop through books array
  for (let book of books){
    const {genre} = book;
    //OR bump the count by 1
    if (genreCount.some((element) => element.name === genre)){
      const foundGenre = genreCount.find((element)=> element.name === genre)
      foundGenre.count++;
    }
    //for each book, add the genre and set count to 1
    else genreCount.push({"name" : genre, "count" : 1});
  }
  //sort the array by count
  genreCount.sort((genreA, genreB)=> genreB.count - genreA.count)
 //return the first 5 elements in a new array
  return genreCount.slice(0,5);
  
  
 
}

function getMostPopularBooks(books=[]) {
  const bookCount = [];
  for(let book of books){
    const {borrows, title} = book;
    bookCount.push({"name": title, "count": borrows.length})
  }
  bookCount.sort((bookA, bookB)=> bookB.count - bookA.count)
  return bookCount.slice(0,5);
}

function getMostPopularAuthors(books=[], authors=[]) {
  const authorCount = [];
  //find the author id in books
  for (let book of books){
    const {authorId, borrows} = book;
    const matchedAuthor = authors.find((author)=> author.id ===authorId)
    const {name: {first, last}} = matchedAuthor;
    if (authorCount.length && authorCount.some((element= {}) => element.authorId === authorId)){
      // increase count by borrow.length
      book.count += borrows.length;
  }
  
    else {
       //create element equal to matched author first, last name and count
      authorCount.push({"authorId": authorId, "name": `${first} ${last}`, "count": borrows.length})
    }
    }
    authorCount.sort((authorA, authorB)=> authorB.count - authorA.count)
    const result = authorCount.map((element)=> {
      const {name, count}= element;
      newElement = {name, count}
      return newElement;
    })
    return result.slice(0,5)

  }


  //sort by count
  //return top 5 results


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
