import { memo, useEffect, useState } from "react";
import { Image, Carousel, Row, Col, Button } from 'antd';
import { AlertFilled } from '@ant-design/icons';


function onChange(a, b, c) {
    console.log(a, b, c);
}

const contentStyle = {
    height: '500px',
    color: '#fff',
    lineHeight: '500px',
    textAlign: 'center',
    background: '#364d79',
};


export const Home = memo(() => {

    return <>
        <Carousel afterChange={onChange}>
            <div>
                <h3 style={contentStyle}>
                    <img src="https://www.it.kmitl.ac.th/wp-content/themes/itkmitl2017wp/img/itkmitl-panorama-1.jpg" style={{ width: "100%", height: "500px" }}></img>

                </h3>
            </div>
            <div>
                <h3 style={contentStyle}>2</h3>
            </div>

        </Carousel>
        <div style={{ padding: '30px' }}>
            <p className="thaiFont" style={{ fontSize: '40px' }}>
                ข่าวสารและประชาสัมพันธ์
            </p>
            <Row>
                <Col span={12} style={{ backgroundColor: '#C4C4C4' }}>
                    col-12
                </Col>
                <Col span={12} >
                    <Row style={{ backgroundColor: '#C4C4C4', margin: '20px' }}>
                        1
                    </Row>
                    <Row style={{ backgroundColor: '#C4C4C4', margin: '20px' }}>
                        2
                    </Row>
                    <Row style={{ backgroundColor: '#C4C4C4', margin: '20px' }}>
                        3
                    </Row>
                </Col>
            </Row>

            <Button type="primary" shape="round" size="large" style={{ marginTop: '30px', float: 'right' }} icon={<AlertFilled />}>
                <span className="thaiFont">
                    ข่าวสารเพิ่มเติม
                </span>
            </Button>
        </div>

        <div style={{ padding: '30px', paddingTop: '100px' }}>
            <p className="thaiFont" style={{ fontSize: '40px' }}>
                ปฏิทินการศึกษา
            </p>
        </div>
    </>

});