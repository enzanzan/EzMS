import React, { Component } from 'react';
import { Card, Button, Form, Select, Modal, Input, message, Tree, Transfer } from 'antd';
import ETable from './../../components/ETable';
import Utils from '../../utils/utils';
import axios from './../../axios';
import menuConfig from './../../config/menuConfig';

const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;
export default class PermissionUser extends Component {
    state = {
        isRoleVisible: false,
        isPermVisible: false,
        isUserVisible: false
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
        if (!item) {
            Modal.info({
                content: "请选择一个角色"
            })
            return;
        }
        this.setState({
            isPermVisible: true,
            detailInfo: item,
            menuInfo: item.menus
        })
    }

    renderTreeNodes = data => {
        return data.map(item => {
            if (item.children) {
                return <TreeNode title={item.title} key={item.key}>
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
            } else {
                return <TreeNode {...item} />
            }
        })
    }

    onCheck = checkedKeys => {
        this.setState({
            menuInfo: checkedKeys
        })
    }

    // 确认创建角色
    handelPermEditSubmit = () => {
        let data = this.refs.myForm8.getFieldValue();
        data.role_id = this.state.selectedItem.id;
        data.menus = this.state.menuInfo;
        axios.ajax({
            url: "/permissionEdit.php",
            data: {
                params: {
                    ...data
                }
            }
        }).then(res => {
            this.setState({
                isPermVisible: false
            })
            this.requestList();
        })
    }

    // 用户授权
    handleUserAuth = () => {
        let item = this.state.selectedItem;
        console.log(item.role_nmame);
        if (!item) {
            Modal.info({
                content: "请选择一个角色"
            })
            return;
        }
        this.setState({
            isUserVisible: true,
            detailInfo: item
        })
        this.getRoleUserList(item.id);
    }

    // 角色用户列表
    getRoleUserList = id => {
        axios.ajax({
            url: "/roleUser.php",
            data: {
                params: {
                    id
                }
            }
        }).then(res => {
            if (res) {
                console.log(res);
                this.getAuthUserList(res.result);
            }
        })
    }

    // 筛选目标用户
    getAuthUserList = dataSource => {
        console.log(dataSource);
        const mockData = [];
        const targetKeys = [];
        if (dataSource && dataSource.length > 0) {
            for (let i = 0; i < dataSource.length; i++) {
                const data = {
                    key: dataSource[i].user_id,
                    title: dataSource[i].user_name,
                    status: dataSource[i].status
                }
                console.log(data);
                if (data.status === 1) {
                    targetKeys.push(data.key);
                }
                mockData.push(data);
            }
            this.setState({
                mockData,
                targetKeys
            })
        }
    }

    // 过滤用户
    filterOption = (inputValue, option) => option.title.indexOf(inputValue) > -1;

    // 选择用户
    handleChange = targetKeys => {
        this.setState({
            targetKeys: targetKeys
        })
        // this.state.patchUserInfo(targetKeys);
    }

    // 用户授权提交
    handelUserSubmit = () => {
        let data = {}
        data.user_ids = this.state.targetKeys;
        data.role_id = this.state.selectedItem.id;
        axios.ajax({
            url: "/roleEdit.php",
            data: {
                params: {
                    ...data
                }
            }
        }).then(res => {
            if (res) {
                this.setState({
                    isUserVisible: false
                })
                this.requestList();
            }
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



        return (
            <div>
                <Card>
                    <Button type="primary" onClick={this.handleRole} >创建角色</Button>
                    <Button type="primary" style={{ marginRight: 10, marginLeft: 10 }} onClick={this.handlePermission}>设置权限</Button>
                    <Button type="primary" onClick={this.handleUserAuth}>用户授权</Button>
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
                    <Form layout="horizontal" ref="myForm8"
                        menuInfo={this.state.menuInfo}
                        patchMenuInfo={checkedKeys => {
                            this.setState({
                                menuInfo: checkedKeys
                            })
                        }}
                    >
                        <FormItem label="角色名称"  {...formItemLayout}>
                            <Input disabled placeholder={this.state.detailInfo ? this.state.detailInfo.role_name : ""} />
                        </FormItem>
                        <FormItem label="状态" {...formItemLayout} name="status" initialValue="1" >
                            <Select>
                                <Select.Option value="1">启用</Select.Option>
                                <Select.Option value="0">禁用</Select.Option>
                            </Select>
                        </FormItem>
                        <Tree
                            checkable  // 复选框
                            defaultExpandAll  // 默认展开
                            onCheck={(checkedKeys) => {  // 保存选中的权限
                                this.onCheck(checkedKeys)
                            }}
                            checkedKeys={this.state.menuInfo}  // 默认列出的权限
                        >
                            <TreeNode title="平台权限" key="platform_all">
                                {this.renderTreeNodes(menuConfig)}
                            </TreeNode>
                        </Tree>
                    </Form>
                </Modal>
                <Modal
                    title="用户授权"
                    visible={this.state.isUserVisible}
                    width={800}
                    onOk={this.handelUserSubmit}
                    onCancel={() => {
                        this.setState({
                            isUserVisible: false
                        })
                    }}
                >
                    <Form layout="horizontal" ref="myForm9"
                        detailInfo={this.state.detailInfo}
                        targetKeys={this.state.targetKeys}
                        mockData={this.state.mockData}
                        patchUserInfo={targetKeys => {
                            this.setState({
                                userInfo: targetKeys
                            })
                        }}
                    >
                        <FormItem label="角色名称"  {...formItemLayout}>
                            <Input disabled placeholder={this.state.detailInfo ? this.state.detailInfo.role_name : ""} />
                        </FormItem>
                        <FormItem label="选择用户"  {...formItemLayout}>
                            <Transfer
                                listStyle={{ width: 200, height: 400 }}
                                dataSource={this.state.mockData}
                                titles={['待选用户', '已选用户']}
                                showSearch
                                searchPlaceholder="输入用户名"
                                filterOption={this.filterOption}
                                targetKeys={this.state.targetKeys}
                                onChange={this.handleChange}
                                render={item => item.title}
                            />
                        </FormItem>
                    </Form>
                </Modal>
            </div >
        )
    }
}
