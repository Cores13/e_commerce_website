import axios from 'axios';
import React, { useState, useEffect, ReactElement } from 'react'


export default function ProductsAPI() {
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        const res = await axios.get('/api/products');
        setProducts(res.data.products);
    }

    useEffect(() => {
        getProducts();
    }, []);
    
    return {
        products: [products, setProducts]
    }
}
