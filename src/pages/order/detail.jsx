import React, { Component } from 'react';
import { Card } from 'antd';
import axios from './../../axios';
import './detail.less';

export default class OrderDetail extends Component {
    state = {

    }
    componentDidMount() {
        let orderId = this.props.match.params.orderId;
        if (orderId) {
            this.getDetailInfo(orderId);
        }
    }
    getDetailInfo = orderId => {
        axios.ajax({
            url: "/orderDetail.php",
            data: {
                params: {
                    orderId
                }
            }
        }).then(res => {
            if (res.code === 0) {
                this.setState({
                    orderInfo: res.result
                })
                this.renderMap(res.result);
            }
        })
    }

    renderMap = result => {
        this.map = new window.BMapGL.Map("orderDetailMap");// 初始化地图
        this.map.centerAndZoom("116.404, 39.915", 11);  // 设置中心点坐标和地图级别
        this.addMapControl();  // 调用添加地图控件
        this.drawBikeRoute(result.position_list); //调用路线图绘制方法
    }

    // 添加地图控件
    addMapControl = () => {
        let map = this.map;
        map.addControl(new window.BMapGL.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT })); // 添加比例尺控件
        map.addControl(new window.BMapGL.ZoomControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT })); // 添加缩放控件
        map.addControl(new window.BMapGL.CityListControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT })); // 添加城市列表控件
    }

    // 绘制用户的行驶路线
    drawBikeRoute = positionList => {
        let map = this.map;
        let startPoint = "";
        let endPoint = "";
        if (positionList.length > 0) {
            let arr = positionList[0];
            // 创建起始图标点
            startPoint = new window.BMap.Point(arr, lon, arr.lat);
            // 获取图标
            let startIcon = new window.BMap.Icon("/assets/start_point.png", new window.BMap.Size(36, 42), {
                imageSize: new window.BMap.Size(36, 42),
                anchor: new window.BMap.Size(36, 42),
            })
            // 图标依赖 Marker添加
            let startMarker = new window.BMap.Marker(startPoint, { icon: startIcon });
        }
    }
    render() {
        const info = this.state.orderInfo || {};
        return (
            <div>
                <Card>
                    <div id="orderDetailMap" className="order-map"></div>
                    <div className="detail-items">
                        <div className="item-title">基础信息</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">用车模式</div>
                                <div className="detail-form-content">
                                    {info.mode === 1 ? "服务区" : "停车点"}
                                </div>
                            </li>
                            <li>
                                <div className="detail-form-left">订单编号</div>
                                <div className="detail-form-content">
                                    {info.order_sn}
                                </div>
                            </li>
                            <li>
                                <div className="detail-form-left">车辆编号</div>
                                <div className="detail-form-content">
                                    {info.bike_sn}
                                </div>
                            </li>
                            <li>
                                <div className="detail-form-left">用户姓名</div>
                                <div className="detail-form-content">
                                    {info.user_name}
                                </div>
                            </li>
                            <li>
                                <div className="detail-form-left">手机号码</div>
                                <div className="detail-form-content">
                                    {info.mobile}
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="detail-items">
                        <div className="item-title">行驶轨迹</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">行程起点</div>
                                <div className="detail-form-content">
                                    {info.start_location}
                                </div>
                            </li>
                            <li>
                                <div className="detail-form-left">行程终点</div>
                                <div className="detail-form-content">
                                    {info.end_location}
                                </div>
                            </li>
                            <li>
                                <div className="detail-form-left">行驶里程</div>
                                <div className="detail-form-content">
                                    {info.distance / 1000}公里
                                </div>
                            </li>

                        </ul>
                    </div>
                </Card>
            </div >
        )
    }
}
