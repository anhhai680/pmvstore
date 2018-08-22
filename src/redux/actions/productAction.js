import { WooAPI } from '../../services/WooAPI';
import {
  PRODUCT_TEM_COLOR_SELECTED,
  PRODUCT_INK_COLOR_SELECTED,
  PRODUCT_CODE_SELECTED,
  PRODUCT_PRINTER_SELECTED,
  PRODUCT_QUANTITY_CHANGED,
  PRODUCT_VARIATIONS_SUCCESS,
  PRODUCT_VARIATIONS_FAILURE,
  PRODUCT_VARIATIONS_REQUEST,
  PRODUCT_ATTRIBUTE_TERM_REQUEST,
  PRODUCT_ATTRIBUTE_TERM_ERROR,
  PRODUCT_ATTRIBUTE_TERM_SUCCESS
} from '../constants/actionTypes';


export const onTemSelected = (valueColor) => (dispatch) => {
  dispatch({ type: PRODUCT_TEM_COLOR_SELECTED, payload: { valueColor } });
};

export const onInkSelected = (valueColor) => (dispatch) => {
  dispatch({ type: PRODUCT_INK_COLOR_SELECTED, payload: { valueColor } });
};

export const onProductCodeSelected = (codeSelected) => (dispatch) => {
  dispatch({ type: PRODUCT_CODE_SELECTED, payload: { codeSelected } });
};

export const onPrinterSelected = (selectedPrinter) => (dispatch) => {
  dispatch({ type: PRODUCT_PRINTER_SELECTED, payload: { selectedPrinter } });
};

export const onProductQuantityChanged = (productQuantity) => (dispatch) => {
  dispatch({ type: PRODUCT_QUANTITY_CHANGED, payload: { productQuantity } });
};

export const getProductVariations = (id) => async (dispatch) => {
  dispatch({ type: PRODUCT_VARIATIONS_REQUEST });
  try {
    const response = await WooAPI.productVariant(id);
    if (response) {
      if (response.code !== undefined) {
        dispatch({
          type: PRODUCT_VARIATIONS_FAILURE,
          payload: {
            data: null,
            status: response.data.status,
            message: response.message
          }
        });
      }
      dispatch({
        type: PRODUCT_VARIATIONS_SUCCESS,
        payload: {
          data: response,
          status: 200,
          message: 'Product Variations has been successfully received'
        }
      });
    }
  }
  catch (error) {
    dispatch({
      type: PRODUCT_VARIATIONS_FAILURE,
      payload: {
        data: null,
        status: -99,
        message: error
      }
    });
  }
};

export const getProductAttributeTerms = (attrId, termId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_ATTRIBUTE_TERM_REQUEST });
    const response = await WooAPI.getProductAttributeTerms(attrId, termId);
    if (response) {
      if (response.hasOwnProperty('id')) {
        dispatch({
          type: PRODUCT_ATTRIBUTE_TERM_SUCCESS,
          payload: {
            terms: response
          }
        })
      } else {
        dispatch({
          type: PRODUCT_ATTRIBUTE_TERM_ERROR,
          payload: {
            code: response.code,
            message: response.message,
            status: response.data.status
          }
        });
      }
    } else {
      dispatch({
        type: PRODUCT_ATTRIBUTE_TERM_ERROR,
        payload: {
          code: "unknown_error",
          message: response,
          status: -99
        }
      });
    }
  } catch (error) {
    dispatch({
      type: CREATE_NEW_ORDER_ERROR,
      payload: {
        code: "Exception error",
        message: error,
        status: -99
      }
    });
    console.error(error);
  }
}

