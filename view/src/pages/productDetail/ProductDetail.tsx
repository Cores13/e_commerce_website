import React, { useState, useEffect, useContext } from 'react'
import {useParams} from 'react-router-dom'
import {GlobalState} from '../../GlobalState'
import {IState as IProduct} from '../../pages/products/Products'
import {Link} from 'react-router-dom';
import './ProductDetail.css'

interface Props {
    id: any;
    // detailProduct: IProduct['product'];
    detailProduct: {
        category: string;
        checked: boolean;
        content: string;
        createdAt: any;
        description: string;
        images: {
            public_id: string; 
            url: string;}
        price: number;
        product_id: string;
        sold: number;
        title: string;
        updatedAt: any;
        __v: any;
        _id: number;
    } | {} | any;
    setDetailProduct: React.Dispatch<React.SetStateAction<{}>>;
}

export const ProductDetail: React.FC = () => {
    const {id}:Props['id'] = useParams();
    const state= useContext(GlobalState);
    const [products] = state?.productsAPI.products;
    const [detailProduct, setDetailProduct] = useState<Props['detailProduct']>({});




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

    const propOwn = Object.getOwnPropertyNames(detailProduct);

    if(propOwn.length === 0) return null;
    return (
        <div className="detailProductWrapper">
            <div className="detailProduct">
                <div className="detailProductLeft">
                    <img src={detailProduct.images.url} alt="" className="detailProductImg" />
                </div>
                <div className="detailProductRight">
                    <div className="detailProductRightTop">
                        <h1 className="detailProductTitle">{detailProduct.title}</h1>
                        <p className="detailProductDescription">{detailProduct.description}</p>
                    </div>
                    <div className="detailProductRightBottom">
                        <p className="detailProductPrice">Cijena: {detailProduct.price}KM</p>
                        <div className="detailProductButtons">
                            <Link id="detailProductBuyBtn" to="#!">
                                KUPI
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
