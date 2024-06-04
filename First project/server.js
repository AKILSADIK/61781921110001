const express = require('express');
const { v4: uuidv4 } = require('uuid');
const http = require('http');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/categories/:categoryname/products', (req, res) => {
    const { categoryname } = req.params;
    const { n, page, sortBy, sortOrder } = req.query;

    const options = {
        hostname: '20.244.56.144',
        path: `/test/companies/AMZ/categories/${categoryname}/products?top=${n}&minPrice=1&maxPrice=10000`,
        method: 'GET',
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE3NTA2NTU3LCJpYXQiOjE3MTc1MDYyNTcsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImJlOTc5Y2UwLWUyYzEtNDBmOC1iYTFiLTU4ZDE2YzE4NDU0YiIsInN1YiI6ImFraWxzYWRpa0AxMjM0Z21haWwuY29tIn0sImNvbXBhbnlOYW1lIjoiU29uYSBjb2xsZWdlIG9mIFRlY2hub2xvZ3kiLCJjbGllbnRJRCI6ImJlOTc5Y2UwLWUyYzEtNDBmOC1iYTFiLTU4ZDE2YzE4NDU0YiIsImNsaWVudFNlY3JldCI6InZSSkt0QmJMUkpNUk9KUGsiLCJvd25lck5hbWUiOiJBa2lsIFNhZGlrIE0gSCIsIm93bmVyRW1haWwiOiJha2lsc2FkaWtAMTIzNGdtYWlsLmNvbSIsInJvbGxObyI6IjYxNzgxOTIxMTEwMDAxIn0.5JsOY27KGCtnN6Mu4uNK6LijvnJNBF1JSxjEUbqtYW0"
        }
    };

    const request = http.request(options, response => {
        let data = '';

        response.on('data', chunk => {
            data += chunk;
        });

        response.on('end', () => {
            const products = JSON.parse(data);
            const paginatedProducts = paginate(products, n, page);
            const sortedProducts = sortProducts(paginatedProducts, sortBy, sortOrder);
            const productsWithId = addUniqueId(sortedProducts);
            res.json(productsWithId);
        });
    });

    request.on('error', error => {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching products.' });
    });

    request.end();
});



app.get('/categories/:categoryname/products/:productid', (req, res) => {
    const { categoryname, productid } = req.params;
    const product = {}; // This should be replaced with actual fetching logic
    res.json(product);
});

function paginate(products, n, page) {
    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = parseInt(n, 10) || 10;
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = pageNumber * pageSize;
    return products.slice(startIndex, endIndex);
}

function sortProducts(products, sortBy, sortOrder) {
    return products.sort((a, b) => {
        let order = sortOrder === 'desc' ? -1 : 1;
        if (a[sortBy] < b[sortBy]) {
            return -1 * order;
        }
        if (a[sortBy] > b[sortBy]) {
            return 1 * order;
        }
        return 0;
    });
}

function addUniqueId(products) {
    return products.map(product => {
        return { ...product, id: uuidv4() };
    });
}


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
