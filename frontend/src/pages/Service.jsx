import { memo, useEffect, useCallback, useState } from "react";
import {
    Row,
    Col,
    Card,
    List,
    Typography,
    Divider,
    Tabs,
    Modal,
    Layout,
} from "antd";
import { DownloadOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { Spin, Space, Empty } from "antd";
import { Button, Popover } from "antd";

import requestTopics from "../data/requestInfo.json";
import requests from "../data/requestItems.json";
import RequestInfo from "../Data/ResquestInfo";
import { RequestTopic } from "../components/Services/RequestTopic";
import { RequestList } from "../components/Services/RequestList";
import { gql, useQuery, useMutation } from "@apollo/client";
const { TabPane } = Tabs;
// const data = [
//     'Racing car sprays burning fuel into crowd.',
//     'Japanese princess to wed commoner.',
//     'Australian walks 100km after outback crash.',
//     'Man charged over missing wedding girl.',
//     'Los Angeles battles huge wildfires.',
// ];

const { Meta } = Card;

const queryService = gql`
  query {
    generalRequest {
      _id
      title
      status
      description
    }
    leaveRequest {
      _id
      title
      status
      description
      leaveType
    }
  }
`;

export const Service = memo(() => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [items, setItems] = useState([...RequestInfo]);
    const [isError, setIsError] = useState(false);

    const [requestPopup, setRequestPopup] = useState(null);

    const { data: dataService, refetch } = useQuery(queryService);

    const showModal = useCallback(
        (req) => () => {
            setRequestPopup(req);
            setIsModalVisible(true);
        },
        []
    );

    const handleCreate = useCallback(
        (page) => () => {
            location.href = `service/${page}/create`;
            setIsModalVisible(false);
        },
        []
    );

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    if (isError)
        return (
            <>
                <div>
                    <Spin size="large" />
                </div>
            </>
        );

    return (
        <>
            <Layout
                style={{
                    background:
                        "linear-gradient(180deg, #112B3C 70%, rgb(235, 245, 255) 50%)",
                }}
            >
                <div className="container my-5 text-center">
                    <div className="row mb-2">
                        <Typography.Title level={3} style={{ color: "#d9d9d9" }}>
                            ประเภทเอกสาร
                        </Typography.Title>
                        <p style={{ color: "#d9d9d9" }}>
                            ประเภทเอกสารที่นักศึกษาต้องการจะส่งพิจารณา
                        </p>
                    </div>
                    <div className="row mb-0">
                        {requestTopics.map((request) => (
                            <>
                                <div className="col-2 col-md-2 mx-5">
                                    <RequestTopic request={request} toggleModal={showModal} />
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            </Layout>
            <div className="container ">
                <div className="request-body row justify-content-center">
                    <Tabs defaultActiveKey="0">
                        <TabPane tab="ทั้งหมด" key="0" className="request-list ">
                            {[
                                ...(dataService?.generalRequest ?? []),
                                ...(dataService?.leaveRequest ?? []),
                            ].map((req) => (
                                <RequestList request={req} />
                            ))}
                        </TabPane>
                        {/* {
                        requestTopics.map((topic, index) => (
                            <TabPane tab={topic.name} key={index + 1} className="request-list">
                                {
                                    requests.filter(req => req.type == topic.nameEN).map((req) => (
                                        <RequestList request={req} />
                                    ))
                                }
                            </TabPane>
                        ))
                    } */}
                        <TabPane tab="ใบคำร้องทั่วไป" key="1" className="request-list">
                            {dataService?.generalRequest?.map((req) => (
                                <RequestList request={req} />
                            ))}
                        </TabPane>
                        <TabPane tab="ใบลาป่วย" key="2" className="request-list">
                            {dataService?.leaveRequest
                                ?.filter((l) => l.leaveType === "Sick")
                                .map((req) => (
                                    <RequestList request={req} />
                                ))}
                        </TabPane>
                        <TabPane tab="ใบลากิจ" key="3" className="request-list">
                            {dataService?.leaveRequest
                                ?.filter((l) => l.leaveType === "Business")
                                .map((req) => (
                                    <RequestList request={req} />
                                ))}
                        </TabPane>
                        <TabPane tab="ใบขอทุนการศึกษา" key="4" className="request-list">
                            <Empty />
                        </TabPane>
                    </Tabs>
                </div>

                {requestPopup ? (
                    <Modal
                        className="p-5"
                        visible={isModalVisible}
                        //onOk={this.handleOk}
                        onCancel={handleCancel}
                        footer={null}
                    >
                        <h2 className="text-center mb-3 fs-3">{requestPopup.name}</h2>
                        <h6>ตัวอย่างเช่น {requestPopup.category.join(" ")}</h6>
                        <h6>รายละเอียด : {requestPopup.description}</h6>
                        <div class="row">
                            <Button className="mt-4" size="large" icon={<DownloadOutlined />} >
                                ดาวน์โหลดเอกสาร
                            </Button>
                            <Button
                                className="mt-3"
                                type="primary"
                                size="large"
                                onClick={handleCreate(requestPopup.page)}
                            >
                                สร้างเอกสาร
                            </Button>
                        </div>
                    </Modal>
                ) : (
                    ""
                )}
            </div>
        </>
    );
});
