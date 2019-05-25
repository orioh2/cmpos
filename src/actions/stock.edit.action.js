import {httpClient} from "./../utils/HttpClient";
import {
  HTTP_STOCK_EDIT_SUCCESS,
  HTTP_STOCK_EDIT_FETCHING,
  HTTP_STOCK_EDIT_FAILED,
  HTTP_STOCK_EDIT_INITIALED,
  server
} from "../constants";

const setStateStockToSuccess = payload => ({
  type: HTTP_STOCK_EDIT_SUCCESS,
  payload: payload
});

const setStateStockToFetching = () => ({
  type: HTTP_STOCK_EDIT_FETCHING,
});

const setStateStockToFailed = () => ({
  type: HTTP_STOCK_EDIT_FAILED
});

const setStateStockToInitialed = (isFinished) => ({
  type: HTTP_STOCK_EDIT_INITIALED,
  payload: isFinished
});

export const finishInitialization = (isFinished)=>{
  return dispatch => {
    dispatch(setStateStockToInitialed(isFinished))
  }
} 


export const getProductById = (id) => {  
  return dispatch => {
    dispatch(finishInitialization(false))
    dispatch(setStateStockToFetching())
    httpClient
    .get(`${server.PRODUCT_URL}/id/${id}`)
    .then(result => {
      dispatch(setStateStockToSuccess(result.data));
    })
    .catch(err => {
      console.log(err);
      dispatch(setStateStockToFailed());
    });
  };
};


export const updateProduct = (history, data)=>{
  return dispatch => {
    dispatch(setStateStockToFetching())
    httpClient.put(server.PRODUCT_URL, data).then(result => {      
      history.goBack();
    });
  }
}