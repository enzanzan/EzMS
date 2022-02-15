import React, { Component } from 'react';
import { Card, Button, Modal, Form, Radio, Select, Input, DatePicker } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from './../../axios';
import Utils from './../../utils/utils';
import BaseForm from './../../components/BaseForm';
import ETable from './../../components/ETable';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;

export default class User extends Component {

    state = {
        isVisible: false
    }

    params = {
        page: 1
    }

    formList = [
        {
            type: "INPUT",
            label: "用户名",
            field: "user_name",
            placeholder: "请输入用户名称",
            width: 100,
        },
        {
            type: "INPUT",
            label: "手机号",
            field: "user_mobile",
            placeholder: "请输入手机号",
            width: 100,
        },
        {
            type: "DATE",
            label: "请选择入职日期",
            field: "user_date",
            placeholder: "请输入日期",
        },
    ]

    handleFiter = params => {
        this.parms = params;
        this.requestList();
    }

    componentDidMount() {
        this.requestList();
    }

    requestList = () => {
        axios.requestList(this, "/user.php", this.params);
    }

    // 功能区操作
    handleOperate = type => {
        if (type === "create") {
            this.setState({
                type,
                isVisible: true,
                title: "创建员工"
            })
        }
    }

    // 创建员工提交
    handleSubmit = () => {
        // let type = this.state.type;
        let data = this.refs.myForm6.getFieldValue();
        axios.ajax({
            url: "addUser.php",
            data: {
                params: data
            }
        }).then(res => {
            if (res.code === 0) {
                this.refs.myForm6.resetFields();
                this.setState({
                    isVisible: false
                })
                this.requestList();
            }
        })
    }

    render() {

        const columns = [
            {
                title: "id",
                dataIndex: "id"
            },
            {
                title: "用户名",
                dataIndex: "username"
            },
            {
                title: "性别",
                dataIndex: "sex",
                render(sex) {
                    return sex === 1 ? "男" : "女"
                }
            },
            {
                title: "状态",
                dataIndex: "state",
                render(state) {
                    return {
                        "1": "咸鱼一条",
                        "2": "风华浪子",
                        "3": "北大才子",
                        "4": "百度FE",
                        "5": "创业者"
                    }[state];
                }
            },
            {
                title: "爱好",
                dataIndex: "interest",
                render(interest) {
                    return {
                        "1": "篮球",
                        "2": "游泳",
                        "3": "踢足球",
                        "4": "滑雪",
                        "5": "排球",
                        "6": "骑行",
                        "7": "桌球",
                        "8": "唱歌",
                    }[interest];
                }
            },
            {
                title: "生日",
                dataIndex: "birthday"
            },
            {
                title: "联系地址",
                dataIndex: "address"
            },
            {
                title: "早起时间",
                dataIndex: "time"
            },
        ]

        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 }
        }

        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} />
                </Card>
                <Card style={{ marginTop: 10 }} className="operate-wrap">
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => this.handleOperate("create")}>创建员工</Button>
                    <Button type="primary" icon={<EditOutlined />} onClick={() => this.handleOperate("edit")}>编辑员工</Button>
                    <Button type="primary" onClick={() => this.handleOperate("detail")}>员工详情</Button>
                    <Button type="primary" icon={<DeleteOutlined />} onClick={() => this.handleOperate("delete")}>删除员工</Button>
                </Card>
                <div className="content-wrap">
                    <ETable
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        columns={columns}
                        dataSource={this.state.list}
                        selectedRowKeys={this.state.selectedRowKeys}
                        selectedItem={this.state.selectedItem}
                        pagination={false}
                    />
                </div>
                <Modal
                    title={this.state.title}
                    visible={this.state.isVisible}
                    onOk={this.handleSubmit}
                    onCancel={() => {
                        this.refs.myForm6.resetFields();
                        this.setState({
                            isVisible: false
                        })
                    }}
                    width={600}
                >
                    <Form layout="horizontal" type={this.state.type} ref="myForm6">
                        <FormItem label="用户名" {...formItemLayout} name="username">
                            <Input placeholder="请输入用户名" />
                        </FormItem>
                        <FormItem label="性别" {...formItemLayout} name="sex">
                            <RadioGroup >
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label="状态" {...formItemLayout} name="state">
                            <Select>
                                <Select.Option value="1">咸鱼一条</Select.Option>
                                <Select.Option value="2">风华浪子</Select.Option>
                                <Select.Option value="3">北大才子</Select.Option>
                                <Select.Option value="4">百度FE</Select.Option>
                                <Select.Option value="5">创业者</Select.Option>
                            </Select>
                        </FormItem>
                        <FormItem label="生日" {...formItemLayout} name="birthday">
                            <DatePicker />
                        </FormItem>
                        <FormItem label="联系地址" {...formItemLayout} name="address">
                            <TextArea rows={3} placeholder="请输入联系地址" />
                        </FormItem>
                    </Form>
                </Modal>
            </div >
        )
    }
}
