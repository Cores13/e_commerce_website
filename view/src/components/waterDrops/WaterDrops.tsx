import React from "react";
import "./WaterDrops.css";
interface IProps {
  j: number;
}
export const WaterDrops: React.FC<IProps> = ({ j }) => {
  const n = j;
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
