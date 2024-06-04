const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE3NTA2NTU3LCJpYXQiOjE3MTc1MDYyNTcsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImJlOTc5Y2UwLWUyYzEtNDBmOC1iYTFiLTU4ZDE2YzE4NDU0YiIsInN1YiI6ImFraWxzYWRpa0AxMjM0Z21haWwuY29tIn0sImNvbXBhbnlOYW1lIjoiU29uYSBjb2xsZWdlIG9mIFRlY2hub2xvZ3kiLCJjbGllbnRJRCI6ImJlOTc5Y2UwLWUyYzEtNDBmOC1iYTFiLTU4ZDE2YzE4NDU0YiIsImNsaWVudFNlY3JldCI6InZSSkt0QmJMUkpNUk9KUGsiLCJvd25lck5hbWUiOiJBa2lsIFNhZGlrIE0gSCIsIm93bmVyRW1haWwiOiJha2lsc2FkaWtAMTIzNGdtYWlsLmNvbSIsInJvbGxObyI6IjYxNzgxOTIxMTEwMDAxIn0.5JsOY27KGCtnN6Mu4uNK6LijvnJNBF1JSxjEUbqtYW0");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch("http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));