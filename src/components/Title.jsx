import React from "react";

export default ({ children, append, ...props }) => {
  return (
    <div {...props}>
      <div className="w-100 d-flex justify-content-between align-items-end flex-wrap">
        <h4 className="mt-3">{children}</h4>
        {append}
      </div>
      <hr className="mt-0" />
    </div>
  );
};
