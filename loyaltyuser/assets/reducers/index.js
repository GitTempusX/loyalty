import {combineReducers} from 'redux';
import SelectionReducer from './SelectionReducer';
import FooterReducer from './FooterReducer';

export default combineReducers({
    selectedProduct: SelectionReducer,
    selectedFooter: FooterReducer
});