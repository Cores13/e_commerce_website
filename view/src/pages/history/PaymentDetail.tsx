import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import "./PaymentDetail.css";
import { GlobalState } from "../../GlobalState";

type IProps = {
  paymentDetails: any;
  params: {
    id: string;
  };
};

export const PaymentDetail: React.FC = () => {
  const state = useContext(GlobalState);
  const [history] = state?.userAPI?.history;
  const [paymentDetails, setPaymentDetails] = useState<
    IProps["paymentDetails"]
  >([]);

  const params = useParams<IProps["params"]>();

  useEffect(() => {
    if (params.id) {
      history.forEach((item: any) => {
        if (item._id === params.id) {
          setPaymentDetails(item);
        }
      });
    }
  }, [params.id, history]);

  if (paymentDetails.length === 0) {
    return null;
  }
  return (
    <div className='historyDetail'>
      <div className='historyDetailWrapper'>
        <h2 className='historyDetailTitle'>Detalji narudzbe</h2>

        <div className='historyDetailOrders'>
          <table className='historyDetailTable'>
            <thead>
              <tr>
                <th>IME</th>
                <th>ADRESA</th>
                <th>POSTANSKI BROJ</th>
              </tr>
            </thead>
            <tbody>
              <tr key={paymentDetails.paymentID}>
                <td>{paymentDetails.name}</td>
                <td>{`${paymentDetails.address},${paymentDetails.city}`}</td>
                <td>{paymentDetails.zip}</td>
              </tr>
            </tbody>
          </table>
          <table className='historyDetailTable'>
            <thead>
              <tr>
                <th></th>
                <th>PROIZVOD</th>
                <th>KOLICINA</th>
                <th>CIJENA</th>
              </tr>
            </thead>
            <tbody>
              {paymentDetails.cart.map((item: any) => {
                return (
                  <tr key={item._id}>
                    <td>
                      <img
                        className='historyDetailImg'
                        src={item.images.url}
                        alt='Slika proizvoda'
                      />
                    </td>
                    <td>{item.title}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price * item.quantity} KM</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
