import {
    CHATBOX_USER_QUERY_ENTERED,
    CHATBOX_CHART_SEARCH_SUCCESS,
    CHATBOX_QUERY_ENTER_IN_PROGRESS,
    CHATBOX_CHART_DATA_FETCH_PROGRESS,
    CHATBOX_USER_MESSAGE
} from './../actions/types';

const INITIAL_STATE = {
    chatboxQueryUpdate : '',
    displayMsgFromUser : '',
    chatboxChartSearchSuccess : false,
    chatboxChartData : '',
    chatboxSendButtonClicked: false,
    chatboxEndOfMessageFromUser: false,
    chatboxPreviousMessages : [],
    isGeneralQueryType: true,
    chartDataSearchInProgress: false
}

export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case CHATBOX_USER_QUERY_ENTERED : {
            //console.log("ChatBot Response : ",action.payload);
                return { ...state,
                    chatboxQueryUpdate : action.payload,
                    displayMsgFromUser : action.payload.displayMsgFromUser,
                    chatboxSendButtonClicked: true,
                    chatboxEndOfMessageFromUser: true,
                    chatboxPreviousMessages: [ ...state.chatboxPreviousMessages, action.payload],
                    isGeneralQueryType: action.payload.isGeneralQueryType,
                    chartDataSearchInProgress: false
                };
        }
        case CHATBOX_CHART_DATA_FETCH_PROGRESS : {
            //console.log("CHART_DATA_FETCH_PROGRESS@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Data Reducer",action.payload)
            return { ...state,
                chatboxQueryUpdate : action.payload,
                displayMsgFromUser : action.payload.displayMsgFromUser,
                chatboxSendButtonClicked: true,
                chatboxEndOfMessageFromUser: true,
                isGeneralQueryType: false,
                chartDataSearchInProgress: true
            };
        }
        case CHATBOX_QUERY_ENTER_IN_PROGRESS : {
            if(state.chatboxPreviousMessages.length>0){
                return { ...state,
                    chatboxQueryUpdate : action.payload,
                    displayMsgFromUser : action.payload.displayMsgFromUser,
                    chatboxSendButtonClicked: true,
                    chatboxEndOfMessageFromUser: true,
                    isGeneralQueryType: action.payload.isGeneralQueryType,
                    chartDataSearchInProgress: false
                };
            } else {
                return { ...state, chatboxQueryUpdate : action.payload, displayMsgFromUser : action.payload.displayMsgFromUser,chatboxEndOfMessageFromUser: false, chatboxSendButtonClicked: false, chartDataSearchInProgress: false}
            }
        }
        case CHATBOX_USER_MESSAGE : {
            console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$",action.payload);
            return { ...state,
                chatboxQueryUpdate: '',
                displayMsgFromUser: action.payload,
                chatboxSendButtonClicked: true,
                chatboxEndOfMessageFromUser: true,
                isGeneralQueryType: false,
                chartDataSearchInProgress: true
            }
        }
        default : 
            return state;
    }
}