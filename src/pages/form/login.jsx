import React, { Component } from 'react';
import { Card, Form, Input, Button, message, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const FormItem = Form.Item;
export default class FormLogin extends Component {
    handleSubmit = () => {
        let formData = this.refs.myForm.getFieldValue();
        console.log(formData);
        this.refs.myForm.validateFields()
            .then(values => {
                message.success(`${formData.userName} 登录成功！当前密码为：${formData.passWord}`)
            })
    }
    render() {
        return (
            <div>
                <Card title="登录行内表单" >
                    <Form layout="inline">
                        <FormItem>
                            <Input placeholder="请输入用户名" />
                        </FormItem>
                        <FormItem>
                            <Input placeholder="请输入用户名" />
                        </FormItem>
                        <Button type="primary">登录</Button>
                    </Form>
                </Card>
                <Card title="登录水平表单" style={{ marginTop: 10 }}>
                    <Form
                        ref="myForm"
                        style={{ width: 300 }}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}>
                        <FormItem
                            name="userName"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名！',
                                },
                                {
                                    min: 5, max: 10,
                                    message: '长度不在范围内'
                                },
                                {
                                    pattern: new RegExp('^\\w+$', 'g'),
                                    message: '用户名必须为英文字母或数字'
                                }
                            ]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
                        </FormItem>
                        <FormItem
                            name="passWord"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码！',
                                },
                            ]}
                        >
                            <Input prefix={<LockOutlined />} placeholder="请输入密码" />
                        </FormItem>
                        <FormItem name="remember" valuePropName="checked" >
                            <Checkbox>记住密码</Checkbox>
                            <a href="#" style={{ float: "right" }}>忘记密码</a>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={this.handleSubmit}>登录</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}
