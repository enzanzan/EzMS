import React, { Component } from 'react';
import {
    Card,
    Form,
    Button,
    Input,
    Checkbox,
    Radio,
    Select,
    Switch,
    DatePicker,
    TimePicker,
    Upload,
    message,
    InputNumber
} from 'antd';
import moment from 'moment';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;

export default class FormRegister extends Component {
    state = {};
    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    // 上传头像
    handleChange = info => {
        if (info.file.status === 'uploading') {
            // this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            console.log(1);
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };

    // 注册
    handleSubmit = () => {
        let formData = this.refs.myForm2.getFieldValue();
        console.log(formData);
        this.refs.myForm2.validateFields()
            .then(values => {
                message.success(`${formData.userName} 注册成功！当前密码为：${formData.passWord}`)
            })
    }

    render() {
        const { loading, imageUrl } = this.state;
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>上传</div>
            </div>
        );
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
        };
        const offsetLayout = {
            wrapperCol: {
                xs: 24,
                sm: { span: 12, offset: 4 }
            }
        }
        return (
            <div>
                <Card title="注册表单" style={{ width: '80vw' }}>
                    <Form layout="horizontal" {...formItemLayout} ref="myForm2">
                        <FormItem
                            label="用户名"
                            name="userName"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名！',
                                },
                            ]}
                        >
                            <Input placeholder="请输入用户名" />
                        </FormItem>
                        <FormItem
                            label="密码"
                            name="passWord"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码！',
                                },
                            ]}
                        >
                            <Input type="password" placeholder="请输入密码" />
                        </FormItem>
                        <FormItem
                            label="性别"
                            name="sex"
                        >
                            <RadioGroup defaultValue="1">
                                <Radio value="1">男</Radio>
                                <Radio value="2">女</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem
                            label="年龄"
                            name="age"
                        >
                            <InputNumber defaultValue="18" />
                        </FormItem>
                        <FormItem
                            label="当前状态"
                        >
                            <Select defaultValue="1">
                                <Select.Option value="1">咸鱼一条</Select.Option>
                                <Select.Option value="2">风华浪子</Select.Option>
                                <Select.Option value="3">北大才子</Select.Option>
                                <Select.Option value="4">百度FE</Select.Option>
                                <Select.Option value="5">创业者</Select.Option>
                            </Select>
                        </FormItem>
                        <FormItem
                            label="爱好"
                        >
                            <Select mode="multiple" defaultValue={["1", "2", "3"]}>
                                <Select.Option value="1">篮球</Select.Option>
                                <Select.Option value="2">游泳</Select.Option>
                                <Select.Option value="3">踢足球</Select.Option>
                                <Select.Option value="4">滑雪</Select.Option>
                                <Select.Option value="5">排球</Select.Option>
                                <Select.Option value="6">骑行</Select.Option>
                                <Select.Option value="7">桌球</Select.Option>
                                <Select.Option value="8">唱歌</Select.Option>
                            </Select>
                        </FormItem>
                        <FormItem
                            label="是否已婚"
                            valuePropName="checked"
                        >
                            <Switch />
                        </FormItem>
                        <FormItem
                            label="生日"
                        >
                            <DatePicker
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                defaultValue={moment("2022-02-09")} />
                        </FormItem>
                        <FormItem
                            label="联系地址"
                        >
                            <TextArea
                                autoSize={{ minRows: 4, maxRows: 6 }}
                            />
                        </FormItem>
                        <FormItem label="早起时间">
                            <TimePicker />
                        </FormItem>
                        <FormItem
                            label="头像"
                            name="userImg"
                        >
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                onChange={this.handleChange}
                                showUploadList={true}
                            >
                                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            <Checkbox>我已阅读过<a href='#'>恩赞协议</a></Checkbox>
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            <Button type="primary" onClick={this.handleSubmit}>注册</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div >
        )
    }
}
