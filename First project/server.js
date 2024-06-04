const express = require('express');
const { v4: uuidv4 } = require('uuid');
const http = require('http');

const app = express();
const port = 3000;

let productsData = [];

app.use(express.json());

app.get('/categories/:categoryname/products', (req, res) => {
    const { categoryname } = req.params;
    const { n, page, sortBy, sortOrder } = req.query;

    const options = {
        hostname: '20.244.56.144',
        path: `/test/companies/AMZ/categories/${categoryname}/products?top=${n}&minPrice=1&maxPrice=10000`,
        method: 'GET',
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE3NTA4MTQ5LCJpYXQiOjE3MTc1MDc4NDksImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImJlOTc5Y2UwLWUyYzEtNDBmOC1iYTFiLTU4ZDE2YzE4NDU0YiIsInN1YiI6ImFraWxzYWRpa0AxMjM0Z21haWwuY29tIn0sImNvbXBhbnlOYW1lIjoiU29uYSBjb2xsZWdlIG9mIFRlY2hub2xvZ3kiLCJjbGllbnRJRCI6ImJlOTc5Y2UwLWUyYzEtNDBmOC1iYTFiLTU4ZDE2YzE4NDU0YiIsImNsaWVudFNlY3JldCI6InZSSkt0QmJMUkpNUk9KUGsiLCJvd25lck5hbWUiOiJBa2lsIFNhZGlrIE0gSCIsIm93bmVyRW1haWwiOiJha2lsc2FkaWtAMTIzNGdtYWlsLmNvbSIsInJvbGxObyI6IjYxNzgxOTIxMTEwMDAxIn0.UzHh5tcHrlQhS37zcs-JDzDbqKJMWvS0OWpYD_ZSSsg"
        }
    };

    const request = http.request(options, response => {
        let data = '';

        response.on('data', chunk => {
            data += chunk;
        });

        response.on('end', () => {
            const products = JSON.parse(data);
            const sortedProducts = sortProducts(products, sortBy, sortOrder);
            const paginatedProducts = paginate(sortedProducts, n, page);
            productsData = addUniqueId(paginatedProducts); // Store the products with unique IDs
            res.json(productsData);
        });
    });

    request.on('error', error => {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching products.' });
    });

    request.end();
});

app.get('/categories/:categoryname/products/:productid', (req, res) => {
    const { productid } = req.params;
    const product = productsData.find(p => p.id === productid);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
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
