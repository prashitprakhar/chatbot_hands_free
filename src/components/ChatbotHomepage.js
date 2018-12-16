import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Header, TextInputBar, SearchBar, Card, CardSection, Button, Spinner } from './common';
import { queryUpdated, searchChart } from './../actions';
import Bar from './charts/barchart';
import Viz1 from './tableauCharts/viz1';
import { Actions } from 'react-native-router-flux';
import CardDetails from './common/card-section-tableau';

class ChatbotHomepage extends Component {

    onQueryEnter(text) {
        this.props.queryUpdated(text);
    }

    onSearchButtonPress() {
        const { updatedQuery } = this.props;
        this.props.searchChart({ updatedQuery });
    }

    renderChart() {
        if (this.props.searchProgress) {
            return (
                <Spinner spinnerSize="large" />
            )
        } else if (this.props.chartSearchSuccess) {
            return (
                <Bar barChartData={this.props.chartData} />
            );
        } else if (!this.props.chartSearchSuccess && this.props.chartNotFound) {
            return (
                <Text>
                    Currently we don't have support for this chart. We are working on it.
            </Text>
            );
        } else if (this.props.tableauChartSearchSuccess) {
            return (
                <Viz1 />
            )
        } else {
            return (
                <Text>
                    Please search your favorite chart...
                </Text>
            )
        }
    }

    render() {
        return (
            <View>
                <Header headerText="Hands Free Analytics"></Header>
                <Card>
                    <CardSection>
                        <SearchBar
                            placeholder="Search your chart"
                            onChangeText={this.onQueryEnter.bind(this)}
                            value={this.props.updatedQuery}
                        />
                    </CardSection>
                    <CardSection>
                        <Button onPressEvent={this.onSearchButtonPress.bind(this)}>
                            Search
                        </Button>
                    </CardSection>
                    <CardSection>
                        {this.renderChart()}
                    </CardSection>
                </Card>
            </View>
        );
    }
}

const mapStateToProps = state => {
    const { updatedQuery,
        chartData,
        chartSearchSuccess,
        error,
        searchProgress,
        chartNotFound,
        tableauChartSearchSuccess } = state.chartData;
    return {
        updatedQuery,
        chartData,
        chartSearchSuccess,
        error,
        searchProgress,
        chartNotFound,
        tableauChartSearchSuccess
    };
}

export default connect(mapStateToProps, { queryUpdated, searchChart })(ChatbotHomepage);