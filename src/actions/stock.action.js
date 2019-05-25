import { httpClient } from "./../utils/HttpClient";
import {
  HTTP_STOCK_SUCCESS,
  HTTP_STOCK_FETCHING,
  HTTP_STOCK_FAILED,
  server
} from "../constants";

const setStateStockToSuccess = payload => ({
  type: HTTP_STOCK_SUCCESS,
  payload: payload
});

const setStateStockToFetching = () => ({
  type: HTTP_STOCK_FETCHING
});

const setStateStockToFailed = () => ({
  type: HTTP_STOCK_FAILED
});

export const addProduct = (history, data)=>{
  return dispatch=>{
   httpClient.post(server.PRODUCT_URL, data).then(result=>{
     history.goBack();
   })
  }
}

export const deleteProduct = id => {
  return dispatch => {
    dispatch(setStateStockToFetching());
    httpClient
      .delete(`${server.PRODUCT_URL}/id/${id}`)
      .then(result => {
        doGetProducts(dispatch);
      })
      .catch(err => {
        console.log(err);
        dispatch(setStateStockToFailed());
      });
  };
};



const doGetProducts =(dispatch)=>{
  httpClient
  .get(server.PRODUCT_URL)
  .then(result => {
    dispatch(setStateStockToSuccess(result.data));
  })
  .catch(err => {
    console.log(err);
    dispatch(setStateStockToFailed());
  });
}

export const getProduct = () => {
  return dispatch => {
    dispatch(setStateStockToFetching());
    doGetProducts(dispatch);
    
  };
};

export const getProductByKeyword = event => {
  return dispatch => {
    var keyword = event.target.value;
    dispatch(setStateStockToFetching());
    
    if (keyword !== null && keyword != "") {
      httpClient.get(`${server.PRODUCT_URL}/name/${keyword}`).then(result => {
        dispatch(setStateStockToSuccess(result.data));
      });
    } else {
      doGetProducts(dispatch);
    }
  };
};