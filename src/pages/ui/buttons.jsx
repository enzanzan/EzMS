import React, { Component } from 'react';
import { Card, Button, Radio } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, DownloadOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import './ui.less';

export default class Buttons extends Component {
    state = {
        loading: true, // 默认loading
        size: 'default',  // 单选按钮默认大小
    }

    // loading
    handleCloseLoading = () => {
        this.setState({
            loading: false
        })
    }

    // radio size
    handleSizeChange = e => {
        this.setState({
            size: e.target.value
        })
    }

    render() {
        const { size, loading } = this.state;
        return (
            <div>
                <Card title="基础按钮" className="card-wrap">
                    <Button type="primary" >Ezan</Button>
                    <Button>Ezan</Button>
                    <Button type="dashed" >Ezan</Button>
                    <Button type="danger" >Ezan</Button>
                    <Button disabled >Ezan</Button>
                </Card>
                <Card title="图形按钮" className="card-wrap">
                    <Button icon={<PlusOutlined />}>创建</Button>
                    <Button icon={<EditOutlined />}>编辑</Button>
                    <Button icon={<DeleteOutlined />}>删除</Button>
                    <Button shape="circle" icon={<SearchOutlined />}></Button>
                    <Button type="primary" icon={<SearchOutlined />}>搜索</Button>
                    <Button tyoe="primary" icon={<DownloadOutlined />}>下载</Button>
                </Card>
                <Card title="Loading按钮" className="card-wrap">
                    <Button type="primary" loading={loading}>确定</Button>
                    <Button type="primary" shape="circle" loading={loading}></Button>
                    <Button loading={loading} >点击加载</Button>
                    <Button shape="circle" loading={loading}></Button>
                    <Button type="primary" onClick={this.handleCloseLoading}>关闭</Button>
                </Card>
                <Card title="按钮组" style={{ marginBottom: 10 }}>
                    <Button.Group>
                        <Button type="primary" icon={<LeftOutlined />} >返回</Button>
                        <Button type="primary" icon={<RightOutlined />}>前进</Button>
                    </Button.Group>
                </Card>
                <Card title="按钮尺寸" className="card-wrap">
                    <Radio.Group value={size} onChange={this.handleSizeChange}>
                        <Radio.Button value="large">大</Radio.Button>
                        <Radio.Button value="default">中</Radio.Button>
                        <Radio.Button value="small">小</Radio.Button>
                    </Radio.Group>
                    <Button type="primary" size={size}>Primary</Button>
                    <Button size={size}>Default</Button>
                    <Button type="dashed" size={size}>Dashed</Button>
                </Card>
            </div >
        )
    }
}
