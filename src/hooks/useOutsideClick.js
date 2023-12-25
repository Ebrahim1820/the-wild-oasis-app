import { useEffect, useRef } from "react";

function useOutsideClick(handler, listenCapturing = true) {
  // to close window when we click outside of window
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          // close handler
          handler();
        }
      }

      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );
  return ref;
}

export default useOutsideClick;
