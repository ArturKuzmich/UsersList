import React from 'react';
import ReactDOM from 'react-dom';
import  {Provider} from 'react-redux'
import reportWebVitals from './reportWebVitals';
import UsersList from "./Components/userslist/userslist";
import thunk from "redux-thunk";
import {createStore, applyMiddleware, compose} from "redux";
import rootReducer from "./reducers/rootReducer";

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

const App = () => {
    return (
        <UsersList />
    )
}

ReactDOM.render(
      <Provider store={store}>
            <App />
      </Provider>,
  document.getElementById('root')
);

reportWebVitals();
