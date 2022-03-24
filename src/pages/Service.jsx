import { memo, useEffect, useState } from "react";
import { Row, Col, Card, List, Typography, Divider, Tabs, Modal } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import { Link } from "react-router-dom";

const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];

const { TabPane } = Tabs;
const { Meta } = Card;

function callback(key) {
    console.log(key);
}


export const Service = memo(() => {
    
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

    return <>
        <div style={{ backgroundColor: '#d6e4ff' }}>
            <Row>
                <Col span={6} style={{ padding: '30px' }}>
                    <Row style={{ paddingTop: '30px', paddingLeft: '40px' }}>
                        <div className="site-card-border-less-wrapper" onClick={showModal}>
                            <Card title="ใบคำร้องทั่วไป" bordered={true} hoverable={true} style={{ width: 300 }}>
                                <Meta title="ประเภท" description="ลงทะเบียนเพิ่ม ย้ายเซค" />

                            </Card>
                        </div>
                        <Modal title="ใบคำร้องทั่วไป" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                            <p>ประเภท : ลงทะเบียนเพิ่ม ย้ายเซค </p>
                            <p>ขั้นตอน</p>
                            <Link to="/service/requestOne" >
                                <PlusCircleFilled />คลิกที่นี่! สร้างใบคำร้อง
                            </Link>
                        </Modal>
                    </Row>
                    <Row style={{ paddingTop: '30px', paddingLeft: '40px' }}>
                        <div className="site-card-border-less-wrapper">
                            <Card title="ใบลาป่วย" bordered={true} hoverable={true} style={{ width: 300 }}>
                                <Meta title="ประเภท" description="ลาป่วย" />
                            </Card>
                        </div>
                    </Row>
                    <Row style={{ paddingTop: '30px', paddingLeft: '40px' }}>
                        <div className="site-card-border-less-wrapper">
                            <Card title="ใบลากิจ" bordered={true} hoverable={true} style={{ width: 300 }}>
                                <Meta title="ประเภท" description="ลากิจ" />
                            </Card>
                        </div>
                    </Row>
                    <Row style={{ paddingTop: '30px', paddingLeft: '40px' }}>
                        <div className="site-card-border-less-wrapper">
                            <Card title="ใบยื่นทุนการศึกษา" bordered={true} hoverable={true} style={{ width: 300 }}>
                                <Meta title="ประเภท" description="ยื่นทุนการศึกษา" />
                            </Card>
                        </div>
                    </Row>
                </Col>
                <Col span={18} style={{ padding: '50px' }}>
                    <Tabs defaultActiveKey="1" onChange={callback} centered={true}>
                        <TabPane tab="ทั้งหมด" key="1">
                            <Divider orientation="left">ใบคำร้องทั่วไป</Divider>
                            <List
                                // header={<div>Header</div>}
                                // footer={<div>Footer</div>}
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
                                // header={<div>Header</div>}
                                // footer={<div>Footer</div>}
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
                                // header={<div>Header</div>}
                                // footer={<div>Footer</div>}
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
                                // header={<div>Header</div>}
                                // footer={<div>Footer</div>}
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
                                // header={<div>Header</div>}
                                // footer={<div>Footer</div>}
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
                                // header={<div>Header</div>}
                                // footer={<div>Footer</div>}
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
            </Row>
        </div>
    </>

});