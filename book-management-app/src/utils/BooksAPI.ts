const api = "https://reactnd-books-api.udacity.com" //process.env.BOOKS_API_URL || 'http://127.0.0.1:5000'

let token = localStorage.token;

if (!token) token = localStorage.token = Math.random().toString(36).substring(-8);

const headers = {
  Accept: "application/json",
  Authorization: token,
};

export const getAll = () =>
  fetch(`${api}/books`, { headers })
    .then((res) => res.json())
    .then((data) => data);

export const getBook = (id: string) =>
  fetch(`${api}/books/${id}`, { headers })
    .then((res) => res.json())
    .then((data) => data.book);

export const update = (id: number, shelf: string) =>
  fetch(`${api}/books/${id}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ shelf }),
  }).then((res) => res.json());

export const search = (query: string, maxResults: number) =>
  fetch(`${api}/search`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, maxResults }),
  })
    .then((res) => res.json())
    .then((data) => data.books);