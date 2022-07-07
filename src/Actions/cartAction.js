import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../Constants/cartConstant'

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`http://localhost:4000/api/products/product/${id}`);
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data.product._id,
            name: data.product.name,
            image: data.product.image,
            price: data.product.price,
            countInStock: data.product.countInStock,
            qty: qty
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItem));
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

