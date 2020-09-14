import React from "react";

export default ({ image, color = "rgba(150, 150, 150, 0.55)", ...props }) => {
  const commonProps = {
    position: "fixed",
    height: "100vh",
    width: "100vw",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  };

  return (
    <div {...props}>
      {image && (
        <div
          style={{
            ...commonProps,
            backgroundImage: `url(${image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}
      <div
        style={{
          ...commonProps,
          backgroundColor: color,
        }}
      />
    </div>
  );
};
