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

export const Popup = ({ popupText }) => {
  const popUpElement = document.getElementById("huk");
  const width = popUpElement ? popUpElement.clientWidth : 0;
  
  const styles = useSpring({
    from: {
      opacity: 0,
      x: !popupText ? -10 : width,
    },
    to: {
      opacity: popupText ? 1 : 0,
      x: popupText ? -10 : width,
    },
    config: {
      tension: 50,
      friction: 10,
    },
  });

  return (
    <animated.div id="huk" style={styles} >
        {popupText}
      &nbsp;was added to your cart
    </animated.div>
  );
}
