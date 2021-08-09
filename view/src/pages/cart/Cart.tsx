import React, { useState, useEffect } from "react";
import "./Cart.css";

interface Props {}

export const Cart: React.FC = ({}: Props) => {
  return (
    <div className='cartWrapper'>
      <div className='cart'>
        <div className='cartLeft'>
          <div className='cartLeftTop'>left top</div>
          <div className='cartLeftBottom'>
            <ol>
              <li></li>
            </ol>
          </div>
        </div>
        <div className='cartRight'>
          <div className='cartRightTop'>right top</div>
          <div className='cartRightBottom'>right bot</div>
        </div>
      </div>
    </div>
  );
};
