const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE3NTAzODIyLCJpYXQiOjE3MTc1MDM1MjIsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjAzNzk2ZjMxLTU4NGYtNGZiMC1hMGUyLTkzNWY1OTYwMGIzNSIsInN1YiI6ImFraWxzYWRpay4yMWFkc0Bzb25hdGVjaC5hYy5pbiJ9LCJjb21wYW55TmFtZSI6IlNvbmEgY29sbGVnZSBvZiBUZWNobm9sb2d5IiwiY2xpZW50SUQiOiIwMzc5NmYzMS01ODRmLTRmYjAtYTBlMi05MzVmNTk2MDBiMzUiLCJjbGllbnRTZWNyZXQiOiJ1SEZyenZxTnZNYXhXbWlCIiwib3duZXJOYW1lIjoiQWtpbCBTYWRpayBNIEgiLCJvd25lckVtYWlsIjoiYWtpbHNhZGlrLjIxYWRzQHNvbmF0ZWNoLmFjLmluIiwicm9sbE5vIjoiNjE3ODE5MjExMTAwMDEifQ.t0UzIV79lNCDzUTAPuntkXfnv1YSldoHZ-tW4TjY7zA");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch("http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));