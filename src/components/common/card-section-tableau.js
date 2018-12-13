import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    WebView,
    WebViewUriSource
} from 'react-native';
import WKWebView from 'react-native-wkwebview-reborn';

export default class CardDetails extends Component {
    render() {
        //console.log(this.props.navigation.state.params.uri)
        //console.log(this.props)
        if (Platform.OS === 'android') {
            return (
                <View style={styles.container}>
                    <WebView
                        //source={{uri: this.props.navigation.state.params.uri}}
                        style={styles.webview}
                    />
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <WKWebView
                        //source={{uri: this.props.navigation.state.params.uri}}
                        style={styles.webview}
                    />
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webview: {
        flex: 1,
    }
});