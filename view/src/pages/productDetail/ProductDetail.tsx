import React, { useState, useEffect, useContext } from 'react'
import {useParams} from 'react-router-dom'
import {GlobalState} from '../../GlobalState'
import {IState as IProduct} from '../../pages/products/Products'

interface Props {
    id: any;
    detailProduct: IProduct['product'];
}

export const ProductDetail: React.FC = () => {
    const {id}:Props['id'] = useParams();
    const state= useContext(GlobalState);
    const [products] = state?.productsAPI.products;
    const [detailProduct, setDetailProduct] = useState({});

    useEffect(() => {
        if(id){
            products.forEach((product:IProduct['product']) => {
                if(product._id === id){
                    setDetailProduct(product);
                }
            })
        }
    }, [id, products])
    console.log(detailProduct);

    return (
        <div className="detailProductWrapper">
            <div className="detailProduct">
                
            </div>
        </div>
    )
}
