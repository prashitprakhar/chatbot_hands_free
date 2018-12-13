import React from 'react';
import { View, Text, TextInput, Dimensions, FlatList, ScrollView, SectionList } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

const ChatboxMsgDisplayArea = ({ msgBy, msgToDisplay, botRes, previousMessages }) => {
    const { chatDisplayStyle, containerStyle } = styles;
    //console.log("Previous Messages from DISPLAYAREA ----------", previousMessages);
    // if(previousMessages && previousMessages){

    // }
    // else {

    // }
    return (
    <FlatList 
    data= {previousMessages}
    renderItem = {this.renderItem}
    keyExtractor = {previousMessages => {previousMessages.resFromBot.id} }
    />
    )
}

renderItem = (previousMessages) => {
    const { chatDisplayStyle, containerStyle } = styles;
    let RandomNumber = Math.floor(Math.random() * 100019) + 1;
    //console.log("Hello RENDERITEM@@@", previousMessages);
    if(!previousMessages.item.isGeneralQueryType){
        let items = previousMessages.item.resFromBot;
        //console.log("ITEMS.ID $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$",items)
        dataForChart = items.map(data => {
            return dataCheck = {
                id: data.id + RandomNumber,
                name: data.name,
                height: data.height
            }

        });
        //console.log("Hello RENDERITEM@@@ IFIFIIFIFIIFIFIFIIFIFIFIFIFIFIFIFI", dataForChart);
        return (
        <View>
            <Text style={chatDisplayStyle}>{previousMessages.item.msgFrom} : {previousMessages.item.query}</Text>
            <Text style={chatDisplayStyle}>BOT : Showing the chart Data...</Text>
            <Text style={{ flex: 1, alignSelf: 'stretch' }}>______________________________________</Text>
            <View style={{ flex: 1, flexDirection: "row", alignSelf: "stretch" }}>
            
	        <Text style={{ flex: 1, alignSelf: 'stretch' }} >Name</Text>
            <Text style={{ flex: 1, alignSelf: 'stretch' }} >|  Height</Text>
            
	{/* <View style={{ flex: 1, alignSelf: 'stretch' }} />
	<View style={{ flex: 1, alignSelf: 'stretch' }} /> */}
</View>
<Text style={{ flex: 1, alignSelf: 'stretch' }}>______________________________________</Text>
            {/* <FlatList
            data={items}
            renderItem={this.renderItemForChart}
            keyExtractor = {items => items.id }
            /> */}
            <FlatList
            data={dataForChart}
            renderItem={this.renderItemForChart}
            keyExtractor = {dataForChart => dataForChart.id }
            />
            <Text style={{ flex: 1, alignSelf: 'stretch' }}>______________________________________</Text>
        </View>
        
        )
        // return this.renderItemForChart(previousMessages.item.resFromBot)
    } else {
        return (
            <ScrollView>
                <Text style={chatDisplayStyle}>{previousMessages.item.msgFrom} : {previousMessages.item.query}</Text>
                <Text style={chatDisplayStyle}>BOT : {previousMessages.item.resFromBot}</Text>
            </ScrollView>
        )
    }
}

renderItemForChart = (previousMessages) => {
    const { chatDisplayStyle, containerStyle, tableStyle } = styles;
    console.log("SPECIAL MESSAGESS@@@@@@@@@@@@@@@",previousMessages)
    return (

<View style={{ flex: 1, flexDirection: "row", alignSelf: "stretch" }}>
	<Text style={{ flex: 1, alignSelf: 'stretch' }} >|  {previousMessages.item.name}</Text>
    <Text style={{ flex: 1, alignSelf: 'stretch' }} >|  {previousMessages.item.height}</Text>
	{/* <View style={{ flex: 1, alignSelf: 'stretch' }} />
	<View style={{ flex: 1, alignSelf: 'stretch' }} /> */}
</View>
    )
}

const styles = {
    chatDisplayStyle: {
        //display: 'flex',
        alignSelf: 'flex-start',
        color: '#000000',
        fontSize: 18,
        paddingLeft: 5,
        //height: 100,
        //paddingTop: -100,
        flex: 1,
        //flexDirection: 'column-reverse'
    },
    textInputStyle: {
        flex: 2,
        alignSelf: 'stretch',
        color: '#000',
        paddingLeft: 5,
        paddingRight: 5,
        fontSize: 16
    },
    containerStyle: {
        height: 200,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    tableStyle : {
        container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
    }
}
//Dimensions.get('window').height - 70
export { ChatboxMsgDisplayArea };
