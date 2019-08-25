import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Header } from './components/common';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import RouterComponent from './router';
import reducers from './reducers';

class App extends Component {
    componentWillMount() {
        // Initialize Firebase
        const firebase = require('firebase');
        var config = {
            apiKey: "AIzaSyAMl521PZdo3sqvEKsCikesio6pmODLaD8",
            authDomain: "chatbot-hands-free.firebaseapp.com",
            databaseURL: "https://chatbot-hands-free.firebaseio.com",
            projectId: "chatbot-hands-free",
            storageBucket: "chatbot-hands-free.appspot.com",
            messagingSenderId: "869377651725"
        };
        firebase.initializeApp(config);
    }
    render() {
        console.disableYellowBox = true;
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))
        return (
            <Provider store={store}>
                <RouterComponent />
            </Provider>
        );

        // return (
        //     <View>
        //         <Header headerText="Hands Free Analytics" />
        //         <Text>
        //             Chat Bot on the roll...
        //         </Text>
        //     </View>
        // );
    }
}

export default App;
