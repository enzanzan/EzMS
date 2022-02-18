import React, { Component } from 'react';
import { Card, Button, Form, Select, Modal, Input, message } from 'antd';
import ETable from './../../components/ETable';
import Utils from '../../utils/utils';
import axios from './../../axios';

const FormItem = Form.Item;
export default class PermissionUser extends Component {
    state = {
        isRoleVisible: false,
        isPermVisible: false
    }
    componentWillMount() {
        this.requestList();
    }

    requestList = () => {
        axios.requestList(this, "/roleList.php", this.params);
    }

    // 创建角色
    handleRole = () => {
        this.setState({
            isRoleVisible: true
        })
    }
    // 提交创建角色
    handleRoleSubmit = () => {
        let data = this.refs.myForm7.getFieldValue();
        axios.ajax({
            url: "/roleList.php",
            data: {
                params: data
            }
        }).then(res => {
            if (res.code === 0) {
                message.success("创建成功");
                this.setState({
                    isRoleVisible: false
                })
                this.refs.myForm7.resetFields();
                this.requestList();
            }
        })
    }

    // 设置权限
    handlePermission = () => {
        let item = this.state.selectedItem;
        console.log(item.role_name);
        if (!item) {
            Modal.info({
                content: "请选择一个角色"
            })
            return;
        }
        this.setState({
            isPermVisible: true,
            detailInfo: item,
        })
    }
    render() {
        const columns = [
            {
                title: "角色ID",
                dataIndex: "id"
            },
            {
                title: "角色名称",
                dataIndex: "role_name"
            },
            {
                title: "创建时间",
                dataIndex: "create_time",
                render: Utils.formateDate
            },
            {
                title: "使用状态",
                dataIndex: "state",
                render(status) {
                    return status === "1" ? "启用" : "禁用"
                }
            },
            {
                title: "授权时间",
                dataIndex: "authorize_time",
                render: Utils.formateDate
            },
            {
                title: "授权人",
                dataIndex: "authorize_user_name",
            },
        ]

        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 20 }
        }
        const { detailInfo } = this.state;
        console.log(detailInfo);
        return (
            <div>
                <Card>
                    <Button type="primary" onClick={this.handleRole} >创建角色</Button>
                    <Button type="primary" style={{ marginRight: 10, marginLeft: 10 }} onClick={this.handlePermission}>设置权限</Button>
                    <Button type="primary" >用户授权</Button>
                </Card>
                <div className="content-wrap">
                    <ETable
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        selectedRowKeys={this.state.selectedRowKeys}
                        dataSource={this.state.list}
                        columns={columns}
                    />
                </div>
                <Modal
                    title="创建角色"
                    visible={this.state.isRoleVisible}
                    onOk={this.handleRoleSubmit}
                    onCancel={() => {
                        this.refs.myForm7.resetFields();
                        this.setState({
                            isRoleVisible: false
                        })
                    }}
                    width={600}
                >
                    <Form layout="horizontal" type={this.state.type} ref="myForm7">
                        <FormItem label="角色名称" name="role_name" {...formItemLayout}>
                            <Input type="text" placeholder="请输入角色名称" />
                        </FormItem>

                        <FormItem label="状态" name="state" {...formItemLayout}>
                            <Select>
                                <Select.Option value={1}>开启</Select.Option>
                                <Select.Option value={2}>关闭</Select.Option>
                            </Select>
                        </FormItem>
                    </Form>
                </Modal>
                <Modal
                    title="设置权限"
                    visible={this.state.isPermVisible}
                    width={600}
                    onOk={this.handelPermEditSubmit}
                    onCancel={() => {
                        this.setState({
                            isPermVisible: false
                        })
                    }}
                >
                    <Form layout="horizontal" ref="myForm8">
                        <FormItem label="角色名称"  {...formItemLayout}>
                            <Input disabled />
                        </FormItem>
                        <FormItem label="状态" {...formItemLayout} name="status" initialValue="1" >
                            <Select>
                                <Select.Option value="1">启用</Select.Option>
                                <Select.Option value="0">禁用</Select.Option>
                            </Select>
                        </FormItem>
                    </Form>
                </Modal>
            </div >
        )
    }
}
