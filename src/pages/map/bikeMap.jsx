import React, { Component } from 'react';
import { Card, Form } from 'antd';
import axios from './../../axios';
import BaseForm from './../../components/BaseForm';

export default class BikeMap extends Component {

    state = {}
    map = "";

    formList = [
        {
            type: "城市",
        },
        {
            type: "时间查询",
        },
        {
            type: "SELECT",
            label: "订单状态",
            field: "order_status",
            placeholder: "全部",
            initialValue: "0",
            width: 100,
            list: [{ id: "0", name: "全部" }, { id: "1", name: "进行中" }, { id: "2", name: "行程结束" }]
        },
    ]

    requestList = () => {
        axios.ajax({
            url: "/bikeMap.php",
            data: {
                params: this.params
            }
        }).then(res => {
            if (res.code === 0) {
                console.log(111);
                this.setState({
                    total_count: res.total_count
                })
                this.renderMap(res);
            }
        })
    }

    componentWillMount() {
        this.requestList();
    }

    // 查询表单
    handleFilterSubmit = filterParams => {
        this.params = filterParams;
        this.requestList();
    }

    // 渲染地图数据
    renderMap = res => {
        let list = res.route_list;
        this.map = new window.BMapGL.Map("container");// 初始化地图
        let gps1 = list[0].split(",");
        let startPoint = new window.BMapGL.Point(gps1[0], gps1[1]);
        let gps2 = list[list.length - 1].split(",");
        let endPoint = new window.BMapGL.Point(gps2[0], gps2[1]);
        this.map.centerAndZoom(endPoint, 11);  // 设置中心点坐标和地图级别

        // 获取图标
        let startPointIcon = new window.BMapGL.Icon("/assets/start_point.png", new window.BMapGL.Size(36, 42), {
            imageSize: new window.BMapGL.Size(36, 42),
            anchor: new window.BMapGL.Size(18, 42)
        })
        let bikeMarkerStart = new window.BMapGL.Marker(startPoint, { icon: startPointIcon });
        this.map.addOverlay(bikeMarkerStart);
        // 图标依赖 Marker添加
        let endPointIcon = new window.BMapGL.Icon("/assets/end_point.png", new window.BMapGL.Size(36, 42), {
            imageSize: new window.BMapGL.Size(36, 42),
            anchor: new window.BMapGL.Size(18, 42)
        })
        let bikeMarkerEnd = new window.BMapGL.Marker(endPoint, { icon: endPointIcon });
        this.map.addOverlay(bikeMarkerEnd);

        //连接路线图
        let routeList = [];
        list.forEach(item => {
            let p = item.split(",");
            routeList.push(new window.BMapGL.Point(p[0], p[1]));//保存所有坐标点
        })

        // 创建折线
        let polyLine = new window.BMapGL.Polyline(routeList, {
            strokeColor: "#ef4136", // 折线颜色
            strokeWeight: 2,  // 折线的宽度
            strokeOpacity: 1,  // 折线的透明度
        })
        this.map.addOverlay(polyLine);

        // 绘制服务区
        let servicePointList = [];
        let serviceList = res.service_list;
        serviceList.forEach(item => {
            servicePointList.push(new window.BMapGL.Point(item.lon, item.lat));
        })
        let polyServiceLine = new window.BMapGL.Polygon(servicePointList, {
            strokeColor: "#ef4136", // 折线颜色
            strokeWeight: 2,  // 折线的宽度
            strokeOpacity: 1,  // 折线的透明度
        })
        this.map.addOverlay(polyServiceLine);

        // 添加地图中的自行车图标
        let bikeList = res.bike_list;
        console.log(bikeList);
        let bikeIcon = new window.BMapGL.Icon("/assets/bike.jpg", new window.BMapGL.Size(36, 42), {
            imageSize: new window.BMapGL.Size(36, 42),
            anchor: new window.BMapGL.Size(18, 42)
        })
        bikeList.forEach(item => {
            let p = item.split(",");
            let point = new window.BMapGL.Point(p[0], p[1]);
            let bikeMarker = new window.BMapGL.Marker(point, { icon: bikeIcon });
            this.map.addOverlay(bikeMarker);
        })
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <Card>
                    <BaseForm ref="myForm5" formList={this.formList} filterSubmit={this.handleFilterSubmit} />
                </Card>
                <Card style={{ marginTop: 10 }}>
                    <div>共{this.state.total_count}辆车</div>
                    <div id="container" style={{ height: 500 }}></div>
                </Card>
            </div>
        )
    }
}
