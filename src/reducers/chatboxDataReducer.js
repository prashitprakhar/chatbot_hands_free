import {
    CHATBOX_USER_QUERY_ENTERED,
    CHATBOX_CHART_SEARCH_SUCCESS,
    CHATBOX_QUERY_ENTER_IN_PROGRESS
} from './../actions/types';

const INITIAL_STATE = {
    chatboxQueryUpdate : '',
    chatboxChartSearchSuccess : false,
    chatboxChartData : '',
    chatboxSendButtonClicked: false,
    chatboxEndOfMessageFromUser: false,
    chatboxPreviousMessages : [],
    isGeneralQueryType: true
}

export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case CHATBOX_USER_QUERY_ENTERED : {
            //console.log("ChatBot Response : ",chatboxPreviousMessages);
            
                return { ...state,
                    chatboxQueryUpdate : action.payload,
                    chatboxSendButtonClicked: true,
                    chatboxEndOfMessageFromUser: true,
                    chatboxPreviousMessages: [ ...state.chatboxPreviousMessages, action.payload],
                    isGeneralQueryType: action.payload.isGeneralQueryType,
                };
            
            
        }
        case CHATBOX_CHART_SEARCH_SUCCESS : {
            //console.log("ACTION CHATBOX SEARCH @@@@@@@@@@@@@@@@@@@@@@@@@@",action.payload);
            // return { ...state,
            //     chatboxChartSearchSuccess: true,
            //     chatboxChartData: action.payload,
            //     chatboxEndOfMessageFromUser: true,
            //     chatboxSendButtonClicked: true,
            //     chatboxPreviousMessages : chatboxPreviousMessages.push()
            // };
        }
        case CHATBOX_QUERY_ENTER_IN_PROGRESS : {
            //console.log("PREVIOUS MESSAGE STATUS :::::::::::::: ",state.chatboxPreviousMessages.length)
            if(state.chatboxPreviousMessages.length>0){
                return { ...state,
                    chatboxQueryUpdate : action.payload,
                    chatboxSendButtonClicked: true,
                    chatboxEndOfMessageFromUser: true,
                    isGeneralQueryType: action.payload.isGeneralQueryType,
                };
            } else {
                return { ...state, chatboxQueryUpdate : action.payload, chatboxEndOfMessageFromUser: false, chatboxSendButtonClicked: false}
            }
        }
        default : 
            return state;
    }
}