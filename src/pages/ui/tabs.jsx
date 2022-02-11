import React, { Component } from 'react';
import { Card, Tabs } from 'antd';
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';
import './ui.less';

const { TabPane } = Tabs;
export default class Buttons extends Component {

    handleCallback = key => {
        console.log(key);
    }

    UNSAFE_componentWillMount() {
        this.newTabIndex = 0;
        const panes = [
            {
                title: "Tab 1",
                content: "Tab 1",
                key: "1"
            },
            {
                title: "Tab 2",
                content: "Tab 2",
                key: "2"
            },
            {
                title: "Tab 3",
                content: "Tab 3",
                key: "3"
            }
        ]
        this.setState({
            activeKey: panes[0].key,
            panes
        })
    }

    onChange = activeKey => {
        this.setState({
            activeKey
        })
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    add = () => {
        const { panes } = this.state;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: activeKey, content: 'New Tab Pane', key: activeKey });
        this.setState({ panes, activeKey });
    };

    remove = targetKey => {
        let { activeKey } = this.state;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = panes[lastIndex].key;
            } else {
                activeKey = panes[0].key;
            }
        }
        this.setState({ panes, activeKey });
    };

    render() {
        return (
            <div>
                <Card title="Tab页签" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                        <TabPane tab="Tab 1" key="1">欢迎进入恩赞集团后台管理系统1</TabPane>
                        <TabPane tab="Tab 2" key="2">欢迎进入恩赞集团后台管理系统2</TabPane>
                        <TabPane tab="Tab 3" key="3">欢迎进入恩赞集团后台管理系统3</TabPane>
                    </Tabs>
                </Card>
                <Card title="Tab带图的页签" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                        <TabPane tab={<span><AppleOutlined />Tab 1</span>} key="1">欢迎进入恩赞集团后台管理系统1</TabPane>
                        <TabPane tab={<span><AndroidOutlined />Tab 2</span>} key="2">欢迎进入恩赞集团后台管理系统2</TabPane>
                        <TabPane tab="Tab 3" key="3">欢迎进入恩赞集团后台管理系统3</TabPane>
                    </Tabs>
                </Card>
                <Card title="Tab自定义新增页签" className="card-wrap">
                    <Tabs
                        onChange={this.onChange}
                        activeKey={this.state.activeKey}
                        type="editable-card"
                        onEdit={this.onEdit}
                    >
                        {
                            this.state.panes.map(panel => {
                                return <TabPane
                                    tab={panel.title}
                                    key={panel.key}
                                />
                            })
                        }
                    </Tabs>
                </Card>
            </div>
        )
    }
}