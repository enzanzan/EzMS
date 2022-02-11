import React, { Component } from 'react';
import { Card, Table, Modal, Button, message, Badge } from 'antd';
import axios from '../../axios';
import Utils from '../../utils/utils';

export default class HighTable extends Component {
    state = {

    }
    params = {
        page: 1
    }
    componentDidMount() {
        this.request();
    }
    // 动态获取mock数据
    request = () => {
        let _this = this;
        axios.ajax({
            url: "/high.php",
            data: {
                params: {
                    page: this.params.page
                }
            },
        }).then(res => {
            res.result.map((item, index) => item.key = index)
            if (res.code === 0) {
                this.setState({
                    dataSource: res.result,
                })//第二个参数是点击下页时获得的页码
            }
        })
    }
    // 排序
    handleChange = (pagination, filters, sorter) => {
        console.log(sorter);
        this.setState({
            sortOrder: sorter.order
        })
    }
    // 删除操作
    handleDelete = item => {
        let id = item.id;
        Modal.confirm({
            title: "确认",
            content: "您确认要删除此条数据吗？",
            onOk: () => {
                message.success("删除成功！");
                this.request();
            }
        })
    }
    render() {
        const columns = [
            {
                title: 'id',
                key: "id",
                width: 80,
                dataIndex: 'id',
            },
            {
                title: '用户名',
                key: "userName",
                width: 80,
                dataIndex: 'userName',
            },
            {
                title: '性别',
                key: "sex",
                width: 80,
                dataIndex: 'sex',
                render(sex) {
                    return sex === 1 ? "男" : "女"
                }
            },
            {
                title: '状态',
                key: "state",
                width: 80,
                dataIndex: 'state',
                render(state) {
                    let config = {
                        "1": "咸鱼一条",
                        "2": "风华浪子",
                        "3": "北大才子",
                        "4": "百度FE",
                        "5": "创业者",
                    }
                    return config[state];
                }
            },
            {
                title: '爱好',
                key: "interest",
                width: 80,
                dataIndex: 'interest',
                render(interest) {
                    let config = {
                        "1": "篮球",
                        "2": "游泳",
                        "3": "踢足球",
                        "4": "滑雪",
                        "5": "排球",
                        "6": "骑行",
                        "7": "桌球",
                        "8": "唱歌",
                    }
                    return config[interest];
                }
            },
            {
                title: '生日',
                key: "birthday",
                width: 120,
                dataIndex: 'birthday',
            },
            {
                title: '地址',
                key: "address",
                width: 130,
                dataIndex: 'address',
            },
            {
                title: '早起时间',
                key: "time",
                width: 80,
                dataIndex: 'time',
            },
        ];
        const columns2 = [
            {
                title: 'id',
                key: "id",
                width: 80,
                fixed: "left",
                dataIndex: 'id',
            },
            {
                title: '用户名',
                key: "userName",
                width: 80,
                fixed: "left",
                dataIndex: 'userName',
            },
            {
                title: '性别',
                key: "sex",
                width: 80,
                dataIndex: 'sex',
                render(sex) {
                    return sex === 1 ? "男" : "女"
                }
            },
            {
                title: '状态',
                key: "state",
                width: 80,
                dataIndex: 'state',
                render(state) {
                    let config = {
                        "1": "咸鱼一条",
                        "2": "风华浪子",
                        "3": "北大才子",
                        "4": "百度FE",
                        "5": "创业者",
                    }
                    return config[state];
                }
            },
            {
                title: '爱好',
                key: "interest",
                width: 80,
                dataIndex: 'interest',
                render(interest) {
                    let config = {
                        "1": "篮球",
                        "2": "游泳",
                        "3": "踢足球",
                        "4": "滑雪",
                        "5": "排球",
                        "6": "骑行",
                        "7": "桌球",
                        "8": "唱歌",
                    }
                    return config[interest];
                }
            },
            {
                title: '生日',
                key: "birthday",
                width: 120,
                dataIndex: 'birthday',
            },
            {
                title: '生日',
                key: "birthday",
                width: 120,
                dataIndex: 'birthday',
            },
            {
                title: '生日',
                key: "birthday",
                width: 120,
                dataIndex: 'birthday',
            },
            {
                title: '生日',
                key: "birthday",
                width: 120,
                dataIndex: 'birthday',
            },
            {
                title: '生日',
                key: "birthday",
                width: 120,
                dataIndex: 'birthday',
            },
            {
                title: '生日',
                key: "birthday",
                width: 120,
                dataIndex: 'birthday',
            },
            {
                title: '生日',
                key: "birthday",
                width: 120,
                dataIndex: 'birthday',
            },
            {
                title: '生日',
                key: "birthday",
                width: 120,
                dataIndex: 'birthday',
            },
            {
                title: '生日',
                key: "birthday",
                width: 120,
                dataIndex: 'birthday',
            },
            {
                title: '生日',
                key: "birthday",
                width: 120,
                dataIndex: 'birthday',
            },
            {
                title: '地址',
                key: "address",
                width: 130,
                dataIndex: 'address',
            },
            {
                title: '早起时间',
                key: "time",
                width: 80,
                fixed: "right",
                dataIndex: 'time',
            },
        ];
        const columns3 = [
            {
                title: 'id',
                key: "id",
                dataIndex: 'id',
            },
            {
                title: '用户名',
                key: "userName",
                dataIndex: 'userName',
            },
            {
                title: '性别',
                key: "sex",
                dataIndex: 'sex',
                render(sex) {
                    return sex === 1 ? "男" : "女"
                }
            },
            {
                title: '年龄',
                key: "age",
                dataIndex: 'age',
                sorter: (a, b) => {
                    return a.age - b.age;
                },
                sortOrder: this.state.sortOrder
            },
            {
                title: '状态',
                key: "state",
                dataIndex: 'state',
                render(state) {
                    let config = {
                        "1": "咸鱼一条",
                        "2": "风华浪子",
                        "3": "北大才子",
                        "4": "百度FE",
                        "5": "创业者",
                    }
                    return config[state];
                }
            },
            {
                title: '爱好',
                key: "interest",
                dataIndex: 'interest',
                render(interest) {
                    let config = {
                        "1": "篮球",
                        "2": "游泳",
                        "3": "踢足球",
                        "4": "滑雪",
                        "5": "排球",
                        "6": "骑行",
                        "7": "桌球",
                        "8": "唱歌",
                    }
                    return config[interest];
                }
            },
            {
                title: '生日',
                key: "birthday",
                dataIndex: 'birthday',
            },
            {
                title: '地址',
                key: "address",
                dataIndex: 'address',
            },
            {
                title: '早起时间',
                key: "time",
                dataIndex: 'time',
            },
        ];
        const columns4 = [
            {
                title: 'id',
                dataIndex: 'id',
            },
            {
                title: '用户名',
                dataIndex: 'userName',
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render(sex) {
                    return sex === 1 ? "男" : "女"
                }
            },
            {
                title: '年龄',
                dataIndex: 'age',
            },
            {
                title: '状态',
                dataIndex: 'state',
                render(state) {
                    let config = {
                        "1": <Badge status="success" text="成功" />,
                        "2": <Badge status="error" text="报错" />,
                        "3": <Badge status="default" text="正常" />,
                        "4": <Badge status="processing" text="进行中" />,
                        "5": <Badge status="warning" text="警告" />,
                    }
                    return config[state];
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                render(interest) {
                    let config = {
                        "1": "篮球",
                        "2": "游泳",
                        "3": "踢足球",
                        "4": "滑雪",
                        "5": "排球",
                        "6": "骑行",
                        "7": "桌球",
                        "8": "唱歌",
                    }
                    return config[interest];
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday',
            },
            {
                title: '地址',
                dataIndex: 'address',
            },
            {
                title: '操作',
                render: (text, item) => {
                    return <Button size="small" onClick={item => { this.handleDelete(item) }}>删除</Button>
                }
            },
        ];
        return (
            <div>
                <Card title="头部固定">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        scroll={{ y: 240 }}
                    />
                </Card>
                <Card title="左侧固定" style={{ margin: "10px 0" }}>
                    <Table
                        bordered
                        columns={columns2}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        scroll={{ x: 2420 }}
                    />
                </Card>
                <Card title="表格排序" style={{ margin: "10px 0" }}>
                    <Table
                        bordered
                        columns={columns3}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        onChange={this.handleChange}
                    />
                </Card>
                <Card title="操作按钮" style={{ margin: "10px 0" }}>
                    <Table
                        bordered
                        columns={columns4}
                        dataSource={this.state.dataSource}
                        pagination={false}
                    />
                </Card>
            </div>
        )
    }
}
