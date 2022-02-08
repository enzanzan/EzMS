import React, { Component } from 'react';
import { Card, Spin, Alert } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './ui.less';

export default class Loadings extends Component {
    render() {
        // const icon = <Icon type="loading" />
        const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
        return (
            <div>
                <Card title="Spin用法" className="card-wrap">
                    <Spin size="small" />
                    <Spin style={{ margin: '0 10px' }} />
                    <Spin size="large" />
                    <Spin indicator={antIcon} style={{ marginLeft: 10 }} />
                </Card>
                <Card title="内容遮罩" className="card-wrap">
                    <Alert
                        message="恩赞集团"
                        description="欢迎来到恩赞后台管理系统"
                        type="info"
                        className="alert"
                    />
                    <Spin className="spin">
                        <Alert
                            message="恩赞集团"
                            description="欢迎来到恩赞后台管理系统"
                            type="warning"
                            className="alert"
                        />
                    </Spin>
                    <Spin tip="加载中...">
                        <Alert
                            message="恩赞集团"
                            description="欢迎来到恩赞后台管理系统"
                            type="warning"
                            className="alert"
                        />
                    </Spin>
                    <Spin indicator={antIcon} >
                        <Alert
                            message="恩赞集团"
                            description="欢迎来到恩赞后台管理系统"
                            type="warning"
                            className="alert"
                        />
                    </Spin>
                </Card>
            </div >
        )
    }
}
