import { memo, useEffect, useState } from "react";
import { Row, Col, Card, List, Typography, Divider, Tabs, Modal } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { Spin, Space } from 'antd';

import RequestInfo from "../Data/ResquestInfo";

// const data = [
//     'Racing car sprays burning fuel into crowd.',
//     'Japanese princess to wed commoner.',
//     'Australian walks 100km after outback crash.',
//     'Man charged over missing wedding girl.',
//     'Los Angeles battles huge wildfires.',
// ];

const { TabPane } = Tabs;
const { Meta } = Card;

function callback(key) {
    console.log(key);
}


export const Service = memo(() => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [items, setItems] = useState([...RequestInfo])
    const [isError, setIsError] = useState(false)

    const showModal = () => {
        setIsModalVisible(true);

    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    if (isError)
        return <>
            <div>
                <Spin size="large" />
            </div>
        </>

    return <>
        <div>
            <div id="modal_mount">
            </div>
            {
                items.map((item) => {
                    return <Row>
                        <Col span={6} style={{ padding: '10px' }}>
                            <Row style={{ paddingTop: '10px', paddingLeft: '40px' }}>
                                <div className="site-card-border-less-wrapper" onClick={() => {
                                    Modal.info({
                                        title: item.Name,
                                        bordered: true,
                                        hoverable: true,
                                        getContainer: '#modal_mount',
                                        // style: { width: 300 },
                                        content: <>
                                            <p>ประเภท : {item.Category} </p>
                                            <p>ขั้นตอน</p>
                                            <a href="/service/requestOne" >
                                                <PlusCircleFilled /> คลิกที่นี่! สร้าง {item.Name}
                                            </a>
                                        </>
                                    })
                                }}>
                                    <Card title={item.Name} bordered={true} hoverable={true} style={{ width: 300 }}>
                                        <Meta title="ประเภท" description={item.Category} />
                                    </Card>
                                </div>
                            </Row>
                            {/* <Modal title={item.Name} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                                
                            </Modal> */}
                        </Col>
                    </Row>

                })
            }
                {/* <Col span={18} style={{ padding: '50px' }}>
                    <Tabs defaultActiveKey="1" onChange={callback} centered={true}>
                        <TabPane tab="ทั้งหมด" key="1">
                            <Divider orientation="left">ใบคำร้องทั่วไป</Divider>
                            <List
                                bordered
                                dataSource={data}
                                renderItem={item => (
                                    <List.Item>
                                        <Typography.Text mark>[ITEM]</Typography.Text> {item}
                                    </List.Item>
                                )}
                            />

                            <Divider orientation="left">ใบคำร้องทั่วไป</Divider>
                            <List
                                bordered
                                dataSource={data}
                                renderItem={item => (
                                    <List.Item>
                                        <Typography.Text mark>[ITEM]</Typography.Text> {item}
                                    </List.Item>
                                )}
                            />

                        </TabPane>
                        <TabPane tab="ใบคำร้องทั่วไป" key="2">
                            <Divider orientation="left">ใบคำร้องทั่วไป</Divider>
                            <List
                                bordered
                                dataSource={data}
                                renderItem={item => (
                                    <List.Item>
                                        <Typography.Text mark>[ITEM]</Typography.Text> {item}
                                    </List.Item>
                                )}
                            />

                        </TabPane>
                        <TabPane tab="ใบลาป่วย" key="3">
                            <Divider orientation="left">ใบลาป่วย</Divider>
                            <List
                                bordered
                                dataSource={data}
                                renderItem={item => (
                                    <List.Item>
                                        <Typography.Text mark>[ITEM]</Typography.Text> {item}
                                    </List.Item>
                                )}
                            />

                        </TabPane>
                        <TabPane tab="ใบลากิจ" key="4">
                            <Divider orientation="left">ใบลากิจ</Divider>
                            <List
                                bordered
                                dataSource={data}
                                renderItem={item => (
                                    <List.Item>
                                        <Typography.Text mark>[ITEM]</Typography.Text> {item}
                                    </List.Item>
                                )}
                            />

                        </TabPane>
                        <TabPane tab="ใบยื่นทุนการศึกษา" key="5">
                            <Divider orientation="left">ใบยื่นทุนการศึกษา</Divider>
                            <List
                                bordered
                                dataSource={data}
                                renderItem={item => (
                                    <List.Item>
                                        <Typography.Text mark>[ITEM]</Typography.Text> {item}
                                    </List.Item>
                                )}
                            />

                        </TabPane>
                    </Tabs>

                </Col>
            <Row>
            </Row> */}
     


        </div>

    </>

});