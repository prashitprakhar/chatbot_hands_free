import React, { Component } from 'react';
import { ScrollView, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Header, CardSection, Card, ChatboxMsgDisplayArea, ChatboxQueryInputArea, Button } from './common';
import { chatboxUserQueryUpdate, chatboxQuerySearch } from './../actions/chatboxActions';
//import { GiftedChat } from 'react-native-gifted-chat';

class ChatInterface extends Component {

    onChatboxQueryUpdate(text) {
        //console.log("((((((((((((((((((((((((())))))))))))))))))))))))) ", text)
        this.props.chatboxUserQueryUpdate(text);
    }

    onChatboxButtonPress() {
        //console.log("On Button Press : ",this.props)
        const { chatboxQueryUpdate } = this.props;
        this.props.chatboxQuerySearch({ chatboxQueryUpdate });
    }

    renderDisplayAreaText() {
        const { chatboxSendButtonClicked, chatboxQueryUpdate, isGeneralQueryType, chatboxPreviousMessages } = this.props;
        //console.log("chatboxQueryUpdate FROM TEXT DISPLAY AREA", this.props.chatboxSendButtonClicked);
        //console.log("chatboxQueryUpdate FROM TEXT DISPLAY AREA", this.props.chatboxQueryUpdate);
        //console.log("Previous messages %%%%%%%%%%%%%%%%%%%%%%%%%%%%: ", chatboxPreviousMessages.length)
        // if (!chatboxSendButtonClicked && isGeneralQueryType && chatboxQueryUpdate.msgFrom === 'user' && chatboxPreviousMessages.length === 0) {
        //     console.log("1--------------------------------------");
        //     return (
        //         <ChatboxMsgDisplayArea
        //             msgBy={chatboxQueryUpdate.msgFrom.toUpperCase()}
        //             msgToDisplay={chatboxQueryUpdate.query}
        //             botRes={chatboxQueryUpdate.resFromBot}
        //         />
        //     )
        // } else 
        if (chatboxPreviousMessages.length > 0 ) {
            //console.log("2-------------------------------")
            return (<ChatboxMsgDisplayArea
                previousMessages={chatboxPreviousMessages}
                msgBy={chatboxQueryUpdate.msgFrom}
                msgToDisplay={chatboxQueryUpdate.query}
                botRes={chatboxQueryUpdate.resFromBot}
            />)
        } else {
            return (
                <ChatboxMsgDisplayArea
                    msgBy="BOT"
                    msgToDisplay="Here to Help !!!"
                    botRes="Actively waiting for your queries"
                />
            )
        }
        // else if(isGeneralQueryType && chatboxQueryUpdate.msgFrom === 'bot') {
        //     return (
        //         <ChatboxMsgDisplayArea 
        //             msgBy={chatboxQueryUpdate.msgFrom}
        //             msgToDisplay={chatboxQueryUpdate.query}
        //         />
        //     )
        // }

    }

    render() {
        //console.log("Window dimension@@@@@@",Dimensions.get('window'))
        return (
            <ScrollView>
                <Card>
                    <Header headerText="Hands Free Analytics"></Header>
                    <CardSection>
                        {this.renderDisplayAreaText()}
                    </CardSection>
                    <CardSection>
                        <ChatboxQueryInputArea
                            placeholderText="Type here"
                            onChangeText={this.onChatboxQueryUpdate.bind(this)}
                            value={this.props.chatboxQueryUpdate.query}
                        />
                    </CardSection>
                    <CardSection>
                        <Button onPressEvent={this.onChatboxButtonPress.bind(this)}>
                            Send
                    </Button>
                    </CardSection>
                </Card>
            </ScrollView>
        )
    }
}

const mapStateToProp = (state) => {
    //console.log("CHATBOX STATESŠchatboxPreviousMessageschatboxPreviousMessages", state)
    const {
        chatboxQueryUpdate,
        chatboxChartSearchSuccess,
        chatboxChartData,
        chatboxSendButtonClicked,
        chatboxEndOfMessageFromUser,
        chatboxPreviousMessages,
        isGeneralQueryType,
    } = state.chatboxData;
    //console.log("STATE FOR CHATBOX>.....>>>>>>>>", state);
    return {
        chatboxQueryUpdate,
        chatboxChartSearchSuccess,
        chatboxChartData,
        chatboxSendButtonClicked,
        chatboxEndOfMessageFromUser,
        chatboxPreviousMessages,
        isGeneralQueryType
    };
}

export default connect(mapStateToProp, { chatboxUserQueryUpdate, chatboxQuerySearch })(ChatInterface);

{/* <TextInputBar
    placeholder="user@email.com"
    label="Email"
    onChangeText={this.onEmailChange.bind(this)}
    value={this.props.email} /> */}