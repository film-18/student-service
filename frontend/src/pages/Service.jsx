import { memo, useEffect, useCallback, useState } from "react";
import { Row, Col, Card, List, Typography, Divider, Tabs, Modal, Layout } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { Spin, Space } from 'antd';
import { Button, Popover } from 'antd';

import requestTopics from "../data/requestInfo.json"
import requests from "../data/requestItems.json"
import RequestInfo from "../Data/ResquestInfo";
import { RequestTopic } from "../components/Services/RequestTopic";
import { RequestList } from "../components/Services/RequestList";
const { TabPane } = Tabs;
// const data = [
//     'Racing car sprays burning fuel into crowd.',
//     'Japanese princess to wed commoner.',
//     'Australian walks 100km after outback crash.',
//     'Man charged over missing wedding girl.',
//     'Los Angeles battles huge wildfires.',
// ];

const { Meta } = Card;

export const Service = memo(() => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [items, setItems] = useState([...RequestInfo])
    const [isError, setIsError] = useState(false)

    const [requestPopup, setRequestPopup] = useState(null)

    const showModal = useCallback(
        (req) => () => {
            setRequestPopup(req)
            setIsModalVisible(true);
        },
        []
    )

    const handleCreate = useCallback(
        (page) => () => {
            location.href = `service/${page}/create`
            setIsModalVisible(false);
        },
        []
    )

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
        <Layout style={{ background: "linear-gradient(180deg, #112B3C 70%, rgb(235, 245, 255) 50%)" }}>
            <div className="container my-5 text-center">
                <div className="row mb-2">
                    <Typography.Title level={3} style={{ color: "#d9d9d9" }}>
                        ประเภทเอกสาร
                    </Typography.Title>
                    <p style={{ color: "#d9d9d9" }}>นักศึกษาสร้างเอกสาร บลาๆๆๆ ตามขั้นตอนต่อไปนี้ (คำอธิบาย step การยื่นภาพรวม)</p>
                </div>
                <div className="row mb-0">
                    {
                        requestTopics.map((request) => (
                            <>
                                <div className="col-2 col-md-2 mx-5">
                                    <RequestTopic request={request} toggleModal={showModal} />
                                    
                                </div>
                            </>
                        ))
                    }
                </div>
            </div>
        </Layout>
        <div className="container ">
            <div className="request-body row justify-content-center">
                <Tabs defaultActiveKey="0">
                    <TabPane tab="ทั้งหมด" key="0" className="request-list ">
                        {
                            requests.map((req) => (
                                <RequestList request={req} />
                            ))
                        }
                    </TabPane>
                    {
                        requestTopics.map((topic, index) => (
                            <TabPane tab={topic.name} key={index + 1} className="request-list">
                                {
                                    requests.filter(req => req.type == topic.nameEN).map((req) => (
                                        <RequestList request={req} />
                                    ))
                                }
                            </TabPane>
                        ))
                    }
                </Tabs>
            </div>

            {
                requestPopup ?

                    <Modal
                        title={requestPopup.name}
                        visible={isModalVisible}
                        onOk={handleCreate(requestPopup.page)}
                        onCancel={handleCancel}
                        okText="สร้างเอกสาร"
                    >
                        <h2 className="text-center mb-3 fs-3">{requestPopup.name}</h2>
                        <h6>ประเภท : {requestPopup.category.join(" ")}</h6>
                        <h6>รายละเอียด : {requestPopup.description}</h6>
                    </Modal> : ""
            }

            

        </div>

    </>

});