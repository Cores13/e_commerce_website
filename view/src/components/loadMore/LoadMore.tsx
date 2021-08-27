import React, { useContext } from "react";
import "./LoadMore.css";
import { GlobalState } from "../../GlobalState";

interface Props {}

export const LoadMore = (props: Props) => {
  const state = useContext(GlobalState);
  const [page, setPage] = state?.productsAPI.page;
  const [result] = state?.productsAPI.result;

  return (
    <div className='loadMore'>
      {result < page * 10 ? (
        ""
      ) : (
        <button className='loadMoreBtn' onClick={() => setPage(page + 1)}>
          Ucitaj vise artikala
        </button>
      )}
    </div>
  );
};
