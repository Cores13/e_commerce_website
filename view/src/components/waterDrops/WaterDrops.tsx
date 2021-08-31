import React from "react";
import "./WaterDrops.css";
export const WaterDrops = () => {
  const n = 35;
  return (
    <div className='waterDrops'>
      {[...Array(n)].map((e, i) => (
        <div
          className='drop droplet'
          key={i}
          style={{
            top: `${Math.ceil(Math.random() * (99 - 1) + 1)}%`,
            left: `${Math.ceil(Math.random() * (99 - 1) + 1)}%`,
          }}></div>
      ))}
    </div>
  );
};
