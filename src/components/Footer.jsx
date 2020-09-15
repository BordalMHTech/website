import React from "react";

export default (props) => {
  return (
    <div {...props}>
      <div
        className="mt-3 w-100 text-center"
        style={{
          zIndex: 999,
          // textShadow: "0 0 25px rgba(0, 0, 0, .75)",
          // fontWeight: 400,
          // fontSize: 25,
        }}
      >
        <i className="fal fa-copyright fa-flip-horizontal" />
        <span className="">{`${new Date().getFullYear()}`}</span>
        <span className="mx-1">{`©`}</span>
        <a style={{ fontWeight: 1000 }} href="http://www.mhtech.no/">
          MHTech
        </a>
      </div>
    </div>
  );
};
