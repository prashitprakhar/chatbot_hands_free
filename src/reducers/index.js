import { combineReducers } from 'redux';
import AuthReducer from './authReducer';
import BarChartDataReducer from './barChartDataReducer';
import ChatboxDataReducer from './chatboxDataReducer';

export default combineReducers({
    //banana : () => []
    auth: AuthReducer,
    chartData: BarChartDataReducer,
    chatboxData: ChatboxDataReducer
})