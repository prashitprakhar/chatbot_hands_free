import { Actions } from 'react-native-router-flux';
import { EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER_PROGRESS
} from './types';
import firebase from 'firebase';

export const emailChanged = (text) => {
    return ({
        type: EMAIL_CHANGED,
        payload: text
    })
};

export const passwordChanged = (text) => {
    return ({
        type: PASSWORD_CHANGED,
        payload: text
    })
}

export const loginUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER_PROGRESS });
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => loginSuccessDispatcher(dispatch, user))
        .catch(() => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => loginSuccessDispatcher(dispatch, user))
            .catch(() => loginFailDispatcher(dispatch));
        })
    };
};

const loginSuccessDispatcher = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
    Actions.main();
};

const loginFailDispatcher = (dispatch) => {
    dispatch({
        type: LOGIN_USER_FAIL
    })
}