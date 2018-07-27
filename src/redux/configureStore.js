import {createStore, applyMiddleware} from 'redux';
import modules from './modules';
import thunk from 'redux-thunk';

const configureStore = () => {
    const store = createStore(modules, applyMiddleware(thunk));
    return store;
};

export default configureStore;
