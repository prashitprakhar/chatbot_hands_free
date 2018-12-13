import React from 'react';
import { View, Text, TextInput, Dimensions } from 'react-native';

//const ChatboxMsgDisplayArea = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
const ChatboxQueryInputArea = ({placeholderText, value, onChangeText, msgBy}) => {
    const { buttonDisplayStyle, textInputStyle, containerStyle } = styles;
    //console.log("placeholder : ",placeholderText);
    return (
        <View style={containerStyle}>
            <TextInput
                placeholder={placeholderText}
                value={value}
                onChangeText={onChangeText}
                style={textInputStyle}
            />
        </View>
    )
}
// secureTextEntry={secureTextEntry}
//                 placeholder={placeholder}
//                 autoCorrect={false}
//                 value={value}
//                 onChangeText={onChangeText}
//                 style={textInputStyle}

const styles = {
    buttonDisplayStyle: {
        //display: 'flex',
        alignSelf: 'center',
        color: '#000000',
        fontSize: 18,
        paddingLeft: 5,
        //paddingRight: 5,
        flex: 1
        //flexDirection: 'column-reverse'
    },
    textInputStyle: {
        flex: 1,
        alignSelf: 'stretch',
        color: '#000',
        paddingLeft: 5,
        paddingRight: 5,
        fontSize: 16
    },
    containerStyle: {
        height: 70,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
}

export { ChatboxQueryInputArea };
