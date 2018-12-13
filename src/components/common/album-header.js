//Import Libraries to make a component
import React from 'react';
import { Text, View, Image } from 'react-native';

//Make a component
const Header = (props) => {
    const { textStyle, viewStyle, uhcImgStyle } = styles;
return (
    <View style={viewStyle}>
    <Image
        style={uhcImgStyle}
        source={require('./../../assets/uhc_resized2.png')}
    />
    <Text style={textStyle}>{props.headerText}</Text>
    </View>
);
}

const styles = {
    viewStyle : {
        backgroundColor : 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: 70,
        paddingTop: 5,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height : 2},
        shadowOpacity: 0.2
    },
    uhcImgStyle : {
        flex: 1,
        alignSelf: 'flex-start',
        paddingBottom: 60
    },
    textStyle : {
        flex: 2,
        alignSelf: 'center',
        fontSize : 12
    }
}

//Make the component available to other parts of the app
export { Header };