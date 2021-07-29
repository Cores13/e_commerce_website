import React, { useState, useEffect } from 'react'
import {Props as IProduct} from '../../pages/products/Products'
interface Props {
    product: IProduct['product'];
}

export const ProductItem: React.FC<Props> = ({product}) => {
    return (
        <div className='productItem'>
            <img src={product?.images.url} alt='Product' />
        </div>
    )
}
