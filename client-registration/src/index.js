import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';
import { loadState, saveState } from './localStorage';

const initialState = loadState();
const store = createStore(reducers,initialState,applyMiddleware(thunk));

let currentState;
store.subscribe(() => {
    let previousState = currentState;
    if (!previousState) {
        previousState = { token: null, clientDetails: null };
    } 
    console.log('Previous token:',previousState.token);
    currentState = store.getState();
    console.log('Current token:',currentState.token);
    if ((currentState.token && currentState.token !== previousState.token) || (currentState.clientDetails && currentState.clientDetails !== previousState.clientDetails)) {
        console.log('token saved');
        saveState({ token: currentState.token, clientDetails: currentState.clientDetails});
    }
})

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
);