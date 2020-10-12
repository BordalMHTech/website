import React, { useRef, useEffect } from "react";

export default (props, pre = true) => {
  const dots1 = useRef();
  const dots2 = useRef();
  useEffect(() => {
    setInterval(() => {
      if (dots1.current && dots2.current) {
        const symbols = [" × ", " ÷ ", " + "];
        const index = dots1.current.innerHTML.length / 3;
        if (
          (dots1.current.innerHTML.length === -1 &&
            dots2.current.innerHTML.length === -1) ||
          (dots1.current.innerHTML.length / 3 >= symbols.length &&
            dots2.current.innerHTML.length / 3 >= symbols.length)
        ) {
          dots1.current.innerHTML = "";
          dots2.current.innerHTML = "";
        } else {
          dots1.current.innerHTML += symbols[index];
          //   dots2.current.innerHTML += symbols[index];
          dots2.current.innerHTML += symbols[symbols.length - 1 - index];
        }
      }
    }, 350);
  }, [dots1, dots2]);

  return (
    <>
      <span ref={dots1} hidden={!pre} className="text-secondary" />
      <span className="mx-3">{props.children}</span>
      <span ref={dots2} className="text-secondary" />
    </>
  );
};
