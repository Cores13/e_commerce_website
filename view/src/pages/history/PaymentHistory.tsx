import React, { useContext } from "react";
import "./PaymentHistory.css";
import axios from "axios";
import { GlobalState } from "../../GlobalState";
import { Link } from "react-router-dom";

interface Props {}

export const PaymentHistory = (props: Props) => {
  const state = useContext(GlobalState);
  const [history] = state?.userAPI?.history;

  console.log(history);
  return (
    <div className='history'>
      <div className='historyWrapper'>
        <h2 className='historyTitle'>Historija</h2>
        <h4 className='historySubTitle'>Narucili ste:</h4>

        <div className='historyOrders'>
          <table className='historyTable'>
            <thead>
              <tr>
                <th>ID NARUDZBE</th>
                <th>DATUM KUPOVINE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {history.map((items: any) => {
                return (
                  <tr key={items._id}>
                    <td>{items.paymentID}</td>
                    <td>{items.createdAt}</td>
                    <td>
                      <Link to={`/history/${items._id}`}>View</Link>
                    </td>
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
