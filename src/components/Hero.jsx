import React from "react";
import logo from "images/logo.png";

export default () => {
  const subtitle = "CARCULATOR";
  const subProps = {
    style: {
      fontWeight: "bold",
    },
  };

  return (
    <>
      <div className="d-flex w-100">
        <img
          src={logo}
          alt="MHTech logo"
          className="mx-auto"
          style={{
            maxWidth: "75%",
            width: 300,
            height: "100%",
            objectFit: "scale-down",
          }}
        />
      </div>
      <div className="text-center">
        <h1 className="d-none d-sm-block" {...subProps}>
          {subtitle}
        </h1>
        <h3 className="d-block d-sm-none" {...subProps}>
          {subtitle}
        </h3>
      </div>
    </>
  );
};
