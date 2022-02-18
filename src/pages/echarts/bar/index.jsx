import React, { Component } from 'react';
import { Card } from 'antd';
// import echartTheme from './../echartTheme';  // 导入主题
// import echarts from 'echarts'
import echarts from 'echarts/lib/echarts';  // 按需加载
import 'echarts/lib/chart/bar';  // 导入柱形图
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';

export default class Bar extends Component {

    // componentWillMount() {
    //     echarts.registerTheme("Ezan", echartTheme);
    // }

    getOption = () => {
        let option = {
            title: {
                text: "用户骑行订单"
            },
            tooltip: {
                trigger: "axis"
            },
            xAxis: {
                data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
            },
            yAxis: {
                type: "value"
            },
            series: [
                {
                    name: "订单量",
                    data: [1000, 2000, 1500, 3000, 2000, 1200, 800],
                    type: 'bar'
                }
            ]
        }
        return option;
    }

    getOption2 = () => {
        let option = {
            title: {
                text: "用户骑行订单"
            },
            legend: {
                data: ["OFO", "摩拜", "小蓝"]
            },
            tooltip: {
                trigger: "axis"
            },
            xAxis: {
                data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
            },
            yAxis: {
                type: "value"
            },
            series: [
                {
                    name: "OFO",
                    data: [2000, 3000, 5500, 7000, 8000, 12000, 20000],
                    type: 'bar'
                },
                {
                    name: "摩拜",
                    data: [1500, 3000, 4500, 6000, 8000, 10000, 15000],
                    type: 'bar'
                },
                {
                    name: "小蓝",
                    data: [1000, 2000, 2500, 4000, 6000, 7000, 8000],
                    type: 'bar'
                }
            ]
        }
        return option;
    }

    render() {
        return (
            <div>
                <Card title="柱形图表一">
                    <ReactEcharts option={this.getOption()} theme="Ezan" style={{ height: 500 }} />
                </Card>
                <Card title="柱形图表二" style={{ marginTop: 10 }}>
                    <ReactEcharts option={this.getOption2()} theme="Ezan" style={{ height: 500 }} />
                </Card>
            </div>
        )
    }
}
