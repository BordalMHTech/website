import React from "react";

export default (props) => {
  return (
    <div {...props}>
      <div
        className="my-3 w-100 text-center text-white stroke"
        style={{
          zIndex: 999,
          textShadow: "0 0 25px rgba(0, 0, 0, .75)",
          fontWeight: 400,
          fontSize: 25,
        }}
      >
        <i className="fal fa-copyright fa-flip-horizontal" />
        <span className="black-stroke">{`${new Date().getFullYear()}`}</span>
        <span className="ml-1 black-stroke">{`©`}</span>
        <a
          style={{ fontWeight: 1000 }}
          className="ml-1 green-stroke"
          href="http://www.mhtech.no/"
        >
          MHTech
        </a>
      </div>
    </div>
  );
};
