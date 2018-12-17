import React from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

const ChatboxMsgDisplayArea = ({ msgBy, msgToDisplay, botRes, previousMessages }) => {
    //const { chatDisplayStyle, containerStyle, chatMsgContainerStyle } = styles;
    console.log("################################################PREVIOUS MESSAGE FROM DISPLAY_AREA",previousMessages);
    let RandomNumberForUserMSG = Math.floor(Math.random() * 100027) + 7;
    return (
        <FlatList
            data={msgToDisplay || previousMessages}
            renderItem={this.renderItem}
            keyExtractor={previousMessages => { (previousMessages.resFromBot && previousMessages.resFromBot.id) || RandomNumberForUserMSG }}
        />
    )
}

renderItem = (previousMessages) => {
    console.log("HERE ******************************",previousMessages)
    const { chatDisplayStyle, chatMsgContainerStyle, tableStyle } = styles;
    let RandomNumber = Math.floor(Math.random() * 100019) + 1;
    if (!previousMessages.item.isGeneralQueryType) {
        let items = previousMessages.item.resFromBot;
        dataForChart = items.map(data => {
            return dataCheck = {
                id: data.id + RandomNumber,
                name: data.name,
                height: data.height
            }
        });
        let tableDataNameCreation = [];
        previousMessages.item.resFromBot.forEach(element => {
            tableDataNameCreation.push([ element.name, element.height]);
        });
        const tableHead = ['Tower Name', 'Height'];
        const tableData = tableDataNameCreation;
    
        return (
            <View style={chatMsgContainerStyle}>
            <Text style={chatDisplayStyle}>{previousMessages.item.msgFrom} : {previousMessages.item.displayMsgFromUser}</Text>
            <Text style={chatDisplayStyle}>BOT : Your chart data is as below...</Text>
            <View style={tableStyle.container}>
              <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                <Row data={tableHead} style={tableStyle.head} textStyle={tableStyle.text}/>
                <Rows data={tableData} textStyle={tableStyle.text}/>
              </Table>
            </View>
            </View>
          );
    } else {
        return (
            <ScrollView style={chatMsgContainerStyle}>
                <Text style={chatDisplayStyle}>{previousMessages.item.msgFrom} : {previousMessages.item.displayMsgFromUser}</Text>
                <Text style={chatDisplayStyle}>BOT : {previousMessages.item.resFromBot}</Text>
            </ScrollView>
        );
    }
}

renderUserMessage = (previousMessages) => {
    const { chatDisplayStyle } = styles;
    console.log("renderUserMessage --------- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",previousMessages)
    return (
        <Text style={chatDisplayStyle}>{previousMessages.item.msgFrom} : {previousMessages.item.displayMsgFromUser}</Text>
    );
}

//Not used code now after Table implementation
renderItemForChart = (previousMessages) => {
    //const { chatDisplayStyle, containerStyle, tableStyle } = styles;
    return (
        <View style={{ flex: 1, flexDirection: "row", alignSelf: "stretch" }}>
            <Text style={{ flex: 1, alignSelf: 'stretch' }} >|  {previousMessages.item.name}</Text>
            <Text style={{ flex: 1, alignSelf: 'stretch' }} >|  {previousMessages.item.height}</Text>
        </View>
    )
}
       //Working code
        // return (
        //     <View style={chatMsgContainerStyle}>
        //         <Text style={chatDisplayStyle}>{previousMessages.item.msgFrom} : {previousMessages.item.displayMsgFromUser}</Text>
        //         <Text style={chatDisplayStyle}>BOT : Showing the chart Data...</Text>
        //         <Text style={{ flex: 1, alignSelf: 'stretch' }}>______________________________________</Text>
        //         <View style={{ flex: 1, flexDirection: "row", alignSelf: "stretch" }}>

        //             <Text style={{ flex: 1, alignSelf: 'stretch' }} >Name</Text>
        //             <Text style={{ flex: 1, alignSelf: 'stretch' }} >|  Height</Text>
        //         </View>
        //         <Text style={{ flex: 1, alignSelf: 'stretch' }}>______________________________________</Text>
        //         <FlatList
        //             data={dataForChart}
        //             renderItem={this.renderItemForChart}
        //             keyExtractor={dataForChart => dataForChart.id}
        //         />
        //         <Text style={{ flex: 1, alignSelf: 'stretch' }}>______________________________________</Text>
        //     </View>
        // )


const styles = {
    chatDisplayStyle: {
        alignSelf: 'flex-start',
        color: '#000000',
        fontSize: 18,
        paddingLeft: 5,
        flex: 1
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
    tableStyle: {
        container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
        head: { height: 40, backgroundColor: '#f1f8ff' },
        text: { margin: 6 }
    },
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

export { ChatboxMsgDisplayArea };