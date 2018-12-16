import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
    return (
        <View style={[ styles.cardSectionContainerStyle, props.style ]}>
        {props.children}
        </View>
    )
}

const styles = {
    cardSectionContainerStyle : {
        borderBottomWidth : 1,
        padding : 5,
        backgroundColor : '#F7F7F7',
        justifyContent : 'flex-start',
        flexDirection : 'row',
        borderColor : '#ddd',
        position : 'relative'
    }
}

export { CardSection };