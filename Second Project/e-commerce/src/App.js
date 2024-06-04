import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';


const HomePage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/categories/Laptop/products?n=15&page=1&sortBy=rating&sortOrder=asc')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    return (
        <div className="container mt-4">
            <div className="row">
                {products.map(product => (
                    <div className="col-md-4 mb-3" key={product.id}>
                        <div className="card">
                            <img src="product_image_url" className="card-img-top" alt="Product" />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">Company: {product.company}</p>
                                <p className="card-text">Category: {product.category}</p>
                                <p className="card-text">Price: ${product.price}</p>
                                <p className="card-text">Rating: {product.rating}</p>
                                <p className="card-text">Discount: {product.discount}%</p>
                                <p className="card-text">Availability: {product.availability ? 'Available' : 'Out of stock'}</p>
                                <a href="#" className="btn btn-primary">View More</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
