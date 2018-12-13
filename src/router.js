import React from 'react';
import { Stack, Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import ChatbotHomepage from './components/ChatbotHomepage';
import ChatInterface from './components/ChatInterface';
// import EmployeeList from './components/EmployeeList';
// import CreateEmployee from './components/CreateEmployee';
// import EditEmployee from './components/EditEmployee';

const RouterComponent = () => {
    return (
        <Router>
            {/* <Scene key="root" hideNavBar> */}
            <Scene key="root">
                {/* <Scene key="auth">
                    <Scene key="login" component={LoginForm} title="Please Login" />
                </Scene> */}
                {/* <Scene key="main">
                    <Scene
                    rightTitle="Chat With Us >"
                    onRight={() => Actions.chatInterface()}
                    key="homepage"
                    component={ChatbotHomepage}
                    title="Homepage"
                    initial
                    /> */}
                    <Scene 
                    leftTitle="Back"
                    key="chatInterface"
                    component={ChatInterface}
                    title="Chatbox"
                    initial
                     />
                    {/* <Scene 
                    key="editEmployee"
                    component={EditEmployee}
                    title="Edit/Delete Employee Details" /> */}
                {/* </Scene> */}
            </Scene>
        </Router>
    );
}

export default RouterComponent;