import React, { Component } from 'react';
import { Card, Carousel } from 'antd';
import './ui.less';

export default class Carousels extends Component {

    render() {
        const contentStyle1 = {
            height: '160px',
            color: '#fff',
            lineHeight: '160px',
            textAlign: 'center',
            background: '#364d79',
        };
        const contentStyle2 = {
            height: '200px',
            width: '100%'
        };
        return (
            <div>
                <Card title="文字背景轮播" className="card-wrap">
                    <Carousel autoplay effect="fade">
                        <div><h3 style={contentStyle1}>Ant Motion Banner - React</h3></div>
                        <div><h3 style={contentStyle1}>Ant Motion Banner - Vue</h3></div>
                        <div><h3 style={contentStyle1}>Ant Motion Banner - Angular</h3></div>
                    </Carousel>
                </Card>
                <Card title="图片轮播" className="card-wrap">
                    <Carousel autoplay effect="fade" >
                        <div><img style={contentStyle2} src="/carousel-img/carousel-1.jpg" /></div>
                        <div><img style={contentStyle2} src="/carousel-img/carousel-2.jpg" /></div>
                        <div><img style={contentStyle2} src="/carousel-img/carousel-3.jpg" /></div>
                    </Carousel>
                </Card>
            </div>
        )
    }
}
