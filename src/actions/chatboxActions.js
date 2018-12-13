import { Actions } from 'react-native-router-flux';
import {
    CHATBOX_USER_QUERY_ENTERED,
    CHATBOX_CHART_SEARCH_SUCCESS,
    CHATBOX_QUERY_ENTER_IN_PROGRESS
} from './types';

export const chatboxUserQueryUpdate = (text) => {
    //console.log("user Query ACTIONS: ", text)

    return ({
        type: CHATBOX_QUERY_ENTER_IN_PROGRESS,
        payload: text
    });

    // return ({
    //     type: CHATBOX_USER_QUERY_ENTERED,
    //     payload: text
    // });
}

export const chatboxQuerySearch = ({ chatboxQueryUpdate }) => {
    let RandomNumber = Math.floor(Math.random() * 1000000) + 1;
    let dataForChart = [];
    return (dispatch) => {
        let dataToSend = {
            from: '',
            query: '',
            resFromBot: '',
            queryType: ''
        };
        //console.log("chatboxQueryUpdate!!!!!!!!!!!",chatboxQueryUpdate);
        const data = require('./../assets/bar-chart-data.json');
        const generalUserQueriesChatbotResponse = require('./../assets/generalUserQueriesChatbotResponse.json');
        const quesWithRes = generalUserQueriesChatbotResponse.queriesWithResponse
        //console.log("Query Entered, DataSearch from json",data);
        //console.log("Query Entered, Saved queries and responses",quesWithRes);
        let resOfBot = quesWithRes.filter(element => {
            if (element.query === chatboxQueryUpdate) {
                return element.query === chatboxQueryUpdate
            } else {
                return element.query === 'outofcontext'
            }
        });
        // data.data.forEach(element => {

        //     //console.log("element",element)
        //     //element.id = element.id+RandomNumber*RandomNumber/1000;
        // });
        dataForChart = data.data.map(data => {
            return dataCheck = {
                id: data.id + RandomNumber,
                name: data.name,
                height: data.height
            }

        });
        console.log("dataForChart@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", dataForChart);


        //console.log("Response Of Bot $$$$$$$$$$$$$$$$$$$$",denialsData)

        if (resOfBot[0].isGeneralQueryType) {
            dataToSend = {
                id: resOfBot[0].id + RandomNumber,
                msgFrom: 'user',
                query: chatboxQueryUpdate,
                resFromBot: resOfBot[0].res,
                isGeneralQueryType: resOfBot[0].isGeneralQueryType
            };
        } else {
            dataToSend = {
                id: resOfBot[0].id + RandomNumber,
                msgFrom: 'user',
                query: chatboxQueryUpdate,
                resFromBot: dataForChart,
                // resFromBot: data.data,
                isGeneralQueryType: resOfBot[0].isGeneralQueryType
            };
        }
        dispatch({ type: CHATBOX_USER_QUERY_ENTERED, payload: dataToSend });
    }
}