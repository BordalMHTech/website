import React from "react";

export default ({ children, ...props }) => {
  return (
    <div {...props}>
      <small className="text-danger">{children}</small>
    </div>
  );
};
