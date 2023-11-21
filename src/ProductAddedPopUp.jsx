import { useState, useEffect } from "react";
import { animated, useSpring } from '@react-spring/web'


export function useProductAddedPopUp() {
  const [productPopup, setProductPopup] = useState(null);

  useEffect(() => {
    let timeout;
    if (productPopup != "") {
      timeout = setTimeout(() => {
        setProductPopup(null);
      }, 3000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [productPopup]);

  return [productPopup, setProductPopup];
}

export const ProductAddedPopUp = ({ productPopup }) => {
  const popUpElement = document.getElementById("huk");
  const width = popUpElement ? popUpElement.clientWidth : 0;
  
  const styles = useSpring({
    from: {
      opacity: 0,
      x: !productPopup ? -10 : width,
    },
    to: {
      opacity: productPopup ? 1 : 0,
      x: productPopup ? -10 : width,
    },
    config: {
      tension: 50,
      friction: 10,
    },
  });

  return (
    <animated.div id="huk" style={styles} >
        {productPopup}
      &nbsp;was added to your cart
    </animated.div>
  );
}
