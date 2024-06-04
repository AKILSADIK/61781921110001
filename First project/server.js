const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE3NTA0OTkyLCJpYXQiOjE3MTc1MDQ2OTIsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImJlOTc5Y2UwLWUyYzEtNDBmOC1iYTFiLTU4ZDE2YzE4NDU0YiIsInN1YiI6ImFraWxzYWRpa0AxMjM0Z21haWwuY29tIn0sImNvbXBhbnlOYW1lIjoiU29uYSBjb2xsZWdlIG9mIFRlY2hub2xvZ3kiLCJjbGllbnRJRCI6ImJlOTc5Y2UwLWUyYzEtNDBmOC1iYTFiLTU4ZDE2YzE4NDU0YiIsImNsaWVudFNlY3JldCI6InZSSkt0QmJMUkpNUk9KUGsiLCJvd25lck5hbWUiOiJBa2lsIFNhZGlrIE0gSCIsIm93bmVyRW1haWwiOiJha2lsc2FkaWtAMTIzNGdtYWlsLmNvbSIsInJvbGxObyI6IjYxNzgxOTIxMTEwMDAxIn0.-hM3xrmvAVuJ5K-9bM3HZc6d5vzp2oPsc31d-qBAyNk");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

app.get('/categories/:categoryname/products', async (req, res) => {
    const categoryname = req.params.categoryname;
    const top = req.query.top;
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    const page = req.query.page || 1;
    
    const url = `http://20.244.56.144/test/companies/AMZ/categories/${categoryname}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}`;
    
    try {
        const response = await fetch(url, requestOptions);
        const result = await response.json();
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data');
    }
});

app.get('/categories/:categoryname/products/:productid', async (req, res) => {
    const categoryname = req.params.categoryname;
    const productid = req.params.productid;
    const url = `http://20.244.56.144/test/companies/AMZ/categories/${categoryname}/products/${productid}`;
    
    try {
        const response = await fetch(url, requestOptions);
        const result = await response.json();
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
