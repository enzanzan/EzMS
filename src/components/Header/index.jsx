import React, { Component } from 'react';
import { Row, Col } from 'antd';
import './index.less';
import Util from '../../utils/utils';
import axios from 'axios';
import { connect } from 'react-redux';

class Header extends Component {
    state = {}
    componentWillMount() {
        this.setState({
            userName: '符恩铭'
        })
        setInterval(() => {
            let sysTime = Util.formateDate(new Date().getTime());
            this.setState({
                sysTime
            })
        }, 1000)
        this.getWeatherAPIData();
    }

    getWeatherAPIData() {
        axios.get("https://devapi.qweather.com/v7/weather/now?location=101010100&key=9a5fb1ac50484e8e8e2854a110ff3fb3")
            .then(res => {
                if (res) {
                    let wea = res.data.now.text;
                    this.setState({
                        wea
                    })
                }
            }).catch(() => {
                console.log("错误了");
            })

    }

    render() {
        const menuType = this.props.menuType;
        return (
            <div className="header">
                <Row className="header-top">
                    {
                        menuType ?
                            <Col span={6} className="logo">
                                <img src="/assets/logo.png" />
                                <span>EZan 集团后台管理系统</span>
                            </Col>
                            : ""
                    }
                    <Col span={menuType ? 18 : 24}>
                        <span>欢迎您，{this.state.userName}</span>
                        <a href="#" style={{ color: "red" }}>退出</a>
                    </Col>
                </Row>
                {
                    menuType ? "" :
                        <Row className="breadcrumb">
                            <Col span={4} className="breadcrumb-title">
                                {this.props.menuName}
                            </Col>
                            <Col span={20} className="weather">
                                <span className="date">{this.state.sysTime}</span>
                                <span className="weather-datail">{this.state.wea}</span>
                            </Col>
                        </Row>
                }
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        menuName: state.menuName
    }
}
export default connect(mapStateToProps)(Header);