import React, { Component } from 'react';
import { ScrollView, Text, Dimensions, View, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import { Header, CardSection, Card, ChatboxMsgDisplayArea, ChatboxQueryInputArea, Button, Spinner } from './common';
import { chatboxUserQueryUpdate, chatboxQuerySearch } from './../actions/chatboxActions';
//import { GiftedChat } from 'react-native-gifted-chat';

class ChatInterface extends Component {

    componentWillUpdate(){
        LayoutAnimation.easeInEaseOut();
    }
    
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
        const { chatboxSendButtonClicked, chatboxQueryUpdate, isGeneralQueryType, chatboxPreviousMessages, chartDataSearchInProgress } = this.props;
        if (chartDataSearchInProgress) {
            //console.log("2----------------------------------------", this.props.chatboxQueryUpdate.resFromBot);
            return (
                <View>
                    <ChatboxMsgDisplayArea
                        previousMessages={chatboxPreviousMessages}
                        msgBy={chatboxQueryUpdate.msgFrom}
                        msgToDisplay={chatboxQueryUpdate.query}
                        botRes={chatboxQueryUpdate.resFromBot}
                    />
                    <Spinner spinnerSize="large" />
                </View>
            );
        }
        else if (chatboxPreviousMessages.length > 0 && !chartDataSearchInProgress) {
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
    }

    render() {
        const { chatMsgContainerStyle } = styles;
        return (
            <View style={{ flex: 1 }}>
                <Header headerText="Hands Free Analytics"></Header>
                <InvertibleScrollView
                    inverted
                    ref={ref => { this.scrollView = ref; }}
                    onContentSizeChange={() => {
                        this.scrollView.scrollTo({ y: 0, animated: true })
                    }}
                >
                    <CardSection>
                        {this.renderDisplayAreaText()}
                    </CardSection>
                </InvertibleScrollView>
                <View style={{ paddingBottom: 10 }}>
                    <Card>
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
                </View>
            </View>
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
        chartDataSearchInProgress
    } = state.chatboxData;
    //console.log("STATE FOR CHATBOX>.....>>>>>>>>", state);
    return {
        chatboxQueryUpdate,
        chatboxChartSearchSuccess,
        chatboxChartData,
        chatboxSendButtonClicked,
        chatboxEndOfMessageFromUser,
        chatboxPreviousMessages,
        isGeneralQueryType,
        chartDataSearchInProgress
    };
}

const styles = {
    chatMsgContainerStyle: {
        borderColor: '#000000',
        borderWidth: 1,
        broderRadius: 2,
        shadowColor: '#000',
        shadowRadius: 2,
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        elevation: 1
    }
}

export default connect(mapStateToProp, { chatboxUserQueryUpdate, chatboxQuerySearch })(ChatInterface);

{/* <TextInputBar
    placeholder="user@email.com"
    label="Email"
    onChangeText={this.onEmailChange.bind(this)}
    value={this.props.email} /> */}