import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { loginState } from '../components/User';
import { AlbumsList } from '../components/Home';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducers = combineReducers({
    loginState,
    AlbumsList,
});
const configuretore = (initialState) => {
    return createStore(
        reducers,
        initialState,
        composeEnhancers(applyMiddleware(thunkMiddleware))
    );
};

export default configuretore;