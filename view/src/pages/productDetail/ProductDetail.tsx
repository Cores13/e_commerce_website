import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import { IState as IProduct } from "../../pages/products/Products";
import { Link } from "react-router-dom";
import { ProductItem } from "../../components/productItem/ProductItem";
import { Loading } from "../../components/loading/Loading";
import "./ProductDetail.css";

interface Props {
  id: any;
  isAdmin: boolean;
  addCart: any;
  cart: any;
  detailProduct:
    | {
        category: string;
        checked: boolean;
        content: string;
        createdAt: any;
        description: string;
        images: {
          public_id: string;
          url: string;
        };
        price: number;
        product_id: string;
        sold: number;
        title: string;
        updatedAt: any;
        __v: any;
        _id: number;
      }
    | {}
    | any;
  setDetailProduct: React.Dispatch<React.SetStateAction<{}>>;
}

export const ProductDetail: React.FC = () => {
  const { id }: Props["id"] = useParams();
  const state = useContext(GlobalState);
  const [products] = state?.productsAPI.products;
  const [detailProduct, setDetailProduct] = useState<Props["detailProduct"]>(
    {}
  );
  const [isAdmin] = state?.userAPI?.isAdmin;
  const addCart: any = state?.userAPI?.addCart;

  useEffect(() => {
    if (id) {
      products.forEach((product: IProduct["product"]) => {
        if (product._id === id) {
          setDetailProduct(product);
        }
      });
    }
  }, [id, products]);

  const propOwn = Object.getOwnPropertyNames(detailProduct);

  if (propOwn.length === 0) return <Loading />;
  return (
    <>
      <div className='detailProductWrapper'>
        <div className='detailProduct'>
          <div className='detailProductLeft'>
            <img
              src={detailProduct.images.url}
              alt=''
              className='detailProductImg'
            />
          </div>
          <div className='detailProductRight'>
            <div className='detailProductRightTop'>
              <h1 className='detailProductTitle'>{detailProduct.title}</h1>
              <p className='detailProductId'>ID: {detailProduct.product_id}</p>
              <h3 className='detailProductContent'>{detailProduct.content}</h3>
              <h3 className='detailProductDescription'>
                {detailProduct.description}
              </h3>
            </div>
            <div className='detailProductRightBottom'>
              <p className='detailProductPrice'>
                <span className='detailProductPriceTitle'>Cijena:</span>{" "}
                {detailProduct.price}KM
              </p>
              <div className='detailProductButtons'>
                <Link
                  id='detailProductBuyBtn'
                  to='#!'
                  onClick={() => addCart(detailProduct)}>
                  KUPI
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='detailProductRelated'>
          <h2 className='detailProductRelatedTitle'>Srodni proizvodi</h2>
          <div className='detailProductRelatedProduct'>
            {products.map((product: IProduct["product"]) => {
              return product.category === detailProduct.category ? (
                <ProductItem key={product._id} product={product} />
              ) : null;
            })}
          </div>
        </div>
        {propOwn.length === 0 && <Loading />}
      </div>
    </>
  );
};
