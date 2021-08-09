import React, { useContext } from "react";
import "./ProductItem.css";
import { IState as IProduct } from "../../pages/products/Products";
import { GlobalState } from "../../GlobalState";
import { Link } from "react-router-dom";
interface Props {
  product: IProduct["product"];
  isAdmin: boolean;
}

export const ProductItem: React.FC<Props> = ({ product, isAdmin }) => {
  const state = useContext(GlobalState);
  const addCart: any = state?.userAPI?.addCart;

  return (
    <div className='productItem'>
      {isAdmin && (
        <input
          type='checkbox'
          checked={product.checked}
          className='productItemCheckbox'
        />
      )}
      <img src={product.images.url} alt='Product' className='productImg' />
      <div className='productItemBody'>
        <div className='productItemBodyTop'>
          <h2 className='productItemTitle'>{product.title}</h2>
          <p className='productItemDescription'>{product.description}</p>
        </div>
        <div className='productItemBodyBottom'>
          <p className='productItemPrice'>
            <span className='productItemPriceTitle'>Cijena:</span>{" "}
            {product.price}KM
          </p>
          <div className='buttons'>
            {isAdmin ? (
              <>
                <Link id='buyBtn' to={`/edit_product/${product._id}`}>
                  UREDI
                </Link>
                <Link id='detailsBtn' to='#!'>
                  IZBRISI
                </Link>
              </>
            ) : (
              <>
                <Link id='buyBtn' to='#!' onClick={() => addCart(product)}>
                  KUPI
                </Link>
                <Link id='detailsBtn' to={`/detail/${product._id}`}>
                  DETALJNO
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
