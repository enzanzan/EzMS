import React, { Component } from 'react';
import { Card, Table, Modal, Button, message } from 'antd';
import axios from './../../axios';
import Utils from './../../utils/utils';


export default class BasicTable extends Component {
    state = {
        dataSource2: []
    }

    params = {
        page: 1
    }
    componentDidMount() {
        const data = [
            {
                id: "0",
                userName: "tom",
                sex: "男",
                state: "1",
                interest: "滑雪",
                birthday: "2022-02-10",
                address: "秦皇岛市海港区恩赞集团",
                time: "09:00"
            },
            {
                id: "1",
                userName: "jarry",
                sex: "男",
                state: "2",
                interest: "篮球",
                birthday: "2022-02-10",
                address: "秦皇岛市海港区恩赞集团",
                time: "09:00"
            },
            {
                id: "2",
                userName: "susan",
                sex: "男",
                state: "3",
                interest: "足球",
                birthday: "2022-02-10",
                address: "秦皇岛市海港区恩赞集团",
                time: "09:00"
            }
        ]
        data.map((item, index) => {
            item.key = index;
        })
        this.setState({
            dataSource: data
        })
        // 初始化调用request
        this.request();
    }

    // 动态获取mock数据
    request = () => {
        // let baseUrl = "https://mock.apipost.cn/app/mock/project/86680e29-7a22-4999-832a-a2ee3b9d9571/"
        // axios.get(baseUrl + "table.php")
        //     .then(res => {
        //         if (res.status === 200 && res.data.code === 0) {
        //             this.setState({
        //                 dataSource2: res.data.result
        //             })
        //         }
        //     })
        let _this = this;
        axios.ajax({
            url: "/table.php",
            data: {
                params: {
                    page: this.params.page
                }
            },
        }).then(res => {
            res.result.map((item, index) => item.key = index)
            if (res.code === 0) {
                this.setState({
                    dataSource2: res.result,
                    selectedRowKeys: [],
                    selectedRows: null,
                    pagination: Utils.pagination(res, current => {
                        console.log(current)
                        _this.params.page = current;
                        // console.log(_this)
                        this.request();
                        // console.log(this)
                    })//第二个参数是点击下页时获得的页码
                })
            }
        })
    }

    // 点击行
    onRowClick = (record, index) => {
        let selectKey = [index];
        Modal.info({
            title: "信息",
            content: `用户名：${record.userName}，用户爱好：${record.interest}`
        })
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
    }

    // 多选执行删除动作
    handleDelete = () => {
        let rows = this.state.selectedRows;
        let ids = [];
        rows.map(item =>
            ids.push(item.id)
        )
        Modal.confirm({
            title: "删除提示",
            content: `你确定要删除这些数据吗？${ids.join(',')}`,
            onOk: () => {
                message.success('删除成功');
                this.request();
            }
        })
    }

    render() {
        const columns = [
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
                title: '状态',
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
                title: '早起时间',
                dataIndex: 'time',
            },
        ];
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            type: "radio",
            selectedRowKeys
        }
        const rowCheckSelection = {
            type: "checkbox",
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys,
                    selectedRows
                })
            }
        }
        return (
            <div>
                <Card title="基础表格">
                    <Table
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                    />
                </Card>
                <Card title="动态数据渲染表格-Mock" style={{ margin: "10px 0" }}>
                    <Table
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
                <Card title="Mock-单选" style={{ margin: "10px 0" }}>
                    <Table
                        bordered
                        rowSelection={rowSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index)
                                }, // 点击行
                            };
                        }}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
                <Card title="Mock-复选" style={{ margin: "10px 0" }}>
                    <div>
                        <Button onClick={this.handleDelete} style={{ marginBottom: 10 }}>删除</Button>
                    </div>
                    <Table
                        bordered
                        rowSelection={rowCheckSelection}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
                <Card title="Mock-分页" style={{ margin: "10px 0" }}>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={this.state.pagination}
                    />
                </Card>
            </div >
        )
    }
}
