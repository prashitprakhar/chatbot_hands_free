import {
    CHATBOX_USER_QUERY_ENTERED,
    CHATBOX_QUERY_ENTER_IN_PROGRESS,
    CHATBOX_CHART_DATA_FETCH_PROGRESS,
    CHATBOX_USER_MESSAGE
} from './types';
import firebase from 'firebase';

export const chatboxUserQueryUpdate = (text) => {
    return ({
        type: CHATBOX_QUERY_ENTER_IN_PROGRESS,
        payload: text
    });
}


export const chatboxQuerySearch = ({ chatboxQueryUpdate }) => {
    console.log("CAME HERE $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$",chatboxQueryUpdate);
    let RandomNumber = Math.floor(Math.random() * 1000000) + 1;
    return (dispatch) => {
        let dataToSendUSER = {
            from: '',
            query: '',
            displayMsgFromUser: chatboxQueryUpdate,
            resFromBot: '',
            queryType: ''
        };
        dispatch({type:CHATBOX_USER_MESSAGE, payload: dataToSendUSER});
        setTimeout(() => {
            let dataToSend = {
                from: '',
                query: '',
                displayMsgFromUser: '',
                resFromBot: '',
                queryType: ''
            };
            const generalUserQueriesChatbotResponse = require('./../assets/generalUserQueriesChatbotResponse.json');
            const quesWithRes = generalUserQueriesChatbotResponse.queriesWithResponse;
            let resOfBot = quesWithRes.filter(element => {
                if (element.query === chatboxQueryUpdate) {
                    return element.query === chatboxQueryUpdate
                } else {
                    return element.query === 'outofcontext'
                }
            });
            if (resOfBot[0].isGeneralQueryType) {
                dataToSend = {
                    id: resOfBot[0].id + RandomNumber,
                    msgFrom: 'USER',
                    query: '',
                    displayMsgFromUser: chatboxQueryUpdate,
                    resFromBot: resOfBot[0].res,
                    isGeneralQueryType: resOfBot[0].isGeneralQueryType
                };
                dispatch({ type: CHATBOX_USER_QUERY_ENTERED, payload: dataToSend });
            } else { 
                //Case when data for Chart is needed from Firebase Firestore
                dataToSendWhileSearchInProgress = {
                    id: resOfBot[0].id + RandomNumber,
                    msgFrom: 'USER',
                    query: '',
                    displayMsgFromUser: chatboxQueryUpdate,
                    resFromBot: "Hold on while we search your chart...",
                    isGeneralQueryType: resOfBot[0].isGeneralQueryType
                }
                dispatch({ type: CHATBOX_CHART_DATA_FETCH_PROGRESS, payload: dataToSendWhileSearchInProgress });
                firebase.database().ref(`/data`)
                    .on('value', snapshot => {
                        dataToSendForBarChart = {
                            id: resOfBot[0].id + RandomNumber,
                            msgFrom: 'USER',
                            query: '',
                            displayMsgFromUser: chatboxQueryUpdate,
                            resFromBot: snapshot.val(),
                            isGeneralQueryType: resOfBot[0].isGeneralQueryType
                        }
                        dispatch({
                            type: CHATBOX_USER_QUERY_ENTERED,
                            payload: dataToSendForBarChart
                        });
                    })
            }
        
        },2000);
    //     let dataToSend = {
    //         from: '',
    //         query: '',
    //         displayMsgFromUser: '',
    //         resFromBot: '',
    //         queryType: ''
    //     };
    //     const generalUserQueriesChatbotResponse = require('./../assets/generalUserQueriesChatbotResponse.json');
    //     const quesWithRes = generalUserQueriesChatbotResponse.queriesWithResponse;
    //     let resOfBot = quesWithRes.filter(element => {
    //         if (element.query === chatboxQueryUpdate) {
    //             return element.query === chatboxQueryUpdate
    //         } else {
    //             return element.query === 'outofcontext'
    //         }
    //     });
    //     if (resOfBot[0].isGeneralQueryType) {
    //         dataToSend = {
    //             id: resOfBot[0].id + RandomNumber,
    //             msgFrom: 'USER',
    //             query: '',
    //             displayMsgFromUser: chatboxQueryUpdate,
    //             resFromBot: resOfBot[0].res,
    //             isGeneralQueryType: resOfBot[0].isGeneralQueryType
    //         };
    //         dispatch({ type: CHATBOX_USER_QUERY_ENTERED, payload: dataToSend });
    //     } else { 
    //         //Case when data for Chart is needed from Firebase Firestore
    //         dataToSendWhileSearchInProgress = {
    //             id: resOfBot[0].id + RandomNumber,
    //             msgFrom: 'USER',
    //             query: '',
    //             displayMsgFromUser: chatboxQueryUpdate,
    //             resFromBot: "Hold on while we search your chart...",
    //             isGeneralQueryType: resOfBot[0].isGeneralQueryType
    //         }
    //         dispatch({ type: CHATBOX_CHART_DATA_FETCH_PROGRESS, payload: dataToSendWhileSearchInProgress });
    //         firebase.database().ref(`/data`)
    //             .on('value', snapshot => {
    //                 dataToSendForBarChart = {
    //                     id: resOfBot[0].id + RandomNumber,
    //                     msgFrom: 'USER',
    //                     query: '',
    //                     displayMsgFromUser: chatboxQueryUpdate,
    //                     resFromBot: snapshot.val(),
    //                     isGeneralQueryType: resOfBot[0].isGeneralQueryType
    //                 }
    //                 dispatch({
    //                     type: CHATBOX_USER_QUERY_ENTERED,
    //                     payload: dataToSendForBarChart
    //                 });
    //             })
    //     }
    // }
}
}

// export const eachUserMessageToDisplay = ({ chatboxQueryUpdate }) => {
//     console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",chatboxQueryUpdate);
//     return (dispatch) => {
//         dispatch({type:CHATBOX_USER_MESSAGE, payload: chatboxQueryUpdate})
//         this.chatboxQuerySearch(this);
//     }
// }


// export const chatboxQuerySearch = ({ chatboxQueryUpdate }) => {
//     let RandomNumber = Math.floor(Math.random() * 1000000) + 1;
//     return (dispatch) => {
//         let dataToSend = {
//             from: '',
//             query: '',
//             displayMsgFromUser: '',
//             resFromBot: '',
//             queryType: ''
//         };
//         const generalUserQueriesChatbotResponse = require('./../assets/generalUserQueriesChatbotResponse.json');
//         const quesWithRes = generalUserQueriesChatbotResponse.queriesWithResponse;
//         let resOfBot = quesWithRes.filter(element => {
//             if (element.query === chatboxQueryUpdate) {
//                 return element.query === chatboxQueryUpdate
//             } else {
//                 return element.query === 'outofcontext'
//             }
//         });
//         if (resOfBot[0].isGeneralQueryType) {
//             dataToSend = {
//                 id: resOfBot[0].id + RandomNumber,
//                 msgFrom: 'USER',
//                 query: '',
//                 displayMsgFromUser: chatboxQueryUpdate,
//                 resFromBot: resOfBot[0].res,
//                 isGeneralQueryType: resOfBot[0].isGeneralQueryType
//             };
//             dispatch({ type: CHATBOX_USER_QUERY_ENTERED, payload: dataToSend });
//         } else { 
//             //Case when data for Chart is needed from Firebase Firestore
//             dataToSendWhileSearchInProgress = {
//                 id: resOfBot[0].id + RandomNumber,
//                 msgFrom: 'USER',
//                 query: '',
//                 displayMsgFromUser: chatboxQueryUpdate,
//                 resFromBot: "Hold on while we search your chart...",
//                 isGeneralQueryType: resOfBot[0].isGeneralQueryType
//             }
//             dispatch({ type: CHATBOX_CHART_DATA_FETCH_PROGRESS, payload: dataToSendWhileSearchInProgress });
//             firebase.database().ref(`/data`)
//                 .on('value', snapshot => {
//                     dataToSendForBarChart = {
//                         id: resOfBot[0].id + RandomNumber,
//                         msgFrom: 'USER',
//                         query: '',
//                         displayMsgFromUser: chatboxQueryUpdate,
//                         resFromBot: snapshot.val(),
//                         isGeneralQueryType: resOfBot[0].isGeneralQueryType
//                     }
//                     dispatch({
//                         type: CHATBOX_USER_QUERY_ENTERED,
//                         payload: dataToSendForBarChart
//                     });
//                 })
//         }
//     }
// }
    //Working Copy with Mock Json
    // let RandomNumber = Math.floor(Math.random() * 1000000) + 1;
    // let dataForChart = [];
    // return (dispatch) => {
    //     let dataToSend = {
    //         from: '',
    //         query: '',
    //         resFromBot: '',
    //         queryType: ''
    //     };
    //     const data = require('./../assets/bar-chart-data.json');
    //     const generalUserQueriesChatbotResponse = require('./../assets/generalUserQueriesChatbotResponse.json');
    //     const quesWithRes = generalUserQueriesChatbotResponse.queriesWithResponse
    //     let resOfBot = quesWithRes.filter(element => {
    //         if (element.query === chatboxQueryUpdate) {
    //             return element.query === chatboxQueryUpdate
    //         } else {
    //             return element.query === 'outofcontext'
    //         }
    //     });
    //     dataForChart = data.data.map(data => {
    //         return dataCheck = {
    //             id: data.id + RandomNumber,
    //             name: data.name,
    //             height: data.height
    //         }

    //     });

    //     if (resOfBot[0].isGeneralQueryType) {
    //         dataToSend = {
    //             id: resOfBot[0].id + RandomNumber,
    //             msgFrom: 'user',
    //             query: chatboxQueryUpdate,
    //             resFromBot: resOfBot[0].res,
    //             isGeneralQueryType: resOfBot[0].isGeneralQueryType
    //         };
    //     } else {
    //         dataToSend = {
    //             id: resOfBot[0].id + RandomNumber,
    //             msgFrom: 'user',
    //             query: chatboxQueryUpdate,
    //             resFromBot: dataForChart,
    //             // resFromBot: data.data,
    //             isGeneralQueryType: resOfBot[0].isGeneralQueryType
    //         };
    //     }
    //     dispatch({ type: CHATBOX_USER_QUERY_ENTERED, payload: dataToSend });
    // }