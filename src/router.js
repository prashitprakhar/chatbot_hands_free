import React from 'react';
import { Stack, Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import ChatbotHomepage from './components/ChatbotHomepage';
import ChatInterface from './components/ChatInterface';

const RouterComponent = () => {
    return (
        <Router>
            <Scene key="root" hideNavBar>
                <Scene key="auth">
                    <Scene key="login" component={LoginForm} title="Please Login" />
                </Scene>
                <Scene key="main">
                    <Scene
                    rightTitle="Chat With Us >"
                    onRight={() => Actions.chatInterface()}
                    key="homepage"
                    component={ChatbotHomepage}
                    title="Homepage"
                    initial
                    />
                    <Scene 
                    leftTitle="Back"
                    key="chatInterface"
                    component={ChatInterface}
                    title="Chatbox"
                     />
                </Scene>
            </Scene>
        </Router>
    );
}

export default RouterComponent;