import React, { Component } from 'react';
import { Card } from 'antd';
// import echartTheme from './../echartTheme';  // 导入主题
// import echarts from 'echarts'
import echarts from 'echarts/lib/echarts';  // 按需加载
import 'echarts/lib/chart/pie';  // 导入饼图
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';

export default class Bar extends Component {

    getOption = () => {
        let option = {
            title: {
                text: '用户骑行订单',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a}<br/>{b}: {c}({d}%)'
            },
            legend: {
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    data: [
                        { value: 1048, name: '周一' },
                        { value: 735, name: '周二' },
                        { value: 580, name: '周三' },
                        { value: 484, name: '周四' },
                        { value: 300, name: '周五' },
                        { value: 800, name: '周六' },
                        { value: 1000, name: '周日' },
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
        return option;
    }

    getOption2 = () => {
        let option = {
            title: {
                text: '用户骑行订单',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a}<br/>{b}: {c}({d}%)'
            },
            legend: {
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    radius: ["50%", "80%"],
                    data: [
                        { value: 1048, name: '周一' },
                        { value: 735, name: '周二' },
                        { value: 580, name: '周三' },
                        { value: 484, name: '周四' },
                        { value: 300, name: '周五' },
                        { value: 800, name: '周六' },
                        { value: 1000, name: '周日' },
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
        return option;
    }

    getOption3 = () => {
        let option = {
            title: {
                text: '用户骑行订单',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a}<br/>{b}: {c}({d}%)'
            },
            legend: {
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    data: [
                        { value: 1048, name: '周一' },
                        { value: 735, name: '周二' },
                        { value: 580, name: '周三' },
                        { value: 484, name: '周四' },
                        { value: 300, name: '周五' },
                        { value: 800, name: '周六' },
                        { value: 1000, name: '周日' },
                    ].sort((a, b) => {
                        return a.value - b.value;
                    }),
                    roseType: "radius",
                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
                }
            ]
        }
        return option;
    }

    render() {
        return (
            <div>
                <Card title="柱形图表一">
                    <ReactEcharts option={this.getOption()} style={{ height: 500 }} />
                </Card>
                <Card title="柱形图表二" style={{ marginTop: 10 }}>
                    <ReactEcharts option={this.getOption2()} style={{ height: 500 }} />
                </Card>
                <Card title="饼图" style={{ marginTop: 10 }}>
                    <ReactEcharts option={this.getOption3()} style={{ height: 500 }} />
                </Card>
            </div>
        )
    }
}
