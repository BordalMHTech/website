import React from "react";

export default (props) => {
  return (
    <div {...props}>
      <div
        className="my-3 w-100 text-center text-white stroke"
        style={{
          zIndex: 999,
          textShadow: "0 0 4px rgba(0, 0, 0, 0.25)",
          fontWeight: 1000,
        }}
      >
        <i className="fal fa-copyright fa-flip-horizontal" />
        {`${new Date().getFullYear()} Copyright: MHTech`}
      </div>
    </div>
  );
};
