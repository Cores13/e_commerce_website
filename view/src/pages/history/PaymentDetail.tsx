import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import "./PaymentDetail.css";
import { GlobalState } from "../../GlobalState";
import { Link } from "react-router-dom";

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

  console.log(paymentDetails);

  if (paymentDetails.length === 0) {
    return null;
  }
  return (
    <div className='historyDetail'>
      <div className='historyDetailWrapper'>
        <h2 className='historyDetailTitle'>Historija narudzbe</h2>
        {/* <h4 className='historyDetailSubTitle'>Narucili ste:</h4> */}

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
                <td>{`${paymentDetails.address.address_line_1},${paymentDetails.address.admin_area_2}`}</td>
                <td>{paymentDetails.address.postal_code}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
