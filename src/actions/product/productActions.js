import { API_URL } from "../../utils/Config";
import { predictTimeoutPromise } from "../../utils/Tools";

import {PRODUCT_FAILURE,PRODUCT_LOADING,FETCH_PRODUCTS} from '../../@types/productActionTypes'

export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch({
      type: PRODUCT_LOADING,
    });
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/product`, {
          method: "GET",
        })
      );

      if (!response.ok) {
        dispatch({
          type: PRODUCT_FAILURE,
        });
        throw new Error("Something went wrong!, can't get the products");
      }
      const resData = await response.json();
      dispatch({
        type: FETCH_PRODUCTS,
        products: resData.content,
      });
    } catch (err) {
      throw err;
    }
  };
};
