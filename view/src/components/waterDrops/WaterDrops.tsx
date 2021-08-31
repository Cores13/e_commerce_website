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
            top: `${Math.floor(Math.random() * (100 - 0))}%`,
            left: `${Math.floor(Math.random() * (100 - 0))}%`,
          }}></div>
      ))}
    </div>
  );
};
