const api = process.env.BOOKS_API_URL || 'http://127.0.0.1:5000'

//let token = localStorage.token;

//if (!token) token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
  Accept: "application/json",
  //Authorization: token,
};

// TODO: handle errors and return proper json response to be used in the UI for all the requests
export const getAll = () =>
  fetch(`${api}/books`, { headers })
    .then((res) => res.json())
    .then((data) => data);

export const getBook = (id: string) =>
  fetch(`${api}/book/${id}`, { headers })
    .then((res) => res.json())
    .then((data) => data.book);

export const deleteBook = (book: { author: string, id: string, rating: number, title: string }) =>
  fetch(`${api}/book/${book.id}`, { method: "DELETE", headers })
    .then((res) => res.json())
    .then((data) => data);

export const addBook = (book: { author: string, id: string, rating: number, title: string }) =>
  fetch(`${api}/books`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  }).then((res) => res.json());