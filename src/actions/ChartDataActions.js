import { Actions } from 'react-native-router-flux';
import { QUERY_ENTERED,
    BAR_CHART_DATA_FETCH_SUCCESS,
    CHART_SEARCH_SUCCESS,
    CHART_SEARCH_FAILURE,
    TABLEAU_CHART_SEARCH_SUCCESS,
    CHART_DATA_FETCH_PROGRESS } from './types';
import firebase from 'firebase';

//Not used any more with dynamic data
export const barChartDataFetch = (barChartData) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/barChartData`)
            .on('value', snapshot => {
                dispatch({ type: EMPLOYEE_FETCH_SUCCESS, payload: snapshot.val() });
            })
    }
}

export const queryUpdated = (text) => {
    return ({
        type: QUERY_ENTERED,
        payload: text
    });
}

export const searchChart = ({ updatedQuery }) => {
    return (dispatch) => {
        dispatch({ type: CHART_DATA_FETCH_PROGRESS});

        if(updatedQuery === 'show me denials' || updatedQuery === 'Show me denials'){
            firebase.database().ref(`/data`)
                .on('value', snapshot => {
                    dispatch({
                        type: CHART_SEARCH_SUCCESS,
                        payload: snapshot.val()
                    });
                })
        } else if(updatedQuery === 'tableau chart' || updatedQuery === 'Tableau chart') {
            dispatch({ type: TABLEAU_CHART_SEARCH_SUCCESS })
        } else {
            dispatch({ type: CHART_SEARCH_FAILURE })
        }
        //Using Mock Json

        // const data = require('./../assets/bar-chart-data.json');
        // if(updatedQuery === 'show me denials' || updatedQuery === 'Show me denials'){
        //     dispatch({ type: CHART_SEARCH_SUCCESS, payload: data.data});
        // } else if(updatedQuery === 'tableau chart' || updatedQuery === 'Tableau chart') {
        //     dispatch({ type: TABLEAU_CHART_SEARCH_SUCCESS })
        // } else {
        //     dispatch({ type: CHART_SEARCH_FAILURE })
        // }
    }
};
