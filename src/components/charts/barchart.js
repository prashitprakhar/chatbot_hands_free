import React, { Component } from 'react';
import { StyleSheet, View, ART, Dimensions, TouchableWithoutFeedback } from 'react-native';

const {
    Surface,
    Group,
    Shape,
    Text,
    Path,
    Transform
} = ART;

import {
    max,
    ticks
} from 'd3-array'

import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import * as format from 'd3-format';
import * as axis from 'd3-axis';
import * as path from 'd3-path';
//import Colors from '../../color.js';
const d3 = {
    scale,
    shape,
    format,
    axis,
    path,
};

import {
    scaleLinear,
    scaleBand,
    scaleTime
}  from 'd3-scale';

const colours = {
    black: 'black',
    blue: 'steelblue',
    brown: 'brown'
}

const data = [
    {frequency: 5, letter: 'a'},
    {frequency: 6, letter: 'b'},
    {frequency: 4, letter: 'c'},
    {frequency: 1, letter: 'd'},
    {frequency: 2, letter: 'e'},
    {frequency: 3, letter: 'f'}
];

class Bar extends Component {

    constructor(props) {
        super(props);
        this.createBarChart = this.createBarChart.bind(this);
        this.drawLine = this.drawLine.bind(this);            
        //this.getRandomColor = this.getRandomColor.bind(this);
    };

    getRandomColor() {
        return 'blue';
        //return '#' + Math.random().toString(16).substr(-6);
    }               

    drawLine(startPoint, endPoint) {
        var path = d3.path.path();
        path.lineTo(startPoint, endPoint);
        return path;
    }

    createBarChart(x, y, w, h) {
        var path = d3.path.path();
        path.rect(x, y, w, h);
        return path;
    }

    render() {
        //console.log("BAR CHART DATA DYNAMIC ####################",this.props.barChartData);
        const { barChartData } = this.props;
        const screen = Dimensions.get('window');
        const margin = {top: 50, right: 25, bottom: 200, left: 25}
        const width = screen.width - margin.left - margin.right
        //const height = screen.height - margin.top - margin.bottom
        const height = 200;

        const x = d3.scale.scaleBand()
            .rangeRound([0, width])
            .paddingInner(0.3)
            .paddingOuter(0.5)
            .domain(barChartData.map(d => d.name))

        const maxFrequency = max(barChartData, d => d.height)

        const y = d3.scale.scaleLinear()
            .rangeRound([height, 0])
            .domain([0, maxFrequency+.3*maxFrequency])

        const firstLetterX = x(barChartData[0].name)
        const secondLetterX = x(barChartData[1].name)
        const lastLetterX = x(barChartData[barChartData.length - 1].name)
        const labelDx = (secondLetterX - firstLetterX) / 2

        const bottomAxis = [firstLetterX - labelDx, lastLetterX + labelDx]

        const bottomAxisD = d3.shape.line()
                                .x(d => d + labelDx)
                                .y(() => 0)
                                (bottomAxis)

        const leftAxis = ticks(0, maxFrequency, 5)

        const leftAxisD = d3.shape.line()
                            .x(() => bottomAxis[0] + labelDx)
                            .y(d => y(d) - height)
                            (leftAxis)
        const notch = 5;
        const labelDistance = 9;
        const emptySpace = "";
        return(
            <View>
            <Surface width={screen.width} height={screen.height}>
                <Group x={margin.left} y={margin.top}>
                    <Group x={0} y={height}>
                        <Group key={-1}>
                            <Shape d={bottomAxisD} stroke={colours.black} key="-1"/>
                              {
                                    barChartData.map((d, i) =>(
                                    <Group
                                        x={x(d.name) + labelDx}
                                        y={0}
                                        key={i + 1}
                                    >
                                        <Shape d={this.drawLine(0, notch)} y2={notch} stroke={colours.black}/>
                                        <Text
                                          y={labelDistance}
                                          RotateXTransform={'40%'}
                                          fill={colours.black}
                                          font="18px helvetica"
                                        >
                                          {d.name}
                                        </Text>
                                    </Group>
                                ))
                              }
                        </Group>
                        <Group key={-2} >
                            <Shape stroke={colours.black} d={leftAxisD} key="-1"/>
                            {
                                leftAxis.map((d, i) => (
                                    <Group x={0} y={y(d)-height} key={i + 1}>
                                        <Shape d={this.drawLine(notch, 0)} stroke={colours.black}/>
                                        <Text
                                            fill={colours.black}
                                            x={-15}
                                            y={-labelDistance}
                                            font="18px helvetica"
                                        >
                                            {d + emptySpace}
                                        </Text>
                                    </Group>
                                ))
                            }
                        </Group>
                        {
                            barChartData.map((d, i) => (
                                <TouchableWithoutFeedback key={i} >
                                    <Shape
                                        d={this.createBarChart(x(d.name), y(d.height) - height, x.bandwidth(), height - y(d.height))}
                                        fill={this.getRandomColor()}
                                        >
                                    </Shape>
                                </TouchableWithoutFeedback>
                            ))

                            // data.map((d, i) => (
                            //     <TouchableWithoutFeedback key={i} >
                            //         <Shape
                            //             d={this.createBarChart(x(d.letter), y(d.frequency) - height, x.bandwidth(), height - y(d.frequency))}
                            //             fill={this.getRandomColor()}
                            //             >
                            //         </Shape>
                            //     </TouchableWithoutFeedback>
                            // ))
                        }
                    </Group>
                </Group>
            </Surface>
            </View>
        )
    }
}

const styles = {
  container: {
    margin: 20,
  },
  label: {
    fontSize: 15,
    marginTop: 5,
    fontWeight: 'normal',
  }
};


export default Bar;