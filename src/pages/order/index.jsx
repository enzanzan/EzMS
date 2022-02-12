import React, { Component } from 'react';
import { Card, Button, Table, Form, Select, Modal, message, DatePicker } from 'antd';
import axios from './../../axios';
import moment from 'moment';
import Utils from '../../utils/utils';

const FormItem = Form.Item;
export default class Order extends Component {
    state = {
        orderInfo: {},
        orderConfirmVisible: false
    }
    params = {
        page: 1
    }
    componentDidMount() {
        this.requestList();
    }
    requestList = () => {
        let _this = this;
        axios.ajax({
            url: "/order.php",
            data: {
                page: this.params.page
            }
        }).then(res => {
            this.setState({
                list: res.result.map((item, index) => {
                    item.key = index;
                    return item;
                }),
                pagination: Utils.pagination(res, current => {
                    _this.params.page = current;
                    _this.requestList();
                })
            })
        })
    }

    // 结束订单确认
    handleConfirm = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: "信息",
                content: "请选择一条订单进行结束"
            })
            return;
        }
        axios.ajax({
            url: "/ebike.php",
            data: {
                params: {
                    orderId: item.id
                }
            }
        }).then(res => {
            if (res.code === 0) {
                console.log(res);
                this.setState({
                    orderInfo: res.result,
                    orderConfirmVisible: true
                })
            }
        })
    }

    // 结束订单
    handleFinishOrder = () => {
        let item = this.state.selectedItem;
        axios.ajax({
            url: "/finish.php",
            data: {
                params: {
                    orderId: item.id
                }
            }
        }).then(res => {
            if (res.code === 0) {
                message.success("订单结束成功！")
                this.setState({
                    orderConfirmVisible: false
                })
                this.requestList();
            }
        })
    }

    // 点击行
    onRowClick = (record, index) => {
        let selectKey = [index];
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
    }

    render() {
        const columns = [
            {
                title: "订单编号",
                dataIndex: "order_sn"
            },
            {
                title: "车辆编号",
                dataIndex: "bike_sn"
            },
            {
                title: "用户名",
                dataIndex: "user_name"
            },
            {
                title: "手机号",
                dataIndex: "mobile"
            },
            {
                title: "里程",
                dataIndex: "distance",
                render(distance) {
                    return distance / 1000 + "Km";
                }
            },
            {
                title: "行驶时长",
                dataIndex: "total_time"
            },
            {
                title: "状态",
                dataIndex: "status"
            },
            {
                title: "开始时间",
                dataIndex: "start_time"
            },
            {
                title: "结束时间",
                dataIndex: "end_time"
            },
            {
                title: "订单金额",
                dataIndex: "total_fee"
            },
            {
                title: "实付金额",
                dataIndex: "user_pay"
            },
        ]
        const formItemLayout = {
            labelCol: { span: 5 },
            wrpperCol: { span: 19 }
        }
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            type: "radio",
            selectedRowKeys
        }
        return (
            <div>
                <Card>
                    <Form layout="inline" ref="myForm5">
                        <FormItem label="城市" >
                            <Select placeholder="全部" style={{ width: 80 }}>
                                <Select.Option value="">全部</Select.Option>
                                <Select.Option value="1">北京市</Select.Option>
                                <Select.Option value="2">天津市</Select.Option>
                                <Select.Option value="3">深圳市</Select.Option>
                            </Select>
                        </FormItem>
                        <FormItem>
                            <DatePicker defaultValue={moment("2022-02-09")} showTime format="YYYY-MM-DD HH:mm:ss" />
                        </FormItem>
                        <FormItem>
                            <DatePicker defaultValue={moment("2022-02-09")} showTime format="YYYY-MM-DD HH:mm:ss" />
                        </FormItem>
                        <FormItem label="订单状态" >
                            <Select placeholder="全部" style={{ width: 80 }}>
                                <Select.Option value="">全部</Select.Option>
                                <Select.Option value="1">进行中</Select.Option>
                                <Select.Option value="2">行程结束</Select.Option>
                            </Select>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" style={{ margin: "0 20px" }}>查询</Button>
                            <Button>重置</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card style={{ marginTop: 10 }}>
                    <Button type="primary">订单详情</Button>
                    <Button type="primary" style={{ marginLeft: 10 }} onClick={this.handleConfirm}>结束订单</Button>
                </Card>
                <div className="content-wrap">
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
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                    />
                </div>
                <Modal
                    title="结束订单"
                    visible={this.state.orderConfirmVisible}
                    onCancel={() => {
                        this.setState({
                            orderConfirmVisible: false
                        })
                    }}
                    onOk={this.handleFinishOrder}
                    width={600}
                >
                    <Form layout="horizontal" ref="myForm6">
                        <FormItem label="车辆编号" {...formItemLayout}>
                            {this.state.orderInfo.bike_sn}
                        </FormItem>
                        <FormItem label="剩余电量" {...formItemLayout}>
                            {this.state.orderInfo.battery + "%"}
                        </FormItem>
                        <FormItem label="行程开始时间" {...formItemLayout}>
                            {this.state.orderInfo.start_time}
                        </FormItem>
                        <FormItem label="当前位置" {...formItemLayout}>
                            {this.state.orderInfo.location}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}