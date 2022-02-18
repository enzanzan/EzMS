import React, { Component } from 'react';
import { Card } from 'antd';
// import echartTheme from './../echartTheme';  // 导入主题
// import echarts from 'echarts'
import echarts from 'echarts/lib/echarts';  // 按需加载
import 'echarts/lib/chart/line';  // 导入饼图
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';

export default class Line extends Component {

    getOption = () => {
        let option = {
            title: {
                text: '用户骑行订单'
            },
            xAxis: {
                type: 'category',
                data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
            },
            yAxis: {
                type: 'value'
            },
            tooltip: {
                trigger: 'axis'
            },
            series: [
                {
                    name: "订单量",
                    data: [150, 230, 224, 218, 135, 147, 260],
                    type: 'line'
                }
            ]
        }
        return option;
    }

    getOption2 = () => {
        let option = {
            title: {
                text: '用户骑行订单'
            },
            xAxis: {
                type: 'category',
                data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
            },
            yAxis: {
                type: 'value'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ["OFO订单量", "摩拜订单量", "小蓝订单量"]
            },
            series: [
                {
                    name: "OFO订单量",
                    data: [150, 230, 224, 218, 135, 147, 260],
                    type: 'line'
                },
                {
                    name: "摩拜订单量",
                    data: [200, 210, 124, 128, 235, 247, 160],
                    type: 'line'
                },
                {
                    name: "小蓝订单量",
                    data: [250, 330, 324, 318, 435, 247, 360],
                    type: 'line'
                },
            ]
        }
        return option;
    }

    getOption3 = () => {
        let option = {
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [150, 230, 224, 218, 135, 147, 260],
                    type: 'line',
                    areaStyle: {}
                }
            ]
        }
        return option;
    }

    render() {
        return (
            <div>
                <Card title="折线图表一">
                    <ReactEcharts option={this.getOption()} style={{ height: 500 }} />
                </Card>
                <Card title="折线图表二" style={{ marginTop: 10 }}>
                    <ReactEcharts option={this.getOption2()} style={{ height: 500 }} />
                </Card>
                <Card title="折线图表三" style={{ marginTop: 10 }}>
                    <ReactEcharts option={this.getOption3()} style={{ height: 500 }} />
                </Card>
            </div>
        )
    }
}
