import React from 'react'; //ไม่ได้ใช้แต่ต้องมี
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reducers from './reducers';
import logger from 'redux-logger'

const dev_middlewares = [];
if (process.env.NODE_ENV === `development`) {
  dev_middlewares.push(logger);
}

//const store = createStore(reducers,  applyMiddleware(thunk,logger)) // Simple way
const store = createStore(reducers,  applyMiddleware(thunk,...dev_middlewares))  // Advance way

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
