import React, { Component } from 'react';
import { Card, Button, Table, Form, Select, Modal, message } from 'antd';
import axios from './../../axios/index';
import Utils from '../../utils/utils';

const FormItem = Form.Item;

export default class City extends Component {
    state = {
        list: [],
        isShowOpenCity: false
    }
    params = {
        page: 1
    }
    componentDidMount() {
        this.requestList();
    }

    // 默认请求接口数据
    requestList = () => {
        let _this = this;
        axios.ajax({
            url: "/openCity.php",
            data: {
                params: {
                    page: this.params.page
                }
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

    // 开通城市
    handleOpenCity = () => {
        this.setState({
            isShowOpenCity: true
        })
    }

    // 城市开通提交
    handelSubmit = () => {
        let formData = this.refs.myForm4.getFieldValue();
        axios.ajax({
            url: "/openSuccess.php",
            data: {
                params: {
                    formData,
                }
            }
        }).then(res => {
            if (res.code === 0) {
                message.success("开通成功");
                this.setState({
                    isShowOpenCity: false,
                })
                this.requestList();
            }
        })
    }

    render() {
        const columns = [
            {
                title: "城市ID",
                dataIndex: "id"
            },
            {
                title: "城市名称",
                dataIndex: "name"
            },
            {
                title: "用车模式",
                dataIndex: "mode",
                render(mode) {
                    return mode === 1 ? "停车点" : "禁停区";
                }
            },
            {
                title: "营运模式",
                dataIndex: "op_mode",
                render(op_mode) {
                    return op_mode === 1 ? "自营" : "加盟";
                }
            },
            {
                title: "授权加盟商",
                dataIndex: "franchisee_name"
            },
            {
                title: "城市管理员",
                dataIndex: "city_admins",
                render(arr) {
                    return arr.map(item => {
                        return item.user_name;
                    }).join("，");
                }
            },
            {
                title: "城市开通时间",
                dataIndex: "open_time"
            },
            {
                title: "操作时间",
                dataIndex: "update_time",
                render: Utils.formateDate
            },
            {
                title: "操作人员",
                dataIndex: "sys_user_name"
            },
        ]
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19

            },
        }
        return (
            <div>
                <Card>
                    <Form layout="inline" ref="myForm3">
                        <FormItem label="城市" >
                            <Select placeholder="全部" style={{ width: 110 }}>
                                <Select.Option value="">全部</Select.Option>
                                <Select.Option value="1">北京市</Select.Option>
                                <Select.Option value="2">天津市</Select.Option>
                                <Select.Option value="3">深圳市</Select.Option>
                            </Select>
                        </FormItem>
                        <FormItem label="用车模式">
                            <Select placeholder="全部" style={{ width: 180 }}>
                                <Select.Option value="">全部</Select.Option>
                                <Select.Option value="1">指定停车点模式</Select.Option>
                                <Select.Option value="2">禁停区模式</Select.Option>
                            </Select>
                        </FormItem>
                        <FormItem label="营运模式" >
                            <Select placeholder="全部" style={{ width: 110 }}>
                                <Select.Option value="">全部</Select.Option>
                                <Select.Option value="1">自营</Select.Option>
                                <Select.Option value="2">加盟</Select.Option>
                            </Select>
                        </FormItem>
                        <FormItem label="加盟商授权状态" >
                            <Select placeholder="全部" style={{ width: 110 }}>
                                <Select.Option value="">全部</Select.Option>
                                <Select.Option value="1">已授权</Select.Option>
                                <Select.Option value="2">未授权</Select.Option>
                            </Select>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" style={{ margin: "0 20px" }}>查询</Button>
                            <Button>重置</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card style={{ marginTop: 10 }}>
                    <Button type="primary" onClick={this.handleOpenCity}>开通城市</Button>
                </Card>
                <div className="content-wrap">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                    />
                </div>
                <Modal
                    title="开通城市"
                    // 控制弹窗显示
                    visible={this.state.isShowOpenCity}
                    onCancel={() => {
                        this.setState({
                            isShowOpenCity: false
                        })
                    }}
                    onOk={this.handelSubmit}
                >
                    <Form layout="horizontal" ref="myForm4">
                        <FormItem label="选择城市" {...formItemLayout} name="name">
                            <Select style={{ width: 100 }} defaultValue="">
                                <Select.Option value="">全部</Select.Option>
                                <Select.Option value="1">北京市</Select.Option>
                                <Select.Option value="2">天津市</Select.Option>
                            </Select>
                        </FormItem>
                        <FormItem label="营运模式" {...formItemLayout} name="op_mode">
                            <Select style={{ width: 100 }} defaultValue="">
                                <Select.Option value="">全部</Select.Option>
                                <Select.Option value="1">自营</Select.Option>
                                <Select.Option value="2">加盟</Select.Option>
                            </Select>
                        </FormItem>
                        <FormItem label="用车模式" {...formItemLayout} name="mode">
                            <Select style={{ width: 100 }} defaultValue="1">
                                <Select.Option value="1">指定停车模式</Select.Option>
                                <Select.Option value="2">禁停区模式</Select.Option>
                            </Select>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}
