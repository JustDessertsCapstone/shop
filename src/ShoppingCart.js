import {useState} from "react";

const [cart, setCart] = useState([]);

const addToCart = (product) => {
    setCart([...cart, product]);
};

const removeFromCart = (index) => {
    const updateCart = [...index];
    updateCart.splice(index, 1);
    setCart(updateCart);
};


const clearCart = () => {
    setCart([]);
};

export {cart, addToCart, removeFromCart, clearCart};