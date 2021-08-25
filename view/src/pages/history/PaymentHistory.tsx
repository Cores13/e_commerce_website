import React, { useContext, useEffect } from "react";
import "./PaymentHistory.css";
import { GlobalState } from "../../GlobalState";
import { Link } from "react-router-dom";
import axios from "axios";

export const PaymentHistory: React.FC = () => {
  const state = useContext(GlobalState);
  const [history, setHistory] = state?.userAPI?.history;
  const [isAdmin] = state?.userAPI?.isAdmin;
  const [token] = state?.token;

  useEffect(() => {
    if (token) {
      const getHistory = async () => {
        if (isAdmin) {
          const res = await axios.get("/api/payment", {
            headers: { Authorization: token },
          });
          setHistory(res.data);
        } else {
          const res = await axios.get("/user/history", {
            headers: { Authorization: token },
          });
          setHistory(res.data);
        }
      };
      getHistory();
    }
  }, [token, isAdmin, setHistory]);

  console.log(history);
  return (
    <div className='history'>
      <div className='historyWrapper'>
        <h2 className='historyTitle'>Historija narudzbi</h2>
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
                    <td>{new Date(items.createdAt).toLocaleDateString()}</td>
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
