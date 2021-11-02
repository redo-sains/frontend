/** @format */

import axios from "../helpers/axios";
import { wishlistConstants } from "./constants";
import store from "../store";

const getWishlistItems = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: wishlistConstants.ADD_TO_WISHLIST_REQUEST });
      const res = await axios.post(`/user/getWishlistItems`);
      if (res.status === 200) {
        const { wishlistItems } = res.data;
        console.log({ getWishlistItems: wishlistItems });
        if (wishlistItems) {
          dispatch({
            type: wishlistConstants.ADD_TO_WISHLIST_SUCCESS,
            payload: { wishlistItems },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addToWishlist = (product, newQty = 1) => {
  return async (dispatch) => {
    const {
      wishlist: { wishlistItems },
      auth,
    } = store.getState();
    console.log(store.getState(), "stateobject");
    //console.log('action::products', products);
    //const product = action.payload.product;
    //const products = state.products;
    const qty = wishlistItems[product._id]
      ? parseInt(wishlistItems[product._id].qty + newQty)
      : 1;

    console.log(product, "this product");
    wishlistItems[product._id] = {
      ...product,
      qty,
    };

    if (auth.authenticate) {
      dispatch({ type: wishlistConstants.ADD_TO_WISHLIST_REQUEST });
      const payload = {
        // wishlistItems: Object.keys(wishlistItems).map((key, index) => {
        //     return {
        //         quantity: wishlistItems[key].qty,
        //         product: wishlistItems[key]._id
        //     }
        // })

        wishlistItems: [
          {
            product: product._id,
            quantity: qty,
          },
        ],
      };
      console.log(payload);
      const res = await axios.post(`/user/wishlist/addtowishlist`, payload);
      console.log(res);
      if (res.status === 201) {
        dispatch(getWishlistItems());
      }
    } else {
      localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
    }

    console.log("addToWishlist::", wishlistItems);

    dispatch({
      type: wishlistConstants.ADD_TO_WISHLIST_SUCCESS,
      payload: { wishlistItems },
    });
  };
};

export const removeWishlistItem = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: wishlistConstants.REMOVE_WISHLIST_ITEM_REQUEST });
      const res = await axios.post(`/user/wishlist/removeItem`, { payload });
      if (res.status === 202) {
        dispatch({ type: wishlistConstants.REMOVE_WISHLIST_ITEM_SUCCESS });
        dispatch(getWishlistItems());
      } else {
        const { error } = res.data;
        dispatch({
          type: wishlistConstants.REMOVE_WISHLIST_ITEM_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateWishlist = () => {
  return async (dispatch) => {
    const { auth } = store.getState();
    let wishlistItems = localStorage.getItem("wishlist")
      ? JSON.parse(localStorage.getItem("wishlist"))
      : null;

    console.log("upppppppppp");

    if (auth.authenticate) {
      localStorage.removeItem("wishlist");
      // dispatch(getWishlistItems());
      if (wishlistItems) {
        const payload = {
          wishlistItems: Object.keys(wishlistItems).map((key, index) => {
            return {
              product: wishlistItems[key]._id,
              quantity: wishlistItems[key].qty,
            };
          }),
        };
        if (Object.keys(wishlistItems).length > 0) {
          const res = await axios.post(`/user/wishlist/addtowishlist`, payload);
          if (res.status === 201) {
            dispatch(getWishlistItems());
          }
        }
      }
    } else {
      if (wishlistItems) {
        dispatch({
          type: wishlistConstants.ADD_TO_WISHLIST_SUCCESS,
          payload: { wishlistItems },
        });
      }
    }
  };
};

export { getWishlistItems };
