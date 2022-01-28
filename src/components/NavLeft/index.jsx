import React, { Component } from 'react';
import { Menu } from 'antd';
import MenuConfig from '../../config/menuConfig.js';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import './index.less';

const { SubMenu } = Menu;
export default class NavLeft extends Component {
    UNSAFE_componentWillMount() {
        const menuTreeNode = this.renderMenu(MenuConfig);
        this.setState({
            menuTreeNode
        })
    }

    // 菜单渲染
    renderMenu = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    // 二级菜单
                    <SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return <Menu.Item title={item.title} key={item.key} >{item.title}</Menu.Item>
        })
    }

    render() {
        return (
            <div>
                <div className="logo">
                    <img src="assets/logo.png" />
                    <h1>Bic MS</h1>
                </div>
                <Menu theme="dark">
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        )
    }
}
