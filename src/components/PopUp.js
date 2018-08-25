import React, { Component } from 'react';

import '../css/PopUp.css';

const PopUp = ({ item, func, x, y }) => {
  return (
    <div
      className="PopUpContainer"
      style={{
        left: x,
        top: y,
        width: item.clicked.width,
        height: item.clicked.height,
      }}>
      {item.clicked.text}
      {item.clicked.options ? (
        <div className="PopUpOptions">
          {item.clicked.options.map((option, i) => {
            return (
              <button className="PopUpButton" id={i} onClick={func}>
                {option.text}
              </button>
            );
          })}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default PopUp;
