import * as React from 'react';
import {
    Platform,
    StyleSheet,
    View,
    WebView,
    ScrollView
} from 'react-native';
import WKWebView from 'react-native-wkwebview-reborn';

export default class Viz1 extends React.Component {
    render() {
        //console.log("vizzzzzzzzzzzzzz",Platform.OS);
        if (Platform.OS === 'android') {
            return (
                <ScrollView style={styles.container}>
                    <WebView
                        //source={{uri: 'https://public.tableau.com/views/10_0InternationalTourism/InternationalTourism?:embed=y&:tooltip=n&:toolbar=n&:showVizHome=no'}}
                        //source={{uri: 'https://public.tableau.com/views/2018APExamScoreDistributionbySubject/APExamScoreDistributionbySubject?:embed=y&:embed_code_version=3&:loadOrderID=0&:display_count=yes'}}
                        source={{uri: 'https://public.tableau.com/views/Meteoritesthroughtime/Time?:embed=y&:embed_code_version=3&:loadOrderID=0&:display_count=yes'}}
                        style={styles.webview}
                    />
                </ScrollView>
            );
        } else {
            return (
                <ScrollView style={styles.container}>
                    <WKWebView
                    //onProgress={(progress) => console.log(progress)}
                        //source={{uri: 'https://public.tableau.com/views/10_0InternationalTourism/InternationalTourism?:embed=y&:tooltip=n&:toolbar=n&:showVizHome=no'}}
                        //source={{uri: 'https://public.tableau.com/views/2018APExamScoreDistributionbySubject/APExamScoreDistributionbySubject?:embed=y&:embed_code_version=3&:loadOrderID=0&:display_count=yes'}}
                        source={{uri: 'https://public.tableau.com/views/Meteoritesthroughtime/Time?:embed=y&:embed_code_version=3&:loadOrderID=0&:display_count=yes'}}
                        style={styles.webview}
                    />
                </ScrollView>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        //paddingTop: 25,
        height: 400,
        width: 400,
        flex: 1
    },
    webview: {
        flex: 1,
        height: 300
    }
});