import { useState, useEffect } from "react";
import { animated, useSpring } from '@react-spring/web'


export function usePopup() {
  const [popupText, setPopupText] = useState(null);

  useEffect(() => {
    let timeout;
    if (popupText != "") {
      timeout = setTimeout(() => {
        setPopupText(null);
      }, 3000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [popupText]);

  return [popupText, setPopupText];
}

export const Popup = ({ popupText, popupTextGood = true }) => {
  const popUpElement = document.getElementById("popup");
  const width = popUpElement ? popUpElement.clientWidth : 0;
  
  const styles = useSpring({
    from: {
      opacity: 0,
      x: !popupText ? -10 : width,
      backgroundColor: popupTextGood ? "#93cc3e" : "#ba3636",
    },
    to: {
      opacity: popupText ? 1 : 0,
      x: popupText ? -10 : width,
      backgroundColor: popupTextGood ? "#93cc3e" : "#ba3636",
    },
    config: {
      tension: 50,
      friction: 10,
    },
  });

  return (
    <animated.div id="popup" style={styles} >
      {popupText}
    </animated.div>
  );
}
