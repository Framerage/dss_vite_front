import React from "react";
import {LIGHT_MAIN_APP_COLOR} from "styles/defaultColors";
import classes from "./pointLoader.module.css";

const PointLoader: React.FC<{scale?: number}> = ({scale}) => {
  const dots = Array(20).fill({color: LIGHT_MAIN_APP_COLOR}, 0);

  const itemStyle = (index: number) => {
    return {
      transform: `rotate(calc(360deg / ${dots.length} * ${index})) scale(${
        scale || 1
      })`,
    };
  };
  const dotStyle = (color: string, index: number) => {
    return {
      backgroundColor: `${color}`,
      boxShadow: `0 0 10px ${color},0 0 20px ${color},
        0 0 40px ${color}, 0 0 50px ${color}`,
      animationDelay: `calc(0.1s * ${index})`,
    };
  };
  return (
    <div className={classes.dlContainer}>
      {dots.map((el, index) => (
        <div key={index} className={classes.dlItem} style={itemStyle(index)}>
          <div className={classes.dot} style={dotStyle(el.color, index)}></div>
        </div>
      ))}
    </div>
  );
};
export default PointLoader;
