import { QUERY_ENTERED,
    BAR_CHART_DATA_FETCH_SUCCESS,
    CHART_DATA_FETCH_PROGRESS,
    CHART_SEARCH_SUCCESS,
    CHART_SEARCH_FAILURE,
    TABLEAU_CHART_SEARCH_SUCCESS } from './../actions/types';


const INITIAL_STATE = {
     updatedQuery : '',
     displayMsgFromUser : '',
     searchProgress : false,
     error : '',
     chartSearchSuccess : false,
     chartData : '',
     chartNotFound : false,
     tableauChartSearchSuccess : false
};

export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case BAR_CHART_DATA_FETCH_SUCCESS : 
            return action.payload;
        case QUERY_ENTERED : 
            return { ...state, updatedQuery: action.payload };
        case CHART_DATA_FETCH_PROGRESS : 
            return { ...state, searchProgress: true, error: '' };
        case CHART_SEARCH_SUCCESS : {
            return { ...state, searchProgress: false, chartSearchSuccess: true, chartData: action.payload, tableauChartSearchSuccess: false, chartNotFound: false };
        }
        case CHART_SEARCH_FAILURE : {
            return { ...state, searchProgress: false, chartSearchSuccess: false, chartNotFound: true, tableauChartSearchSuccess: false }
        }
        case TABLEAU_CHART_SEARCH_SUCCESS : {
            return { ...state, searchProgress: false, chartSearchSuccess: false, tableauChartSearchSuccess: true, chartNotFound: false }
        }
        default : 
            return state;
    }
}