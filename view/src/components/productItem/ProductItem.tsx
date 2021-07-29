import React, { useState, useEffect } from 'react'
import './ProductItem.css'
import {IState as IProduct} from '../../pages/products/Products'
import {Link} from 'react-router-dom';
interface Props {
    product: IProduct['product'];
}

export const ProductItem: React.FC<Props> = ({product}) => {
    return (
        <div className='productItem'>
            <img src={product.images.url} alt='Product' className='productImg'/>
            <div className="productItemBody">
                <div className="productItemBodyTop">
                    <h2 className="productItemTitle">{product.title}</h2>
                    <p className="productItemDescription">{product.description}</p>
                </div>
                <div className="productItemBodyBottom">
                    <p className="productItemPrice">Cijena: {product.price}KM</p>
                    <div className="buttons">
                        <Link id="buyBtn" to="#!">
                            KUPI
                        </Link>
                        <Link id="detailsBtn" to={`detail/${product._id}`}>
                            DETALJNO
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
