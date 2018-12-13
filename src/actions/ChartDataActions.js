import { Actions } from 'react-native-router-flux';
import { QUERY_ENTERED,
    BAR_CHART_DATA_FETCH_SUCCESS,
    CHART_SEARCH_PROGRESS,
    CHART_SEARCH_SUCCESS,
    CHART_SEARCH_FAILURE,
    TABLEAU_CHART_SEARCH_SUCCESS } from './types';
import firebase from 'firebase';

export const barChartDataFetch = (barChartData) => {

    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/barChartData`)
        //this .on will watch for file change for entire lifecycle of the application
            .on('value', snapshot => {
                dispatch({ type: EMPLOYEE_FETCH_SUCCESS, payload: snapshot.val() });
            })
    }

    // return ({
    //     type: BAR_CHART_DATA_FETCH_SUCCESS,
    //     payload: barChartData
    // });
}

export const queryUpdated = (text) => {
    //console.log("from Actions : ",text)
    return ({
        type: QUERY_ENTERED,
        payload: text
    });
}

export const searchChart = ({ updatedQuery }) => {
    //console.log("Search Query Actions : ",updatedQuery);
    return (dispatch) => {
        const data = require('./../assets/bar-chart-data.json');
        //console.log("data !!!!!!!!!!!!!!!!!!!!!!",data)
        if(updatedQuery === 'show me denials' || updatedQuery === 'Show me denials'){
            dispatch({ type: CHART_SEARCH_SUCCESS, payload: data.data});
        } else if(updatedQuery === 'tableau chart' || updatedQuery === 'Tableau chart') {
            dispatch({ type: TABLEAU_CHART_SEARCH_SUCCESS })
        } else {
            dispatch({ type: CHART_SEARCH_FAILURE })
        }
        //dispatch({ type: CHART_SEARCH_PROGRESS });

        //console.log("Search Query : ",updatedQuery);
    }
    // return (dispatch) => {
    //     dispatch({ type: LOGIN_USER_PROGRESS });
    //     firebase.auth().signInWithEmailAndPassword(email, password)
    //     .then(user => loginSuccessDispatcher(dispatch, user))
    //     .catch(() => {
    //         firebase.auth().createUserWithEmailAndPassword(email, password)
    //         .then(user => loginSuccessDispatcher(dispatch, user))
    //         .catch(() => loginFailDispatcher(dispatch));
    //     })
    // };
};
